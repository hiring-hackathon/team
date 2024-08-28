## [page.tsx](page.tsx)

### A Next.js page component displaying transcript details with a footer.

This file defines a React component for a Next.js application that renders a page displaying the details of a transcript. The component uses the `useParams` hook from Next.js to extract the `transcriptId` from the URL parameters. It then passes this `transcriptId` to the `TranscriptDetail` component, which is responsible for fetching and displaying the transcript's information. The page layout is structured with a flexible column layout to ensure it spans the full height of the viewport. The `Footer` component is included at the bottom of the page to provide consistent footer content across the application. This setup ensures that the transcript details are prominently displayed in the main content area, while the footer remains fixed at the bottom.

