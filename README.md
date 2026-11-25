# Projeto de Gestão – Conecta Sangue – 2026

Projeto interdisciplinar da disciplina **Projeto em Gestão de Sistemas Computacionais**, que aplica Gestão de Projetos, Análise de Dados, Segurança da Informação e Pesquisa Operacional a uma mesma empresa.

## A empresa

| | |
|---|---|
| **Empresa** | Conecta Sangue |
| **Ramo** | Saúde: tecnologia aplicada à doação de sangue |
| **Problema** | É difícil encontrar doadores e facilitar o acesso deles aos locais de doação, e os dados dos doadores precisam ser armazenados e usados com segurança |
| **Objetivo** | Desenvolver um protótipo (aplicativo, site e painel para os hemocentros) que facilite a localização dos doadores e pontos de coleta e proteja os dados cadastrados |
| **Parceiros** | Hemocentros, que divulgam pontos e campanhas de doação |

### Como as quatro disciplinas atacam o problema

| Disciplina | Problema de negócio que resolve |
|---|---|
| 1 – Gestão de Projetos | Planejar escopo, prazo, custos, responsáveis e riscos para entregar o protótipo até 30/11/2026 |
| 2 – Análise de Dados | Medir quantos doadores e pontos de coleta o sistema consegue localizar e descobrir por que os demais não são localizados |
| 3 – Segurança da Informação | Proteger endereço, localização e tipo sanguíneo dos doadores contra acessos indevidos e adequar o tratamento à LGPD |
| 4 – Pesquisa Operacional | Decidir com recursos limitados: quantas implantações de cada plano aceitar (maximização de lucro) e como enviar agentes de cadastro aos mutirões com o menor custo (minimização) |

### Metas SMART

1. Permitir que 100% dos usuários e pontos de coleta cadastrados sejam localizados no sistema até a entrega final do projeto.
2. Garantir mecanismos de controle de acesso em 100% das funcionalidades que armazenam dados dos doadores.

## Estrutura do repositório

```
projeto-gestao-conecta-sangue-2026/
├── README.md
├── 01-gestao-de-projetos/        TAP, EAP, backlog, RACI, cronograma, custos, comunicação e riscos
├── 02-analise-de-dados/          Notebook Python (ETL, KPIs, estatística e gráficos), dados e gráficos
├── 03-seguranca-da-informacao/   Matriz GUT, políticas de acesso (IAM), LGPD e resposta a incidentes
├── 04-pesquisa-operacional/      Notebook Python com os modelos de otimização (PuLP)
└── 07-video/                     Link do vídeo no YouTube (não listado)
```

Cada pasta tem o próprio README, com o conteúdo e o passo a passo de execução.

## Como executar

| Disciplina | Arquivo | Como abrir |
|---|---|---|
| 1 – Gestão de Projetos | `01-gestao-de-projetos/gestao_projetos_conectasangue.xlsx` | Excel, LibreOffice ou Google Planilhas. Os totais de custos e as durações do cronograma são fórmulas |
| 2 – Análise de Dados | `02-analise-de-dados/conectasangue_analise_de_dados.ipynb` | Google Colab: **Arquivo → Fazer upload de notebook** e depois **Ambiente de execução → Executar tudo**. Não precisa instalar nada |
| 3 – Segurança da Informação | `03-seguranca-da-informacao/matriz_seguranca_conectasangue.xlsx` | Excel, LibreOffice ou Google Planilhas. A nota GUT, a prioridade e o ranking são fórmulas |
| 4 – Pesquisa Operacional | `04-pesquisa-operacional/conectasangue_pesquisa_operacional.ipynb` | Google Colab: **Arquivo → Fazer upload de notebook** e depois **Ambiente de execução → Executar tudo**. A primeira célula instala o PuLP com `!pip install pulp` |

## Principais resultados

| Indicador | Resultado | Meta |
|---|---|---|
| KPI 1 – Doadores localizados | 77,4% (929 de 1.200) | 100% |
| KPI 2 – Pontos de coleta localizados | 80,6% (29 de 36) | 100% |
| KPI 3 – Funcionalidades com controle de acesso | 54,5% hoje; 100% com as 26 políticas da Disciplina 3 | 100% |
| Ameaça mais grave (Matriz GUT) | Quebra de autorização por objeto (IDOR/BOLA), nota 125 | — |
| Orçamento estimado do projeto | R$ 6.469,43, com 10% de contingência | — |
| Maximização de lucro (Pesquisa Operacional) | 5 implantações de cada plano: R$ 85.000,00 no mês; com metade das horas de segurança, R$ 50.000,00 (−41,2%) | — |
| Minimização de custos (Pesquisa Operacional) | R$ 1.167,27 por dia de mutirão; com 3 agentes a menos, R$ 1.244,73 (+6,6%); com 4, sem solução viável | — |

## Links

- **Vídeo de apresentação (YouTube, não listado):** veja `07-video/link-youtube-nao-listado.txt`.
- **Documento Final (PDF):** enviado diretamente ao professor.

## Ferramentas

Python 3 (pandas, numpy, scipy, matplotlib, seaborn e PuLP), Google Colab, planilhas (Excel, LibreOffice ou Google Planilhas), GitHub e Microsoft Word.

## Privacidade

Este repositório é público. Ele não contém nomes completos, RAs, senhas ou outros dados pessoais: a identificação da equipe consta somente no Documento Final enviado ao professor, e os integrantes aparecem aqui pelos códigos I1 a I6. A base de dados da Disciplina 2 é **simulada** e usa apenas códigos (`D00001`, `P001`), sem nome, CPF, telefone ou e-mail.
