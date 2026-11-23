# BEWEAR - E-commerce

E-commerce de moda desenvolvido com Next.js 15 (App Router). Inclui catálogo por categorias, página de produto com variantes, carrinho, endereços de entrega, checkout com Stripe e histórico de pedidos.

## Funcionalidades

- Catálogo de produtos, categorias e variantes (cor, imagem e preço)
- Autenticação com e-mail/senha e Google (Better Auth)
- Carrinho persistido no banco (adicionar, aumentar, diminuir e remover itens)
- Cadastro e seleção de endereços de entrega, com máscaras de CPF/CNPJ, telefone e CEP
- Fluxo de compra: identificação → confirmação → pagamento no Stripe Checkout
- Webhook do Stripe que marca o pedido como pago e limpa o carrinho
- Página "Meus pedidos" com status e itens de cada pedido

## Stack

- [Next.js 15](https://nextjs.org) (App Router) e [React 19](https://react.dev)
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) e [shadcn/ui](https://ui.shadcn.com)
- [PostgreSQL](https://www.postgresql.org) com [Drizzle ORM](https://orm.drizzle.team)
- [Better Auth](https://www.better-auth.com)
- [Stripe](https://stripe.com/docs)
- React Hook Form + Zod
- TanStack React Query
- react-number-format

## Pré-requisitos

- Node.js 20 ou superior
- Um banco PostgreSQL (local, Supabase, Neon, etc.)
- Conta no Stripe (modo de teste) e [Stripe CLI](https://docs.stripe.com/stripe-cli) para testar o webhook
- Credenciais OAuth do Google (opcional, apenas para login social)

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` a partir do exemplo e preencha as variáveis:

```bash
cp .env.example .env
```

| Variável                              | Descrição                                        |
| ------------------------------------- | ------------------------------------------------ |
| `DATABASE_URL`                        | String de conexão do PostgreSQL                  |
| `BETTER_AUTH_SECRET`                  | Segredo usado pelo Better Auth                   |
| `BETTER_AUTH_URL`                     | URL base da aplicação                            |
| `GOOGLE_CLIENT_ID`                    | Client ID do Google OAuth                        |
| `GOOGLE_CLIENT_SECRET`                | Client Secret do Google OAuth                    |
| `NEXT_PUBLIC_APP_URL`                 | URL pública da aplicação (retorno do Stripe)     |
| `STRIPE_SECRET_KEY`                   | Chave secreta do Stripe                          |
| `STRIPE_WEBHOOK_SECRET`               | Segredo de assinatura do webhook do Stripe       |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`  | Chave pública do Stripe                          |

3. Crie as tabelas e popule o banco:

```bash
npm run db:push
npm run db:seed
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Em outro terminal, encaminhe os eventos do Stripe para o webhook local:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copie o segredo `whsec_...` exibido para `STRIPE_WEBHOOK_SECRET`.

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                | Descrição                                  |
| --------------------- | ------------------------------------------ |
| `npm run dev`         | Servidor de desenvolvimento                |
| `npm run build`       | Build de produção                          |
| `npm run start`       | Executa o build de produção                |
| `npm run lint`        | Executa o ESLint                           |
| `npm run typecheck`   | Verificação de tipos com TypeScript        |
| `npm run db:push`     | Sincroniza o schema com o banco            |
| `npm run db:generate` | Gera migrations a partir do schema         |
| `npm run db:migrate`  | Aplica as migrations                       |
| `npm run db:studio`   | Abre o Drizzle Studio                      |
| `npm run db:seed`     | Popula o banco com categorias e produtos   |

## Estrutura

```
src/
├── actions/       Server Actions (uma pasta por ação, com index.ts e schema.ts)
├── app/           Rotas (App Router) e componentes específicos de cada página
├── components/    Componentes comuns e de UI (shadcn/ui)
├── db/            Conexão, schema Drizzle e seed
├── helpers/       Funções utilitárias (ex.: formatação de moeda)
├── hooks/         Hooks de queries e mutations (React Query)
├── lib/           Configuração de auth e utilitários
└── providers/     Providers globais
```

## Rotas principais

| Rota                         | Descrição                       |
| ---------------------------- | ------------------------------- |
| `/`                          | Home                            |
| `/category/[slug]`           | Produtos de uma categoria       |
| `/product-variant/[slug]`    | Página do produto               |
| `/authentication`            | Login e cadastro                |
| `/cart/identification`       | Seleção de endereço de entrega  |
| `/cart/confirmation`         | Confirmação do pedido           |
| `/checkout/success`          | Retorno do pagamento aprovado   |
| `/my-orders`                 | Pedidos do usuário              |
| `/api/stripe/webhook`        | Webhook do Stripe               |

## Deploy

O deploy recomendado é na [Vercel](https://vercel.com/new). Configure as mesmas variáveis do `.env` no projeto e cadastre o endpoint `/api/stripe/webhook` no painel do Stripe.
