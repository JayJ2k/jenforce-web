# Jenforce Web

Frontend do **Jenforce**, uma plataforma de chamados para suporte técnico e atendimento interno.

O projeto foi desenvolvido com React, TypeScript e Vite, com foco em simular uma experiência real de service desk: autenticação, painel inicial, visualização de chamados e uma landing de entrada com identidade visual própria.

## Sobre o projeto

O **Jenforce Web** é a interface da central de atendimento Jenforce.

A aplicação permite que usuários acessem a plataforma, criem conta, façam login e visualizem uma experiência inicial de produto voltada para organização de suporte, acompanhamento de demandas e atendimento humanizado.

## Identidade visual

O Jenforce Web possui uma identidade visual clara, dourada, terrosa e humanizada.

A interface foi pensada para transmitir organização, cuidado, pertencimento e profissionalismo, evitando uma estética genérica de IA ou dashboard técnico escuro.

A direção visual atual inclui:

- Fundo claro em tons de marfim e creme
- Dourado como destaque principal
- Tons terrosos em textos, bordas e elementos de apoio
- Cards com profundidade suave
- Microinterações com Motion.dev
- Feedback visual em botões e formulários
- Respeito a `prefers-reduced-motion`

A landing principal apresenta:

- Navegação superior interativa
- Hero com linguagem editorial
- Card de autenticação
- Elementos visuais de produto
- Cards de valores
- Footer compacto

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Motion.dev
- Lucide React
- Biome
- CSS customizado

## Funcionalidades

- Tela de entrada com landing visual
- Login integrado com a API
- Cadastro público de usuários
- Persistência de sessão no `localStorage`
- Painel autenticado
- Logout
- Preview visual do produto
- Microinterações e feedback visual
- Layout responsivo

## Variáveis de ambiente

Crie um arquivo `.env` local com base no `.env.example`.

```env
VITE_API_URL=http://localhost:3334
```

O arquivo `.env` não deve ser versionado.

## Como rodar o projeto

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:5173
```

## API esperada

O frontend espera que a Jenforce API esteja rodando em:

```txt
http://localhost:3334
```

Rotas usadas pelo frontend:

```txt
POST /auth/login
POST /auth/register
GET  /auth/me
```

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run preview
npm run format
npm run lint
npm run check
```

## Qualidade de código

O projeto utiliza **Biome** para formatação, lint e organização de imports.

Antes de abrir um Pull Request, execute:

```bash
npm run build
npm run check
```

Para aplicar correções automáticas:

```bash
npx biome check --write .
```

## Padrão de contribuição

Este projeto segue um fluxo obrigatório baseado em Issues, branches e Pull Requests.

Antes de qualquer alteração chegar à branch `main`, é necessário:

- Criar uma Issue no GitHub
- Criar uma branch específica para a tarefa
- Fazer a alteração localmente
- Executar validações
- Abrir Pull Request para `main`
- Mencionar a Issue relacionada usando `Closes #número`
- Fazer merge somente após validação
- Atualizar a `main` local após o merge

## Padrão de branches

```txt
feature/issue-X-descricao
fix/issue-X-descricao
docs/issue-X-descricao
style/issue-X-descricao
refactor/issue-X-descricao
test/issue-X-descricao
ci/issue-X-descricao
```

## Segurança

Cuidados obrigatórios:

- Não versionar `.env`
- Não expor token no console
- Não expor senha na interface
- Não salvar dados sensíveis além da sessão necessária
- Cadastro público deve seguir o fluxo da API e criar apenas usuários `CUSTOMER`
- Manter `.env.example` sem dados reais

## Estrutura principal

```txt
jenforce-web/
├── public/
│   └── jenforce-logo.svg
├── src/
│   ├── components/
│   │   ├── AuthPanel.tsx
│   │   ├── AuthScreen.tsx
│   │   ├── AuthenticatedDashboard.tsx
│   │   ├── EntryFooter.tsx
│   │   ├── InteractiveHeader.tsx
│   │   ├── NexusHeroVisual.tsx
│   │   └── SideInsightPanel.tsx
│   ├── data/
│   │   └── mockTickets.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── authService.ts
│   ├── types/
│   │   └── auth.ts
│   ├── utils/
│   │   └── authStorage.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── AGENTS.md
├── package.json
└── tsconfig.json
```