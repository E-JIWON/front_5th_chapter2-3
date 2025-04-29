import { useCustomMutation } from "@/shared/api/useCustomMutation"

/**
 * 댓글 삭제를 위한 Custom Hook
 * @param callback 댓글 삭제 후 실행할 콜백 함수
 * @returns 댓글 삭제 함수 및 상태 정보
 */
export const useDeleteComment = (callback?: (id: number) => void) => {
  const deleteCommentMutation = useCustomMutation(
    async (id: number) => {
      const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("댓글 삭제 중 오류가 발생했습니다.")
      }

      return { id, success: true }
    },
    {
      onSuccess: (data: { id: number; success: boolean }) => {
        if (data.success && callback) {
          callback(data.id)
        }
      },
    },
  )

  // 댓글 삭제 함수
  const deleteComment = (id: number) => {
    deleteCommentMutation.mutate(id)
  }

  return {
    deleteComment,
  }
}

export default useDeleteComment
