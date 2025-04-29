import { CommentAddResponse, CommentItem } from "@/entities/Comments/model/type"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Textarea } from "@/shared/ui/Textarea"
import { useAddComment } from "../api/useAddComment"

interface AddCommentProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  newComment: {
    body: string
    postId: any
    userId: number
  }
  setNewComment: React.Dispatch<
    React.SetStateAction<{
      body: string
      postId: any
      userId: number
    }>
  >
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
}

const AddComment = (props: AddCommentProps) => {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment, setComments } = props

  // 기존 댓글 목록에 새 댓글 추가
  const handleCommentAdded = (addedComment: CommentAddResponse) => {
    setComments((prev) => [...prev, addedComment as unknown as CommentItem])
  }

  // 댓글 추가 성공 핸들러
  const handleSuccess = (addedComment: CommentAddResponse) => {
    handleCommentAdded(addedComment)

    // 입력 필드 및 다이얼로그 초기화
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }

  // 댓글 추가 Hook 사용
  const { addComment } = useAddComment(handleSuccess)

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (newComment.body.trim() === "") return
    addComment(newComment)
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddComment
