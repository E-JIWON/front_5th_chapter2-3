import { CommentAddResponse, CommentItem } from "@/entities/Comments/model/type"
import { useAddComment } from "@/features/comment-add/model/useAddComment"
import { useCommentAddStore } from "./useCommentAddStore"

interface UseCommentAddProps {
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
}

/**
 *
 * @param param0
 * @returns 댓글 추가 핸들러
 */
export const useCommentAddModel = ({ setComments }: UseCommentAddProps) => {
  const { newComment, closeAddCommentDialog, resetNewComment } = useCommentAddStore()

  // 댓글 추가 성공 핸들러
  const handleSuccess = (addedComment: CommentAddResponse) => {
    // 댓글 목록에 새 댓글 추가
    setComments((prev) => [...prev, addedComment as unknown as CommentItem])

    // 상태 초기화
    closeAddCommentDialog()
    resetNewComment()
  }

  const { addComment } = useAddComment(handleSuccess)

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (newComment.body.trim() === "") return
    addComment(newComment)
  }

  return {
    handleAddComment,
  }
}
