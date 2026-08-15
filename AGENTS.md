# AGENTS.md — Jenforce Web

Este arquivo define regras obrigatórias para qualquer pessoa, modelo ou agente que trabalhe no frontend do Jenforce.

O Jenforce Web é a interface de uma central de chamados para suporte técnico e atendimento interno. A experiência deve ser profissional, clara, fluida, acessível e consistente.

## Fluxo obrigatório de contribuição

Toda alteração deve seguir o fluxo:

1. Criar uma Issue no GitHub.
2. Criar uma branch específica para a Issue.
3. Fazer a alteração localmente.
4. Executar validações.
5. Abrir Pull Request para `main`.
6. Mencionar a Issue na descrição da PR usando `Closes #numero`.
7. Fazer merge somente após validação.
8. Atualizar a `main` local após o merge.

Nunca trabalhar direto na branch `main`, exceto no commit inicial do projeto.

## Padrão de branches

Use nomes claros:

```txt
feature/issue-X-descricao
fix/issue-X-descricao
docs/issue-X-descricao
refactor/issue-X-descricao
test/issue-X-descricao
ci/issue-X-descricao