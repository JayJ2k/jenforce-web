# AGENTS.md — Jenforce Web

Este arquivo define regras obrigatórias para qualquer pessoa, modelo ou agente que trabalhe no frontend do Jenforce.

O Jenforce Web é a interface de uma central de chamados para suporte técnico e atendimento interno. A experiência deve ser profissional, clara, fluida, acessível e consistente.

## Identidade visual do Jenforce Web

O Jenforce Web utiliza uma identidade visual clara, acolhedora, profissional e humanizada.

A direção visual atual foi definida na Issue #17 e deve ser mantida nas próximas alterações.

### Direção visual

- Interface clara, com fundo em tons de marfim e creme
- Dourado como cor principal de destaque
- Tons terrosos como apoio visual
- Tipografia com hierarquia editorial
- Visual profissional, acolhedor e com personalidade
- Tecnologia com pertencimento
- Evitar estética genérica de IA, neon, cyber ou dashboard dark

### Paleta de referência

```txt
Fundo principal: #FAF7EF
Cards: #FFFDF8
Dourado: #C9A227
Dourado escuro: #A97913
Texto principal/café: #2B1A12
Texto secundário: #766454
Cacau: #4A2C20
Caramelo: #B87535
Terracota: #B85C38
Bordas suaves: #E8DCC8
```

### UX e motion

O projeto usa microinterações e motion de forma funcional, sem exagero.

Padrões obrigatórios:

- Usar animações com propósito claro
- Respeitar `prefers-reduced-motion`
- Aplicar feedback visual em botões, formulários e ações assíncronas
- Usar estados de loading, empty, error e success quando aplicável
- Evitar pulsing, bounce, glow excessivo ou animações decorativas repetitivas
- Preferir animações com `transform`, `opacity` e `filter`
- Evitar animações que alterem layout diretamente

### Componentes e landing

A landing de entrada deve manter:

- Topo interativo com navegação clara
- Hero editorial com mensagem forte
- Card de login/cadastro com feedback visual
- Elementos visuais de produto e operação
- Seção de valores com ícones e microinterações
- Footer compacto e funcional
- Responsividade em telas menores

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