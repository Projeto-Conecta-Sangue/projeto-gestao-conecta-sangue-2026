# 03 — Segurança da Informação (SecOps e LGPD)

Disciplina 3 do projeto **Conecta Sangue**: mapeamento de ameaças com Matriz GUT, políticas de acesso e identidade (IAM), adequação à LGPD (RoPA), análise crítica e plano de resposta a incidentes.

## Conteúdo da pasta

| Caminho | Conteúdo |
|---|---|
| `ConectaSangue_Disciplina3_Seguranca_da_Informacao.docx` | Seção da Disciplina 3 para o Documento Final (formato ABNT) |
| `matriz_seguranca_conectasangue.xlsx` | Todas as tabelas da disciplina, com a nota GUT calculada por fórmula |
| `graficos/grafico8_ranking_matriz_gut.png` | Ranking das 25 ameaças pela nota GUT (Figura 8) |
| `codigo/autorizacao_api_referencia.js` | Trecho de referência da técnica adotada na análise crítica (Código 4) |

## Resumo

| Requisito | Entregue |
|---|---|
| 3.1 Matriz GUT | 25 ameaças reais (OWASP Top 10:2025, OWASP API Security 2023, OWASP Mobile 2024 e 6 CVEs), cada uma com a forma como ocorreria no Conecta Sangue, o controle adotado e a nota G × U × T |
| 3.2 Políticas IAM | 26 políticas de autenticação, sessão, autorização, infraestrutura e governança, com justificativa técnica, e matriz de permissões para as 16 funcionalidades |
| 3.3 LGPD | Registro de 24 dados e processos de tratamento (RoPA), com finalidade, base legal, retenção e direitos do titular |
| 3.4 Análise crítica | Resposta à pergunta obrigatória sobre a ameaça de maior nota (AM01, IDOR/BOLA, GUT = 125) |
| 3.5 Resposta a incidentes | Plano em 7 etapas, com o prazo de 3 dias úteis da ANPD |

## Planilha

Na aba **Matriz GUT**, altere as notas G, U ou T (em azul): a nota GUT, a prioridade e o ranking são recalculados automaticamente. As demais abas trazem a escala GUT, os ativos, as políticas IAM, a matriz de permissões, o RoPA, os direitos do titular, o plano de resposta a incidentes e as fontes pesquisadas.

## Arquitetura de referência

A TAP não define tecnologias. Para pesquisar vulnerabilidades reais no CVE, o grupo adotou: app em React Native, site e painel em React com Next.js, API em Node.js com Express e banco PostgreSQL. Se o protótipo usar outras tecnologias, as ameaças baseadas em CVE (AM04, AM05, AM08, AM09, AM13 e AM18) devem ser revistas.

## Sobre o código

`autorizacao_api_referencia.js` é um **trecho de referência**, não um programa completo: ele pressupõe o `app` do Express, a biblioteca `jsonwebtoken` e a conexão com o PostgreSQL configurados no restante da API.
