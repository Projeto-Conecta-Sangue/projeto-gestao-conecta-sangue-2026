# 02 — Análise de Dados (Python)

Disciplina 2 do projeto **Conecta Sangue**: tratamento de dados (ETL), KPIs, métodos estatísticos, visualização de dados e análise crítica.

## Como executar no Google Colab

1. Abra o [notebook no Google Colab](https://colab.research.google.com/drive/1PWzE1FEtJrTHZl1G1NfkVYMbc5wMD8sk?usp=sharing). Se o link não abrir, entre no [Google Colab](https://colab.research.google.com) e use **Arquivo → Fazer upload de notebook**.
2. Envie o arquivo `conectasangue_analise_de_dados.ipynb`.
3. Clique em **Ambiente de execução → Executar tudo**.

Nenhuma instalação é necessária, porque todas as bibliotecas já vêm no Colab. Na primeira execução, o notebook gera a base simulada em `dados/brutos/`, grava os dados tratados em `dados/tratados/` e salva os gráficos em `graficos/`. A base usa semente fixa, então os resultados são sempre os mesmos.

Para ver os arquivos gerados no Colab, clique no ícone de pasta na barra lateral esquerda.

## Conteúdo da pasta

| Caminho | Conteúdo |
|---|---|
| `conectasangue_analise_de_dados.ipynb` | Notebook completo, já executado: ETL, KPIs, estatística, 7 gráficos e análise crítica |
| `dados/brutos/` | Base simulada do protótipo (3 arquivos CSV), com os problemas de qualidade que o ETL corrige |
| `dados/tratados/` | Dados depois do ETL |
| `graficos/` | Os 7 gráficos em PNG, usados no Documento Final |
| `ConectaSangue_Disciplina2_Analise_de_Dados.docx` | Seção da Disciplina 2 para o Documento Final (formato ABNT) |

## KPIs e metas da TAP

| KPI | Meta SMART (TAP) | Resultado | Meta |
|---|---|---|---|
| KPI 1 – Taxa de localização de doadores | Localização e mobilidade | 77,4% (929 de 1.200) | 100% |
| KPI 2 – Taxa de localização de pontos de coleta | Localização e mobilidade | 80,6% (29 de 36) | 100% |
| KPI 3 – Cobertura de controle de acesso | Segurança dos dados | 54,5% (6 de 11) | 100% |

## Bibliotecas

`pandas`, `numpy`, `scipy`, `matplotlib` e `seaborn`. Fora do Colab, instale com:

```
pip install pandas numpy scipy matplotlib seaborn
```

## Sobre os dados

A base é **simulada**. O protótipo ainda não tem usuários reais, e cadastros de doadores reúnem dados pessoais protegidos pela LGPD. Os arquivos não contêm nome, CPF, telefone ou e-mail, apenas códigos de identificação (`D00001`, `P001`). Para analisar dados reais, substitua os três CSV de `dados/brutos/` mantendo os nomes das colunas e execute o notebook novamente.
