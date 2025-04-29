import { CommentItem } from "@/entities/Comments/model/type"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Textarea } from "@/shared/ui/Textarea"
import useUpdateComment from "../model/useUpdateComment"

//
interface EditCommentProps {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  selectedComment: CommentItem
  setSelectedComment: React.Dispatch<React.SetStateAction<CommentItem>>
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
}

const EditComment = (props: EditCommentProps) => {
  const { selectedComment, setSelectedComment, setShowEditCommentDialog, showEditCommentDialog, setComments } = props

  const { updateComment } = useUpdateComment((updatedComment) => {
    setComments((prev) => {
      return prev.map((comment: CommentItem) => (comment.id === updatedComment.id ? updatedComment : comment))
    })
    setShowEditCommentDialog(false)
  })

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={() => updateComment({ id: selectedComment.id, body: selectedComment.body })}>
            댓글 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditComment
