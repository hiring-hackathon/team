## [transcript-list.tsx](transcript-list.tsx)

### A React component that fetches and displays a list of transcripts from an API.

This file defines a React component named `TranscriptList` that is responsible for fetching and displaying a list of transcripts from an external API. The component uses the `useState` hook to manage the state of the transcripts and the `useEffect` hook to trigger the data fetching when the component mounts.

The `Transcript` interface defines the structure of each transcript object, which includes `TranscriptText` and `TranscriptId`. The `fetchTranscripts` function is an asynchronous function that makes a GET request to a specified API endpoint to retrieve the transcripts. Upon a successful response, it parses the JSON data and updates the component's state with the fetched transcripts.

The component renders a list of `Card` components, each representing a transcript. Each card includes a link to a detailed view of the transcript, displaying a truncated version of the transcript text and its ID. The `Link` component from `next/link` is used to enable client-side navigation to the detailed transcript pages. The `Card` component is used to style each transcript entry, providing a consistent and visually appealing layout.

