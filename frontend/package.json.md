## [package.json](package.json)

### Package configuration for a Next.js frontend project

This `package.json` file defines the configuration for a frontend project built with Next.js. The project is named "frontend" and is currently at version 0.1.0. It is marked as private, indicating it is not intended for publishing.

The `scripts` section includes commands for common tasks:
- `dev`: Runs the development server using `next dev`.
- `build`: Compiles the application for production with `next build`.
- `start`: Starts the production server using `next start`.
- `lint`: Runs the linter with `next lint`.

The `dependencies` section lists the libraries required for the project to run. Key dependencies include:
- `@aws-sdk/client-s3` and `@aws-sdk/s3-presigned-post` for AWS S3 interactions.
- `@emotion/react` and `@emotion/styled` for CSS-in-JS styling.
- `@mui/material` and `@mui/icons-material` for Material-UI components and icons.
- `@pinecone-database/pinecone` for Pinecone database interactions.
- `@radix-ui/react-*` for Radix UI components.
- `formidable` for handling form data.
- `next`, `react`, and `react-dom` as core dependencies for a Next.js application.
- `openai` for OpenAI API interactions.
- `posthog-js` for analytics.
- `react-markdown` for rendering Markdown in React.
- `tailwind-merge` and `tailwindcss-animate` for Tailwind CSS utilities.

The `devDependencies` section includes tools and libraries needed for development:
- TypeScript and its type definitions for Node.js, React, and React DOM.
- ESLint and `eslint-config-next` for linting.
- PostCSS and Tailwind CSS for styling.

This configuration ensures that the project has all necessary tools and libraries for development, building, and running a Next.js application with a rich set of features and integrations.

