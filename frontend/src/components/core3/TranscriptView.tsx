// components/TranscriptView.tsx
import { SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface TranscriptViewProps {
    transcript: string
    onAddComment: (text: string, startIndex: number, endIndex: number) => void
}

export function TranscriptView({ transcript, onAddComment }: TranscriptViewProps) {
    const [selection, setSelection] = useState({ start: 0, end: 0 })
    const [comment, setComment] = useState('')

    const handleSelection = () => {
        const selection = window.getSelection()
        if (selection) {
            setSelection({
                start: selection.anchorOffset,
                end: selection.focusOffset
            })
        }
    }

    const handleAddComment = () => {
        onAddComment(comment, selection.start, selection.end)
        setComment('')
    }

    return (
        <Card className="p-4">
            <p onMouseUp={handleSelection}>{transcript}</p>
            <Textarea
                value={comment}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="mt-4"
            />
            <Button onClick={handleAddComment} className="mt-2">Add Comment</Button>
        </Card>
    )
}