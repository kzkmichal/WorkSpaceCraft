# WorkSpaceCraft

WorkSpaceCraft is a web application designed for remote and hybrid workers, providing a curated collection of products, tools, and furniture for home office setups.

## Features

- 🏠 Comprehensive database of work-from-home essentials
- 👥 User-driven product recommendations and reviews
- 🖼️ Workspace setup gallery
- 📚 Educational content on ergonomics and productivity
- 🔍 Advanced search and filtering options
- ⭐ Personal favorites list

## Tech Stack

- **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, GraphQL, Apollo Server
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel, Docker

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/workspacecraft.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Set up the database:

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

5. Start the development server:

```bash
pnpm dev
```

## Documentation

Comprehensive documentation is available in the [docs](./docs) directory:

- [Complete API Documentation](./docs/api.md) - Detailed guide for GraphQL API, authentication, and more
- [Documentation Overview](./docs/README.md) - Guide to using the documentation

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm lint` - Run linting
- `pnpm codegen` - Generate GraphQL types
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
