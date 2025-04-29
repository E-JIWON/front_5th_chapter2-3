// User 타입 정의
export interface CommentUser {
  id: number
  username: string
  fullName: string
}
export interface CommentItem {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

// /api/comments/post/
export interface CommentsPostResponse {
  comments: CommentItem[]
  total: number
  skip: number
  limit: number
}

// 댓글 생성 요청 타입
export interface CommentCreateRequest {
  body: string
  postId: number | null
  userId: number
}

// 댓글 추가 응답 타입
export interface CommentAddResponse {
  id: number
  body: string
  postId: number
  user: CommentUser
}
