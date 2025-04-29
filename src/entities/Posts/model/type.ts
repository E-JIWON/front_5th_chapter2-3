import { Author } from "@/entities/Users/model/type"

// api/posts
export interface PostsResponse {
  posts: PostDTO[]
  total: number
  skip: number
  limit: number
}

// 포스트 (유저 결합 전)
export interface PostDTO {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

// 이건 어디다 두지
export interface PostListItem extends PostDTO {
  author: Author
}
