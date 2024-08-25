import * as React from "react"
 

  export default function Features() {
  return (
    <div className="p-10 bg-black">
    <p className="text-yellow-400 font-bold text-center text-3xl mb-8">Features</p>

    <div className="p-8 bg-black">
  <div className="flex flex-wrap gap-6 justify-center">
    <div className="p-8 text-center text-yellow-50 bg-gray-900 rounded-lg shadow-md max-w-lg flex-1">
      <p className="text-xl font-semibold mb-4 text-yellow-200">Realtime Transcript Editing</p>
      <p>
        Users can easily browse and view transcripts with an intuitive interface that supports search functionality and smooth navigation. The viewer allows for text highlighting, searching within transcripts, and quick access to specific sections.
      </p>
    </div>

    <div className="p-8 text-center text-yellow-50 bg-gray-900 rounded-lg shadow-md max-w-lg flex-1">
      <p className="text-xl font-semibold mb-4 text-yellow-200 ">Interactive Commenting System</p>
      <p>
        The app includes a robust commenting system where users can add, edit, or delete comments on specific parts of a transcript. This feature facilitates discussion, feedback, and collaboration among team members.
      </p>
    </div>

    <div className="p-8 text-center text-yellow-50 bg-gray-900 rounded-lg shadow-md max-w-lg flex-1">
      <p className="text-xl font-semibold mb-4 text-yellow-200" >LLM-Powered Transcript and Comment Processing</p>
      <p>
        The app leverages a Large Language Model (LLM) to automatically analyze and process transcripts and comments. This feature includes summarizing key points, detecting sentiment, generating insights, and offering recommendations based on the content, improving productivity and decision-making.
      </p>
    </div>
  </div>
</div>


    
    
</div>

  )
}
