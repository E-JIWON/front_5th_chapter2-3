import { PostList, PostsResponse } from "@/entities/Posts/model/type"
import { UserFilterResponse } from "@/entities/Users/model/type"
import { useQuery } from "@tanstack/react-query"

const usePostsByTag = (tag: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["posts_by_tag", tag],
    queryFn: async () => {
      if (!tag || tag === "all") {
        return { posts: [], total: 0 }
      }

      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch(`/api/posts/tag/${tag}`),
          fetch("/api/users?limit=0&select=username,image"),
        ])

        const postsData: PostsResponse = await postsResponse.json()
        const usersData: UserFilterResponse = await usersResponse.json()

        const postsWithUsers: PostList[] = postsData.posts.map((post) => ({
          ...post,
          author: usersData.users.find((user) => user.id === post.userId),
        }))

        return {
          posts: postsWithUsers,
          total: postsData.total,
        }
      } catch (error) {
        console.error("태그별 게시물 가져오기 오류:", error)
        throw error
      }
    },
    enabled: enabled && !!tag && tag !== "all",
  })
}

export default usePostsByTag
