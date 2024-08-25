// components/core/transcript-detail.tsx
import { useState, useEffect } from 'react'
import { TranscriptView } from './TranscriptView'
import { CommentList } from './CommentList'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface TranscriptDetailProps {
    transcriptId: string
}

export default function TranscriptDetail({ transcriptId }: TranscriptDetailProps) {
    const [transcript, setTranscript] = useState('')
    const [comments, setComments] = useState([])
    const [summary, setSummary] = useState('')

    useEffect(() => {
        // Fetch transcript and comments from API
        // This is a placeholder - replace with actual API call
        const fetchData = async () => {
            // const response = await fetch(`/api/transcripts/${transcriptId}`)
            // const data = await response.json()
            // setTranscript(data.transcript)
            // setComments(data.comments)
        }
        fetchData()
    }, [transcriptId])

    const handleAddComment = async (text: string, startIndex: number, endIndex: number) => {
        // Add comment to database
        // This is a placeholder - replace with actual API call
        // const response = await fetch('/api/comments', {
        //   method: 'POST',
        //   body: JSON.stringify({ transcriptId, text, startIndex, endIndex }),
        // })
        // const newComment = await response.json()
        // setComments([...comments, newComment])
    }

    const handleEditComment = async (id: string, text: string) => {
        // Edit comment in database
        // This is a placeholder - replace with actual API call
        // await fetch(`/api/comments/${id}`, {
        //   method: 'PUT',
        //   body: JSON.stringify({ text }),
        // })
        // setComments(comments.map(c => c.id === id ? { ...c, text } : c))
    }

    const handleDeleteComment = async (id: string) => {
        // Delete comment from database
        // This is a placeholder - replace with actual API call
        // await fetch(`/api/comments/${id}`, { method: 'DELETE' })
        // setComments(comments.filter(c => c.id !== id))
    }

    const handleGenerateSummary = async () => {
        // Generate summary using LLM
        // This is a placeholder - replace with actual API call
        // const response = await fetch('/api/summarize', {
        //   method: 'POST',
        //   body: JSON.stringify({ transcriptId }),
        // })
        // const data = await response.json()
        // setSummary(data.summary)
    }

    return (
        <div>
            <h1>Transcript {transcriptId}</h1>
            <TranscriptView transcript={transcript} onAddComment={handleAddComment} />
            <CommentList
                comments={comments}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment}
            />
            <Button onClick={handleGenerateSummary} className="mt-4">Generate Summary</Button>
            {summary && (
                <Card className="p-4 mt-4">
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </Card>
            )}
        </div>
    )
}