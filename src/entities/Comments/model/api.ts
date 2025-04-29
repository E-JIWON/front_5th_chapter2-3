// entities/Comments/model/api.ts
import { CommentsPostResponse, CommentCreateRequest, CommentAddResponse } from "./type"

/**
 * 특정 게시물의 댓글 목록을 가져오는 API 호출 함수
 * @param postId 댓글을 가져올 게시물 ID
 * @returns 댓글 목록 응답 데이터
 */
export const getCommentApi = async (postId: number): Promise<CommentsPostResponse> => {
  const response = await fetch(`/api/comments/post/${postId}`)

  if (!response.ok) {
    throw new Error("댓글 가져오기 실패")
  }

  return response.json()
}

/**
 * 새 댓글을 추가하는 API 호출 함수
 * @param commentData 추가할 댓글 데이터
 * @returns 추가된 댓글 데이터
 */
export const addCommentApi = async (commentData: CommentCreateRequest): Promise<CommentAddResponse> => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  })

  if (!response.ok) {
    throw new Error("댓글 추가 실패")
  }

  return response.json()
}
