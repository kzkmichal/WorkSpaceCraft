# Development Guidelines for WorkSpaceCraft

## Project Setup

1. Clone the repository and install dependencies:

```bash
git clone [repository-url]
cd workspacecraft
pnpm install
```

2. Set up your environment variables:

```bash
cp .env.example .env.local
```

3. Initialize the database:

```bash
pnpm db:migrate
```

## Development Workflow

### Getting Started

1. Start the development server:

```bash
pnpm dev
```

2. Run tests in watch mode:

```bash
pnpm test:watch
```

### Code Style & Quality

- All code must be typed with TypeScript
- Use ESLint and Prettier for code formatting
- Run `pnpm lint:fix` before committing
- Maintain minimum 70% test coverage

### GraphQL Development Guidelines

1. Schema Development

   - Place schemas in `src/graphql/schema/**/*.graphql`
   - Use clear, descriptive names for types and fields
   - Add descriptions to types and fields using GraphQL comments
   - Follow naming conventions:
     - Queries: `getEntity`, `listEntities`
     - Mutations: `createEntity`, `updateEntity`, `deleteEntity`

2. Resolver Development
   - Place resolvers in `src/graphql/resolvers`
   - One resolver file per entity
   - Always handle errors appropriately using GraphQLError
   - Always validate user permissions
   - Use dataloader for N+1 query prevention

Example schema:

```graphql
"""
Represents a product in the system.
"""
type Product {
	"Unique identifier"
	id: ID!
	"Product title"
	title: String!
	"Detailed description"
	description: String!
}
```

Example resolver:

```typescript
const resolver: Resolvers = {
  Query: {
    products: async (_, args, ctx) => {
      try {
        // Implementation
      } catch (error) {
        throw new GraphQLError("Failed to fetch products");
      }
    }
  }
};
```

### Database Changes

1. Creating Migrations

   ```bash
   # Make changes to schema.prisma
   pnpm db:migrate # Creates and applies migration
   ```

2. Seeding Data
   - Add seed data in `prisma/seed.ts`
   - Run seeds with `pnpm prisma db seed`

### Testing Guidelines

1. Unit Tests
   - Test each resolver independently
   - Mock external dependencies
   - Test both success and error cases

```typescript
describe("Product Resolver", () => {
  it("should fetch products successfully", async () => {
    // Test implementation
  });

  it("should handle errors appropriately", async () => {
    // Test implementation
  });
});
```

2. Integration Tests
   - Test complete features
   - Use test database
   - Clean up after tests

### Git Workflow

1. Branch Naming

   - Feature: `feature/description`
   - Bug Fix: `fix/description`
   - Refactor: `refactor/description`

2. Commit Messages

   - Use conventional commits format:
     ```
     feat: add product search functionality
     fix: resolve product creation error
     refactor: improve error handling
     ```

3. Pull Requests
   - Create PR template
   - Require test coverage
   - Require lint checks
   - Require type checks

### Deployment Process

1. Staging Deployment

   ```bash
   pnpm build
   pnpm test
   ```

2. Production Deployment
   - Ensure all tests pass
   - Run security checks
   - Backup database
   - Apply migrations

## Performance Guidelines

1. Code Level

   - Use pagination for lists
   - Implement caching where appropriate
   - Optimize database queries

2. Bundle Size
   - Monitor import sizes
   - Use dynamic imports when possible
   - Regular bundle analysis

## Security Guidelines

1. Authentication

   - Always validate user sessions
   - Implement proper error messages
   - Use rate limiting

2. Data Access
   - Validate user permissions
   - Sanitize user input
   - Use prepared statements

## Common Patterns

### Error Handling

```typescript
try {
  // Implementation
} catch (error) {
  if (error instanceof GraphQLError) throw error;
  throw new GraphQLError("Unexpected error", {
    extensions: { code: "INTERNAL_SERVER_ERROR" }
  });
}
```

### Data Fetching

```typescript
const { data, loading, error } = useQuery(QUERY, {
  variables: { id },
  onError: handleError
});
```

### Component Structure

```typescript
type Props = {
  // Props definition
};

export const Component = ({ prop1, prop2 }: Props) => {
  // Implementation
};
```

## Troubleshooting

Common issues and their solutions:

1. GraphQL Generation Issues

   ```bash
   pnpm codegen # Regenerate types
   ```

2. Database Issues

   ```bash
   pnpm db:reset # Reset database
   ```

3. Type Issues
   ```bash
   pnpm type-check # Check types
   ```
