# Código da Disciplina 4 (PuLP)

Modelo do código: maximização de bolsas coletadas (campanhas fixas e itinerantes) e minimização do custo de transporte de equipes (Hemocentro Central e Zona Norte para os Postos 1 a 3), com as análises de cenário (What-if).

```python

# ============================================================
# PROBLEMA 1 - QUANTAS CAMPANHAS FAZER PRA COLETAR MAIS SANGUE
# ============================================================
print("=" * 60)
print("PROBLEMA 1 - MAXIMIZACAO DE BOLSAS DE SANGUE COLETADAS")
print("=" * 60)

# --- Cenario base ---

# Variaveis de decisao: quantas campanhas de cada tipo fazer no mes
xA = pulp.LpVariable("Campanhas_Fixas", lowBound=0, cat="Integer")
xB = pulp.LpVariable("Campanhas_Itinerantes", lowBound=0, cat="Integer")

# Cria o problema (queremos o MAIOR valor possivel = Maximize)
problema1 = pulp.LpProblem("Max_Bolsas_Coletadas", pulp.LpMaximize)

# Funcao objetivo: cada campanha fixa rende 40 bolsas, cada itinerante rende 90
problema1 += 40 * xA + 90 * xB

# Restricao 1: horas de enfermagem disponiveis no mes (4 enfermeiros x 160h = 640h)
problema1 += 16 * xA + 40 * xB <= 640

# Restricao 2: horas de motorista reservadas para as campanhas no mes (200h)
problema1 += 6 * xA + 10 * xB <= 200

# Resolve o problema
problema1.solve(pulp.PULP_CBC_CMD(msg=0))

print("")
print("--- Cenario base ---")
print("Status:", status_pt[problema1.status])
print("Campanhas Fixas:", xA.varValue)
print("Campanhas Itinerantes:", xB.varValue)
bolsas_base = problema1.objective.value()
print("Total de bolsas coletadas:", bolsas_base)

# --- Analise de Cenario (What-if): e se 1 enfermeiro sair? ---

xA2 = pulp.LpVariable("Campanhas_Fixas_2", lowBound=0, cat="Integer")
xB2 = pulp.LpVariable("Campanhas_Itinerantes_2", lowBound=0, cat="Integer")

problema1_whatif = pulp.LpProblem("Max_Bolsas_What_If", pulp.LpMaximize)
problema1_whatif += 40 * xA2 + 90 * xB2
problema1_whatif += 16 * xA2 + 40 * xB2 <= 480   # enfermagem caiu de 640h para 480h (3 x 160h)
problema1_whatif += 6 * xA2 + 10 * xB2 <= 200

problema1_whatif.solve(pulp.PULP_CBC_CMD(msg=0))

print("")
print("--- What-if: saida de 1 enfermeiro (640h -> 480h) ---")
print("Status:", status_pt[problema1_whatif.status])
print("Campanhas Fixas:", xA2.varValue)
print("Campanhas Itinerantes:", xB2.varValue)
bolsas_whatif = problema1_whatif.objective.value()
print("Total de bolsas coletadas:", bolsas_whatif)
print("")
print(">> A coleta cai de", bolsas_base, "para", bolsas_whatif, "bolsas.")


# ============================================================
# PROBLEMA 2 - COMO DISTRIBUIR AS EQUIPES GASTANDO MENOS
# ============================================================
print("")
print("=" * 60)
print("PROBLEMA 2 - MINIMIZACAO DE CUSTO DE DESLOCAMENTO")
print("=" * 60)

# Nomes das sedes (hemocentros) e dos postos de coleta
sedes = ["Hemocentro Central", "Hemocentro Zona Norte"]
postos = ["Posto 1", "Posto 2", "Posto 3"]

# Matriz de custo: custo[i][j] = custo de mandar 1 equipe da sede i ate o posto j
custo = [
    [60, 90, 140],
    [100, 70, 50],
]

# Quanto cada sede consegue mandar no maximo por semana (oferta)
# Central: 6 motoristas x 2 viagens = 12 / Zona Norte: 4 motoristas x 2 viagens = 8
oferta = [12, 8]

# Quanto cada posto precisa receber por semana (demanda)
demanda = [8, 7, 5]

# --- Cenario base ---

# Cria uma variavel para cada combinacao sede-posto, usando dois loops simples
x = []
for i in range(len(sedes)):
    linha = []
    for j in range(len(postos)):
        nome_variavel = "x_" + str(i) + "_" + str(j)
        variavel = pulp.LpVariable(nome_variavel, lowBound=0, cat="Integer")
        linha.append(variavel)
    x.append(linha)

problema2 = pulp.LpProblem("Min_Custo_Transporte", pulp.LpMinimize)

# Funcao objetivo: soma de (custo da rota * quantidade de equipes naquela rota)
custo_total = 0
for i in range(len(sedes)):
    for j in range(len(postos)):
        custo_total += custo[i][j] * x[i][j]
problema2 += custo_total

# Restricao: cada sede nao pode mandar mais equipes do que a oferta dela
for i in range(len(sedes)):
    soma_enviada = 0
    for j in range(len(postos)):
        soma_enviada += x[i][j]
    problema2 += soma_enviada <= oferta[i]

# Restricao: cada posto tem que receber EXATAMENTE a quantidade que precisa
for j in range(len(postos)):
    soma_recebida = 0
    for i in range(len(sedes)):
        soma_recebida += x[i][j]
    problema2 += soma_recebida == demanda[j]

problema2.solve(pulp.PULP_CBC_CMD(msg=0))

print("")
print("--- Cenario base ---")
print("Status:", status_pt[problema2.status])
for i in range(len(sedes)):
    for j in range(len(postos)):
        quantidade = x[i][j].varValue
        if quantidade and quantidade > 0:
            print(" ", sedes[i], "->", postos[j], ":", quantidade, "equipe(s)")
custo_base = problema2.objective.value()
print("Custo total: R$", custo_base)

# --- Analise de Cenario (What-if): obra interdita a rota mais barata ---

x2 = []
for i in range(len(sedes)):
    linha = []
    for j in range(len(postos)):
        nome_variavel = "x2_" + str(i) + "_" + str(j)
        variavel = pulp.LpVariable(nome_variavel, lowBound=0, cat="Integer")
        linha.append(variavel)
    x2.append(linha)

problema2_whatif = pulp.LpProblem("Min_Custo_What_If", pulp.LpMinimize)

custo_total_2 = 0
for i in range(len(sedes)):
    for j in range(len(postos)):
        custo_total_2 += custo[i][j] * x2[i][j]
problema2_whatif += custo_total_2

for i in range(len(sedes)):
    soma_enviada = 0
    for j in range(len(postos)):
        soma_enviada += x2[i][j]
    problema2_whatif += soma_enviada <= oferta[i]

for j in range(len(postos)):
    soma_recebida = 0
    for i in range(len(sedes)):
        soma_recebida += x2[i][j]
    problema2_whatif += soma_recebida == demanda[j]

# A rota "Hemocentro Zona Norte -> Posto 3" (indice 1, 2) ficou interditada por obra
problema2_whatif += x2[1][2] == 0

problema2_whatif.solve(pulp.PULP_CBC_CMD(msg=0))

print("")
print("--- What-if: rota Hemocentro Zona Norte -> Posto 3 interditada por obra ---")
print("Status:", status_pt[problema2_whatif.status])
for i in range(len(sedes)):
    for j in range(len(postos)):
        quantidade = x2[i][j].varValue
        if quantidade and quantidade > 0:
            print(" ", sedes[i], "->", postos[j], ":", quantidade, "equipe(s)")
custo_whatif = problema2_whatif.objective.value()
print("Custo total: R$", custo_whatif)
print("")
print(">> O custo sobe de R$", custo_base, "para R$", custo_whatif)
```
