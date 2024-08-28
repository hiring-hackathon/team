## [textarea.tsx](textarea.tsx)

### Customizable and accessible textarea component for React applications

This code defines a reusable and customizable `Textarea` component using React. It extends the standard HTML `<textarea>` element by incorporating additional styling and functionality. The `Textarea` component accepts all standard properties of a `<textarea>` element through the `TextareaProps` interface, which extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>`. 

The component uses the `React.forwardRef` function to forward refs to the underlying `<textarea>` element, enabling parent components to directly interact with the DOM node if needed. The `className` prop allows for additional custom styling, which is merged with a set of predefined classes using the `cn` utility function. These predefined classes ensure the textarea is responsive, accessible, and visually consistent with a rounded border, padding, and focus styles. The component also handles disabled states by adjusting the cursor and opacity accordingly. 

Overall, this `Textarea` component provides a flexible and accessible text input area that can be easily integrated and customized within React applications.

[Back to (root)](#root) | [Back to top](#table-of-contents)
