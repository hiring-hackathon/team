## [package.json](package.json)

### Package configuration for a Next.js project with AWS S3 integration

This `package.json` file defines the configuration for a Next.js project named "s3-upload-next". The project is currently in version 0.1.0 and is marked as private, indicating it is not intended for public distribution. The file specifies several npm scripts for common tasks: `dev` for development mode, `build` for creating a production build, `start` for starting the production server, and `lint` for running ESLint to check code quality.

The dependencies section includes essential libraries for the project's functionality. It uses `@aws-sdk/client-s3` and `@aws-sdk/s3-presigned-post` for interacting with AWS S3, and `aws-sdk` for broader AWS service integration. `axios` is included for making HTTP requests, and `formidable` is used for handling file uploads. The project is built on `next` version 14.2.6, with `react` and `react-dom` both at version 18, providing the core framework and rendering capabilities.

In the devDependencies section, type definitions for TypeScript are provided for `formidable`, `node`, `react`, and `react-dom`, ensuring type safety and better development experience. ESLint and its Next.js configuration are included for maintaining code quality. Additionally, `postcss` and `tailwindcss` are present for styling, and `typescript` is used for adding static type definitions to the project.

Overall, this `package.json` file sets up a robust development environment for a Next.js application that integrates with AWS S3 for file uploads, ensuring a smooth development workflow and high code quality.

[Back to (root)](#root) | [Back to top](#table-of-contents)
