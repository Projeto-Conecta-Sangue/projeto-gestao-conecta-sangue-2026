# 04 — Pesquisa Operacional (Python)

Disciplina 4 do projeto **Conecta Sangue**: dois problemas de otimização resolvidos com programação linear inteira em Python, com a biblioteca **PuLP** (resolvedor CBC). O Excel Solver não é usado.

1. Abra o [notebook no Google Colab](https://colab.research.google.com/drive/1PWzE1FEtJrTHZl1G1NfkVYMbc5wMD8sk?usp=sharing).

O PuLP já inclui o resolvedor CBC, e as demais bibliotecas já vêm no Colab. Os gráficos são salvos na pasta `graficos/` (ícone de pasta na barra lateral esquerda do Colab). A última célula resolve os quatro cenários de novo com o `scipy.optimize.milp` (resolvedor HiGHS) e confere se os valores ótimos são iguais aos do PuLP.

Para testar outros cenários, altere `HORAS_SEGURANCA_CRISE` (Problema 1) ou `AGENTES_CENTRO_CRISE` (Problema 2) e execute a célula de novo.

## Conteúdo da pasta

| Caminho | Conteúdo |
|---|---|
| `conectasangue_pesquisa_operacional.ipynb` | Notebook completo, com as saídas: os dois problemas, as análises de cenário (What-If) e a conferência com o SciPy |
| `graficos/grafico9_sensibilidade_lucro_seguranca.png` | Lucro máximo conforme as horas de segurança e LGPD (Figura 11 do Documento Final) |
| `graficos/grafico10_sensibilidade_custo_agentes.png` | Custo mínimo conforme os agentes da Base Centro (Figura 12 do Documento Final) |

## Problema 1 — Maximização de lucro

**Contexto.** A plataforma será implantada em novos hemocentros e hospitais em dois planos: o **Essencial** (cadastro, localização e consulta dos pontos de coleta) e o **Campanhas** (tudo do Essencial mais campanhas segmentadas por localização e o painel do hemocentro). Cada implantação consome horas de três equipes limitadas. Quantas implantações de cada plano aceitar no mês para ter o maior lucro?

**Variáveis de decisão:** $x_E$ e $x_C$, implantações do Plano Essencial e do Plano Campanhas no mês (inteiras).

**Função objetivo:** $\text{Max } Z = 5000\,x_E + 12000\,x_C$ (lucro do mês, em R$).

| Restrição | Inequação |
|---|---|
| Horas de desenvolvimento e integração | $30\,x_E + 60\,x_C \le 450$ |
| Horas de segurança e LGPD | $4\,x_E + 12\,x_C \le 80$ |
| Horas de treinamento e suporte | $10\,x_E + 12\,x_C \le 140$ |
| Mercado (parceiros interessados) | $x_E \le 12$ e $x_C \le 8$ |
| Lógica | $x_E, x_C \ge 0$ e inteiros |

| Cenário | Plano Essencial | Plano Campanhas | Lucro do mês |
|---|---|---|---|
| Base (80 h de segurança) | 5 | 5 | R$ 85.000,00 |
| What-If: analista de segurança afastado (40 h) | 10 | 0 | R$ 50.000,00 (−41,2%) |

No cenário base, as horas de desenvolvimento e as de segurança são os gargalos (folga zero). No What-If, o Plano Campanhas sai da carteira, e cada 10 horas de segurança a menos custam entre R$ 6.000 e R$ 15.000 de lucro no mês.

## Problema 2 — Minimização de custos (transporte)

**Contexto.** Os cadastros das campanhas presenciais são os que menos localizam (Disciplina 2). Agentes de cadastro, que conferem o CEP e o endereço na hora, serão enviados de duas bases (Base Centro e Base Oeste) aos mutirões das zonas Leste, Sul e Norte. Quantos agentes enviar de cada base para cada mutirão com o menor custo de deslocamento?

**Variáveis de decisão:** $x_{ij}$, agentes enviados da base $i$ para a zona $j$ (inteiros).

**Função objetivo:** $\text{Min } Z = \sum_i \sum_j c_{ij}\,x_{ij}$, com $c_{ij}$ = custo de deslocamento de um agente, ida e volta.

| Custo por agente (R$) | Zona Leste | Zona Sul | Zona Norte | Oferta (agentes) |
|---|---|---|---|---|
| Base Centro | 81,86 | 88,23 | 72,01 | 9 |
| Base Oeste | 144,30 | 114,05 | 91,66 | 7 |
| **Demanda (agentes)** | 6 | 5 | 2 | 13 |

**Restrições:** oferta, $\sum_j x_{ij} \le \text{oferta}_i$; demanda, $\sum_i x_{ij} = \text{demanda}_j$; lógica, $x_{ij} \ge 0$ e inteiros.

| Cenário | Plano ótimo | Custo por dia |
|---|---|---|
| Base (9 agentes na Base Centro) | Centro → Leste 6 e Sul 3; Oeste → Sul 2 e Norte 2 | R$ 1.167,27 |
| What-If: 3 agentes da Base Centro doentes (6) | Centro → Leste 6; Oeste → Sul 5 e Norte 2 | R$ 1.244,73 (+6,6%) |

Cada falta na Base Centro custa R$ 25,82 a mais. Com 4 faltas (5 agentes), não há solução viável: as duas bases somam 12 agentes para uma demanda de 13.


## Bibliotecas

`pulp`, `pandas`, `numpy`, `scipy` e `matplotlib`. Fora do Colab, instale com:

```
pip install pulp pandas numpy scipy matplotlib
```
