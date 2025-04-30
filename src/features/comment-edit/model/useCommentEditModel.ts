// src/features/comment-edit/model/useCommentEdit.ts
import { CommentItem } from "@/entities/Comments/model/type"
import { useCommentEditStore } from "./useCommentEditStore"
import useCommentEditQuery from "./useCommentEditQuery"

interface UseCommentModelProps {
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>
}

export const useCommentModel = ({ setComments }: UseCommentModelProps) => {
  const { selectedComment, closeEditDialog, resetSelectedComment } = useCommentEditStore()

  // 댓글 수정 성공 핸들러
  const handleUpdateSuccess = (updatedComment: CommentItem) => {
    // 댓글 목록 업데이트
    setComments((prev) => {
      return prev.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
    })

    // 대화상자 닫기 및 상태 초기화
    closeEditDialog()
    resetSelectedComment()
  }

  const { updateComment } = useCommentEditQuery(handleUpdateSuccess)

  // 댓글 수정 핸들러
  const handleUpdateComment = () => {
    if (!selectedComment || selectedComment.body.trim() === "") return

    updateComment({
      id: selectedComment.id,
      body: selectedComment.body,
    })
  }

  return {
    handleUpdateComment,
  }
}
