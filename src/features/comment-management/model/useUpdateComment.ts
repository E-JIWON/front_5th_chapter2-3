import { CommentItem } from "@/entities/Comments/model/type"
import { useCustomMutation } from "@/shared/api/useCustomMutation"

/**
 * 댓글 수정을 위한 Custom Hook
 * @param callback 댓글 수정 후 실행할 콜백 함수
 * @returns 댓글 수정 함수 및 상태 정보
 */
export const useUpdateComment = (callback?: (updatedComment: CommentItem) => void) => {
  const updateCommentMutation = useCustomMutation(
    async (comment: { id: number; body: string }) => {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: comment.body }),
      })

      if (!response.ok) {
        throw new Error("댓글 수정 중 오류가 발생했습니다.")
      }

      return await response.json()
    },
    {
      onSuccess: (data: CommentItem) => {
        if (callback) {
          callback(data)
        }
      },
    },
  )

  // 댓글 수정 함수
  const updateComment = (comment: { id: number; body: string }) => {
    updateCommentMutation.mutate(comment)
  }

  return {
    updateComment,
  }
}

export default useUpdateComment
