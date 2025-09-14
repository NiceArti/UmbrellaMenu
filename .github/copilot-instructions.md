# Copilot Instructions for UmbrellaMenu

Welcome to the UmbrellaMenu codebase! This document provides essential guidelines for AI coding agents to be productive and effective contributors to this project. Please follow these instructions carefully to maintain consistency and quality.

## Project Overview

UmbrellaMenu is a Next.js-based web application designed for managing and displaying menu sections. The project uses modern web development tools and libraries, including:

- **Next.js**: Framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: For type-safe JavaScript development.

### Key Directories

- `app/`: Contains the main application pages and API routes.
- `db/`: Stores JSON files for collections and other data.
- `screens/`: Houses React components for different screens, such as `home` and `admin`.
- `shared/`: Includes shared configurations, constants, and utility functions.
- `widgets/`: Modular UI components like `header`, `footer`, and `login-modal`.

## Development Workflow

### Running the Project

To start the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### File Conventions

- **Components**: Use functional components with hooks. Place reusable components in the `widgets/` directory.
- **Styling**: Use Tailwind CSS classes for styling. Avoid inline styles unless absolutely necessary.
- **TypeScript**: Define types and interfaces in `shared/types/`.
- **Utilities**: Place helper functions in `shared/utils/`.

### API Routes

API routes are located in `app/api/`. Each route is organized by feature, e.g., `auth/login/route.ts` for authentication.

### Data Management

Data is primarily managed through JSON files in the `db/` directory. Use utility functions in `shared/utils/` for reading and writing data.

## Project-Specific Patterns

### Navigation

Navigation items are defined in `shared/config/nav-items.ts`. Update this file to modify the site's navigation structure.

### Hooks

Custom hooks are stored in feature-specific directories, e.g., `screens/admin/hooks/` or `widgets/menu-positions/hooks/`.

### UI Components

Reusable UI components like buttons and layouts are in `shared/ui/`. Follow the existing patterns when adding new components.

## External Dependencies

- **Vercel**: For deployment. Refer to the [Vercel documentation](https://vercel.com/docs) for deployment steps.
- **Tailwind CSS**: Configured in `tailwind.config.ts`.

## Testing and Debugging

- Use the browser's developer tools for debugging.
- Add console logs sparingly and remove them before committing.
- Write unit tests for critical functions and components.

## Contribution Guidelines

- Follow the existing code structure and naming conventions.
- Document complex functions and components with comments.
- Test your changes locally before pushing.

For any questions or clarifications, refer to the `README.md` or consult the project maintainers.