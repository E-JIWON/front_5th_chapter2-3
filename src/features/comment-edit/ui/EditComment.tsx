import { CommentItem } from "@/entities/Comments/model/type"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Textarea } from "@/shared/ui/Textarea"
import { useCommentEditStore } from "../model/useCommentEditStore"
import { useCommentModel } from "../model/useCommentEditModel"

interface EditCommentProps {
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
}

const EditComment = (props: EditCommentProps) => {
  const { setComments } = props
  const { showEditCommentDialog, closeEditDialog, updateCommentBody, selectedComment } = useCommentEditStore()
  const { handleUpdateComment } = useCommentModel({ setComments })

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={closeEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => updateCommentBody(e.target.value)}
          />

          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditComment
