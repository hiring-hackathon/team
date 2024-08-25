// components/CommentList.tsx
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Comment {
    id: string
    text: string
    startIndex: number
    endIndex: number
}

interface CommentListProps {
    comments: Comment[]
    onEditComment: (id: string, text: string) => void
    onDeleteComment: (id: string) => void
}

export function CommentList({ comments, onEditComment, onDeleteComment }: CommentListProps) {
    return (
        <div>
            {comments.map((comment) => (
                <Card key={comment.id} className="p-4 mt-2">
                    <p>{comment.text}</p>
                    <Button onClick={() => onEditComment(comment.id, comment.text)} className="mr-2">Edit</Button>
                    <Button onClick={() => onDeleteComment(comment.id)} variant="destructive">Delete</Button>
                </Card>
            ))}
        </div>
    )
}