import { useQuery } from "@tanstack/react-query"

const useSearchPosts = (searchQuery: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["search_posts", searchQuery],
    queryFn: async () => {
      if (!searchQuery) {
        return { posts: [], total: 0 }
      }

      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()

      return {
        posts: data.posts,
        total: data.total,
      }
    },
    enabled: enabled && !!searchQuery, // 검색어가 있을 때만 쿼리 활성화
  })
}

export default useSearchPosts
