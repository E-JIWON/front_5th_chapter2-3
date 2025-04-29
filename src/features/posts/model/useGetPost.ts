// /features/posts/model/useGetPosts.ts
import { PostsResponse } from "@/entities/Posts/model/type"
import { UserFilterResponse } from "@/entities/Users/model/type"
import { useQuery } from "@tanstack/react-query"

/**
 * 게시물 데이터를 가져오기 위한 Query Hook
 */
const useGetPosts = (params: {
  limit: number
  skip: number
  sortBy?: string
  sortOrder?: string
  enabled?: boolean
}) => {
  const { limit, skip, sortBy, sortOrder, enabled = true } = params

  return useQuery({
    queryKey: ["posts_list", limit, skip, sortBy, sortOrder],
    queryFn: async () => {
      // 게시물 가져오기
      let url = `/api/posts?limit=${limit}&skip=${skip}`
      if (sortBy) url += `&sortBy=${sortBy}`
      if (sortOrder) url += `&sortOrder=${sortOrder}`

      const postsResponse = await fetch(url)
      const postsData: PostsResponse = await postsResponse.json()

      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersData: UserFilterResponse = await usersResponse.json()

      // 게시물과 사용자 정보 결합
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total,
      }
    },
    enabled: enabled,
  })
}

export default useGetPosts
