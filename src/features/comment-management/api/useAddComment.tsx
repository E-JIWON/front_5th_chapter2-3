import { CommentCreateRequest, CommentAddResponse } from "@/entities/Comments/model/type"
import { addCommentApi } from "@/entities/Comments/model/api"
import { useCustomMutation } from "@/shared/api/useCustomMutation"

/**
 * 댓글 추가를 위한 Custom Hook
 * @param callback 댓글 추가 후 실행할 콜백 함수
 * @returns 댓글 추가 함수 및 상태 정보
 */
export const useAddComment = (callback?: (addedComment: CommentAddResponse) => void) => {
  const addCommentMutation = useCustomMutation(
    async (commentData: CommentCreateRequest) => {
      return await addCommentApi(commentData)
    },
    {
      onSuccess: (data: CommentAddResponse) => {
        if (callback) {
          callback(data)
        }
      },
      onError: (error) => {
        console.error("댓글 추가 오류:", error)
      },
    },
  )

  // 댓글 추가 함수
  const addComment = (commentData: CommentCreateRequest) => {
    addCommentMutation.mutate(commentData)
  }

  return {
    addComment,
    isLoading: addCommentMutation.isLoading,
    error: addCommentMutation.error,
  }
}
