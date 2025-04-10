# WorkSpaceCraft API Documentation

## Environment Setup

### Required Environment Variables

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/workspacecraft"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### Development Environment Setup

1. Install dependencies:

```bash
pnpm install
```

2. Set up the database:

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

3. Start development server:

```bash
pnpm dev
```

4. Generate GraphQL types:

```bash
pnpm codegen
```

## Table of Contents

1. [GraphQL API Overview](#graphql-api-overview)
2. [Authentication](#authentication)
3. [Products API](#products-api)
4. [Users API](#users-api)
5. [Reviews API](#reviews-api)
6. [Setups API](#setups-api)
7. [Articles API](#articles-api)
8. [TypeScript Integration](#typescript-integration)
9. [Common Patterns and Best Practices](#common-patterns)
10. [Troubleshooting](#troubleshooting)

## GraphQL API Overview

WorkSpaceCraft uses GraphQL as its primary API layer. The API is available at `/api/graphql` and can be explored using GraphQL Playground in development.

### Schema Organization

The schema is organized into several domains:

- Products: Core product management
- Users: User authentication and profile management
- Reviews: Product review system
- Setups: Workspace setup showcases
- Articles: Educational content

### Base Types

```graphql
type Query {
	products(limit: Int, offset: Int): [Product!]!
	product(id: ID!): Product
	users: [User!]!
	user(id: ID!): User
	me: User
}

type Mutation {
	createProduct(input: CreateProductInput!): Product!
	updateProduct(input: UpdateProductInput!): Product!
	deleteProduct(id: ID!): Boolean!
	signUp(input: SignUpInput!): AuthPayload!
	signIn(input: SignInInput!): AuthPayload!
}
```

## Authentication

Authentication is handled through NextAuth.js integrated with GraphQL.

### Sign Up Process

```graphql
mutation SignUp($input: SignUpInput!) {
	signUp(input: $input) {
		token
		user {
			id
			email
			name
		}
	}
}
```

Input type:

```graphql
input SignUpInput {
	email: String!
	password: String!
	name: String!
}
```

### Sign In Process

```graphql
mutation SignIn($input: SignInInput!) {
	signIn(input: $input) {
		token
		user {
			id
			email
			name
		}
	}
}
```

Input type:

```graphql
input SignInInput {
	email: String!
	password: String!
}
```

### Authentication Flow

1. User signs up/signs in using the appropriate mutation
2. Server returns JWT token and user data
3. Token is stored in NextAuth.js session
4. Subsequent requests include the token in Authorization header
5. Server validates token and includes user in GraphQL context

## Products API

### Types

```graphql
type Product {
	id: ID!
	title: String!
	description: String!
	originalStoreLink: String
	price: Float!
	category: String!
	subcategory: String
	createdAt: String!
	updatedAt: String!
	createdBy: User!
}

input CreateProductInput {
	title: String!
	description: String!
	originalStoreLink: String
	price: Float!
	category: String!
	subcategory: String
}

input UpdateProductInput {
	id: ID!
	title: String
	description: String
	originalStoreLink: String
	price: Float
	category: String
	subcategory: String
}
```

### Query Examples

Fetching products with pagination:

```graphql
query Products($limit: Int, $offset: Int) {
	products(limit: $limit, offset: $offset) {
		id
		title
		description
		price
		category
		createdBy {
			name
		}
	}
}
```

Fetching a single product:

```graphql
query Product($id: ID!) {
	product(id: $id) {
		id
		title
		description
		price
		category
		createdBy {
			name
		}
	}
}
```

### Mutation Examples

Creating a new product:

```graphql
mutation CreateProduct($input: CreateProductInput!) {
	createProduct(input: $input) {
		id
		title
		description
		price
	}
}
```

Updating a product:

```graphql
mutation UpdateProduct($input: UpdateProductInput!) {
	updateProduct(input: $input) {
		id
		title
		description
		price
	}
}
```

## TypeScript Integration

### Generated Types and Hooks

The project uses GraphQL Code Generator to create TypeScript types and React hooks. These are generated in `src/graphql/generated/graphql.ts`.

### Using Generated Hooks

Example of using the products query hook:

```typescript
import { useProductsQuery } from '@/graphql/generated/graphql';

function ProductList() {
  const { data, loading, error } = useProductsQuery({
    variables: {
      limit: 10,
      offset: 0
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

Example of using a mutation hook:

```typescript
import { useCreateProductMutation } from '@/graphql/generated/graphql';

function CreateProductForm() {
  const [createProduct, { loading }] = useCreateProductMutation();

  const handleSubmit = async (formData: CreateProductInput) => {
    try {
      const result = await createProduct({
        variables: { input: formData }
      });
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Form implementation
  );
}
```

### Error Handling

The project includes a custom hook for handling GraphQL errors:

```typescript
import { useGraphQLError } from '@/hooks/useGraphQLError';

function ProductManagement() {
  const handleError = useGraphQLError({
    onUnauthorized: () => {
      // Handle unauthorized access
    },
    onForbidden: () => {
      // Handle forbidden access
    },
    onNotFound: () => {
      // Handle not found errors
    }
  });

  // Use handleError with Apollo operations
}
```

## Common Patterns and Best Practices

### Data Fetching

1. Always use generated hooks instead of raw queries
2. Implement proper loading states
3. Handle errors using useGraphQLError hook
4. Use pagination for lists
5. Consider implementing infinite scroll for better UX

### State Management

1. Utilize Apollo Client cache
2. Configure proper cache policies for each type
3. Use field policies for computed fields
4. Implement optimistic updates for better UX

Example cache configuration:

```typescript
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          }
        }
      }
    }
  }
});
```

### Authentication Integration

1. Always check session state for protected routes
2. Use authentication hooks in components
3. Handle token expiration and refresh
4. Implement proper error handling for auth errors

Example protected component:

```typescript
function ProtectedComponent() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    // Protected content
  );
}
```

## Troubleshooting

### Common Issues

1. Type Generation Issues

   - Run `pnpm codegen` to regenerate types
   - Ensure all .graphql files are properly formatted
   - Check codegen.yml configuration

2. Authentication Problems

   - Verify token presence in requests
   - Check token expiration
   - Ensure proper NextAuth.js configuration

3. Cache-Related Issues
   - Clear Apollo Client cache
   - Review cache policies
   - Check field policy configurations

### Development Tools

1. GraphQL Playground

   - Available at /api/graphql in development
   - Use for testing queries and mutations
   - Explore schema documentation

2. Apollo Client DevTools

   - Install browser extension
   - Monitor cache state
   - Debug queries and mutations

3. TypeScript Integration
   - Use VSCode with GraphQL plugin
   - Enable TypeScript strict mode
   - Utilize generated types

### Error Codes

| Code           | Description               | Solution           |
| -------------- | ------------------------- | ------------------ |
| UNAUTHORIZED   | User not authenticated    | Redirect to login  |
| FORBIDDEN      | User lacks permissions    | Check user roles   |
| NOT_FOUND      | Resource not found        | Validate IDs/paths |
| BAD_USER_INPUT | Invalid input data        | Validate form data |
| DATABASE_ERROR | Database operation failed | Check logs         |

For additional support or bug reports, please refer to the project repository.

## Testing

### Unit Tests

Run unit tests:

```bash
pnpm test
```

Run tests with coverage:

```bash
pnpm test:coverage
```

Example test for product resolver:

```typescript
describe("Product Resolvers", () => {
  it("fetches products with pagination", async () => {
    const result = await resolvers.Query?.products?.(
      {},
      { limit: 10, offset: 0 },
      { prisma: prismaMock, user: null },
      {} as GraphQLResolveInfo,
    );
    expect(result).toBeDefined();
  });
});
```

### Integration Tests

Test setup using custom render utility:

```typescript
import { render } from '@/test/utils/render';

describe('Product Flow Integration', () => {
  it('allows user to create and view a new product', async () => {
    render(
      <MockedProvider mocks={[productMocks]}>
        <ProductsPage />
      </MockedProvider>
    );
    // Test implementation
  });
});
```

## Performance Considerations

### Caching Strategy

1. Field-level caching:

```typescript
const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      fields: {
        formattedPrice: {
          read(price: number) {
            return `${price.toFixed(2)}`;
          }
        }
      }
    }
  }
});
```

2. Pagination caching:

- Implemented merge functions for paginated queries
- Proper cache key management
- Optimistic updates for mutations

### Query Optimization

1. Selective field querying
2. Proper use of fragments
3. Batching related queries
4. Implementing dataloader pattern in resolvers

## Security

### Authentication Flow

1. JWT token handling
2. Session management
3. CSRF protection
4. Rate limiting

### Authorization

1. Role-based access control
2. Resource ownership validation
3. Input sanitization
4. Error message security

### Data Protection

1. Password hashing with bcrypt
2. Secure session handling
3. Environment variable management
4. SQL injection prevention through Prisma

## Deployment

### Production Checklist

1. Environment variables setup
2. Database migration
3. Build optimization
4. Security headers
5. Error logging setup
6. Performance monitoring

### CI/CD Pipeline

1. GitHub Actions configuration
2. Automated testing
3. Deployment automation
4. Environment management

For additional support or bug reports, please refer to the project repository.
