# 04 — Pesquisa Operacional (Python)

Disciplina 4 do projeto **Conecta Sangue**: modelagem matemática e resolução de dois problemas de otimização em Python. O uso do Excel Solver é proibido.

> Pasta em preparação pela equipe da Disciplina 4. Substituam este README quando o notebook estiver pronto.

## O que esta pasta precisa ter

| Arquivo | Conteúdo |
|---|---|
| `conectasangue_pesquisa_operacional.ipynb` | Notebook executado, com os dois problemas e as análises de cenário |
| `README.md` | Este arquivo, com o resumo dos modelos e dos resultados |

Cada problema deve apresentar: contexto, variáveis de decisão, função objetivo, restrições, código em Python, resultado obtido e análise de cenário (What-If), em que um parâmetro de restrição é alterado e o modelo é resolvido de novo.

| Problema | Tipo | Resumo |
|---|---|---|
| 4.1 | Maximização | [descrever] |
| 4.2 | Minimização de custos (oferta e demanda) | [descrever] |

## Como executar no Google Colab

1. Abra o [Google Colab](https://colab.research.google.com) e entre em **Arquivo → Fazer upload de notebook**.
2. Envie o arquivo `conectasangue_pesquisa_operacional.ipynb`.
3. Clique em **Ambiente de execução → Executar tudo**. A primeira célula instala a biblioteca PuLP:

```
!pip install pulp
```

O PuLP já inclui o resolvedor CBC, então nenhuma outra instalação é necessária.
