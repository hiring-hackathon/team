## [globals.css](globals.css)

### Global CSS configuration with Tailwind and custom properties

This `globals.css` file sets up global styles for a project using Tailwind CSS. It imports the base, components, and utilities layers from Tailwind, ensuring that the project's styles are built on a solid foundation of pre-defined classes and utilities.

The file defines CSS custom properties (`--foreground-rgb`, `--background-start-rgb`, and `--background-end-rgb`) within the `:root` selector to manage color values for both light and dark themes. These properties are dynamically adjusted based on the user's preferred color scheme, detected via the `prefers-color-scheme` media query. For light mode, the foreground color is set to black, and the background transitions from a light gray to white. In dark mode, the foreground color switches to white, and the background becomes black.

The `body` element's color and background are styled using these custom properties, ensuring a consistent look that adapts to the user's theme preference. Additionally, a custom utility class `.text-balance` is defined within the `@layer utilities` directive to apply balanced text wrapping, enhancing text readability.

This setup provides a flexible and responsive design foundation, leveraging Tailwind's utility-first approach and CSS custom properties for theme management.

[Back to (root)](#root) | [Back to top](#table-of-contents)

