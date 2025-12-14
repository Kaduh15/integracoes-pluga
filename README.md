# Integrações Pluga

Aplicação React para visualização e gerenciamento de integrações.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 22+
- pnpm 10+

### Instalação

```bash
pnpm install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=https://api.exemplo.com
```

### Desenvolvimento

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Testes

```bash
pnpm test
```

### Docker

#### Usando Docker Compose (Recomendado)

```bash
# Criar arquivo .env com as variáveis necessárias
echo "VITE_API_URL=https://api.exemplo.com" > .env
echo "PORT=3000" >> .env

# Build e executar
docker-compose up --build

# Executar em background
docker-compose up -d

# Parar
docker-compose down
```

#### Usando Docker diretamente

```bash
# Build passando variável de ambiente
docker build --build-arg VITE_API_URL=https://api.exemplo.com -t integracoes-pluga .

# Executar
docker run -p 3000:80 integracoes-pluga
```

## 🏗️ Decisões Importantes da Arquitetura

### Gerenciamento de Estado Híbrido

- **TanStack Query**: Para dados assíncronos da API (cache, sincronização)
- **Zustand com Immer**: Para estado local da UI (filtros, paginação, seleções)

Separação de responsabilidades: React Query gerencia estado assíncrono, Zustand gerencia estado síncrono da interface.

### Validação com Zod

Toda validação é feita através de schemas Zod:
- Variáveis de ambiente validadas em runtime
- Respostas da API validadas antes do uso
- Tipos inferidos automaticamente do schema

### Camada HTTP Abstrata

Abstração da camada HTTP (`src/http/`) para facilitar testes e mudanças futuras (interceptors, retry logic).

### Estrutura por Responsabilidade

```
src/
├── components/  # Componentes React
├── hooks/       # Custom hooks
├── stores/      # Zustand stores
├── http/        # Camada HTTP
├── schemas/     # Schemas Zod
└── providers/   # Context providers
```

### TypeScript Strict + Path Aliases

Type-safety máximo com aliases `@/` para imports mais limpos.

## 🗺️ Fluxo Principal da Aplicação

```
┌─────────────────────────────────────────────────────────────────┐
│                     INICIALIZAÇÃO                                │
│  main.tsx → Providers (QueryProvider) → App.tsx                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CARREGAMENTO DE DADOS                         │
│  IntegrationGrid → useIntegrationsGrid → useIntegrationsQuery   │
│                              │                                   │
│                              ▼                                   │
│         React Query → getIntegrations() → httpGet()             │
│                              │                                   │
│                              ▼                                   │
│         API: {VITE_API_URL}/ferramentas_search.json             │
│                              │                                   │
│                              ▼                                   │
│         Validação Zod → integrationSchema.array()                │
│                              │                                   │
│                              ▼                                   │
│         Cache React Query → integrations[]                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXIBIÇÃO NA GRID                              │
│  IntegrationGrid usa:                                           │
│    • integrations (de React Query)                              │
│    • searchValue, pagination (de Zustand Store)                 │
│                              │                                   │
│                              ▼                                   │
│  Filtragem: integrations.filter(name.includes(searchValue))     │
│                              │                                   │
│                              ▼                                   │
│  Paginação: filteredIntegrations.slice(page * 12, (page+1)*12)  │
│                              │                                   │
│                              ▼                                   │
│  Renderiza: paginatedIntegrations.map() → IntegrationCard       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   INTERAÇÕES DO USUÁRIO                         │
│                                                                  │
│  ┌────────────────────────┐  ┌──────────────────────────────┐  │
│  │   BUSCA (Header)       │  │  CLIQUE NO CARD              │  │
│  │                        │  │                              │  │
│  │  input onChange        │  │  IntegrationCard onClick     │  │
│  │       │                │  │       │                      │  │
│  │       ▼                │  │       ▼                      │  │
│  │  setSearch(value)      │  │  select(integration)         │  │
│  │       │                │  │       │                      │  │
│  │       ▼                │  │       add(integration)       │  │
│  │  Zustand Store         │  │       │                      │  │
│  │  (searchValue)         │  │       ▼                      │  │
│  │                        │  │  • SelectedIntegrationStore  │  │
│  │  → Filtra grid         │  │  • HistoryStore (máx 3)      │  │
│  │  → Reset página 1      │  │                              │  │
│  └────────────────────────┘  │       ▼                      │  │
│                              │  Modal abre automaticamente   │  │
│                              └──────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────┐                                    │
│  │   PAGINAÇÃO            │                                    │
│  │                        │                                    │
│  │  PaginationItems       │                                    │
│  │  onPageChange(page)    │                                    │
│  │       │                │                                    │
│  │       ▼                │                                    │
│  │  Zustand Store         │                                    │
│  │  (pagination.page)     │                                    │
│  │                        │                                    │
│  │  → Atualiza grid       │                                    │
│  └────────────────────────┘                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   MODAL DE INTEGRAÇÃO                           │
│                                                                  │
│  IntegrationModal verifica: selected !== null                   │
│                              │                                   │
│                              ▼                                   │
│  Se selected existe:                                           │
│    • Renderiza modal com dados da integração                    │
│    • Exibe histórico (HistoryStore.items)                       │
│    • Link para acessar integração (target="_blank")            │
│                              │                                   │
│  Fechar modal:                                                 │
│    • Botão X ou backdrop click                                 │
│    • clear() → selected = null                                 │
│    • Modal desaparece (render null)                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   STORES ZUSTAND (Estado Local)                 │
│                                                                  │
│  1. integrations.store                                          │
│     • searchValue: string                                       │
│     • pagination: { currentPage, itemsPerPage }                 │
│     • setSearch() → reseta página                               │
│     • onPageChange()                                            │
│                                                                  │
│  2. select-integration.store                                    │
│     • selected: Integration | null                              │
│     • select() → abre modal                                     │
│     • clear() → fecha modal                                     │
│                                                                  │
│  3. history.store                                               │
│     • items: Integration[] (máximo 3)                           │
│     • add() → move para início, remove duplicatas               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 📝 Observações Relevantes do Desenvolvimento

### Variáveis de Ambiente

- Precisam ter prefixo `VITE_` para serem expostas no cliente
- Validadas em runtime através de schema Zod
- Garantem type-safety em tempo de execução

### Stores Zustand

Três stores separadas por responsabilidade:
- `integrations.store.ts`: Busca e paginação
- `select-integration.store.ts`: Integração selecionada no modal
- `history.store.ts`: Histórico das últimas 3 integrações

### Validação de API

Todas as respostas são validadas com Zod antes do uso, garantindo que dados inválidos sejam detectados imediatamente.

### Build Docker

O Dockerfile aceita variáveis de ambiente através de `--build-arg` durante o build, permitindo configurar a API URL no momento da construção da imagem.
