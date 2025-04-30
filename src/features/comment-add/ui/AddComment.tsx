// src/features/comment-add/ui/AddComment.tsx
import { CommentItem } from "@/entities/Comments/model/type"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Textarea } from "@/shared/ui/Textarea"
import { useCommentAddModel } from "../model/useCommentAddModel"
import { useCommentAddStore } from "../model/useCommentAddStore"

interface AddCommentProps {
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
}

const AddComment = ({ setComments }: AddCommentProps) => {
  const { newComment, showAddCommentDialog, closeAddCommentDialog, setNewCommentBody } = useCommentAddStore()
  const { handleAddComment } = useCommentAddModel({ setComments })

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={closeAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewCommentBody(e.target.value)}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddComment
