import { CommentItem, CommentsPostResponse } from "@/entities/Comments/model/type"
import { getCommentApi } from "@/entities/Comments/model/api"
import { useCustomMutation } from "@/shared/api/useCustomMutation"

/**
 * 댓글 가져오기를 위한 Custom Hook
 * @param callback 댓글 로드 후 실행할 콜백 함수
 * @returns fetchComments 함수 및 상태 정보
 */
export const useGetComment = (callback?: (loadedComments: CommentItem[]) => void) => {
  const commentsMutation = useCustomMutation(
    async (postId: number) => {
      return await getCommentApi(postId)
    },
    {
      onSuccess: (data: CommentsPostResponse) => {
        if (callback) {
          callback(data.comments)
        }
      },
    },
  )

  // 댓글 가져오기 함수
  const fetchComments = (postId: number) => {
    commentsMutation.mutate(postId)
  }

  return {
    fetchComments,
    isLoading: commentsMutation.isLoading,
    error: commentsMutation.error,
  }
}
