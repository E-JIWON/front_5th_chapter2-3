import { CommentItem } from "@/entities/Comments/model/type"
import { useCustomMutation } from "@/shared/api/useCustomMutation"

/**
 * 댓글 좋아요 기능을 위한 Custom Hㄴook
 * @param callback 좋아요 추가 후 실행할 콜백 함수
 * @returns 댓글 좋아요 함수 및 상태 정보
 */
export const useLikeComment = (callback?: (updatedComment: CommentItem, originalLikes: number) => void) => {
  const likeCommentMutation = useCustomMutation(
    async ({ id, currentLikes }: { id: number; currentLikes: number }) => {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: currentLikes + 1 }),
      })

      if (!response.ok) {
        throw new Error("댓글 좋아요 처리 중 오류가 발생했습니다.")
      }

      const data = await response.json()
      return { updatedComment: data, originalLikes: currentLikes }
    },
    {
      onSuccess: (data: { updatedComment: CommentItem; originalLikes: number }) => {
        if (callback) {
          callback(data.updatedComment, data.originalLikes)
        }
      },
      onError: (error) => {
        console.error("댓글 좋아요 오류:", error)
      },
    },
  )

  // 댓글 좋아요 함수
  const likeComment = (id: number, currentLikes: number) => {
    likeCommentMutation.mutate({ id, currentLikes })
  }

  return {
    likeComment,
    isLoading: likeCommentMutation.isLoading,
    error: likeCommentMutation.error,
  }
}

export default useLikeComment
