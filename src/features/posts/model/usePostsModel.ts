// features/posts/model/usePostsModel.ts
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useSearchPosts from "./useSearchPosts"
import useGetPosts from "./useGetPost"
import usePostsByTag from "./usePostByTag"

const usePostsModel = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 정렬 및 필터
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  // 페이지네이션
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))

  // 로컬 상태로 posts 관리 (React Query와 함께 사용)
  const [localPosts, setLocalPosts] = useState([])
  const [localTotal, setLocalTotal] = useState(0)

  // 일반 게시물 쿼리
  const { data: postsData, isLoading: isPostsLoading } = useGetPosts({
    limit,
    skip,
    sortBy,
    sortOrder,
    enabled: !selectedTag && !searchQuery,
  })

  // 검색 쿼리
  const {
    data: searchData,
    isLoading: isSearchLoading,
    refetch: refetchSearch,
  } = useSearchPosts(searchQuery, !!searchQuery)

  // 태그별 쿼리
  const { data: tagData, isLoading: isTagLoading, refetch: refetchTag } = usePostsByTag(selectedTag, !!selectedTag)

  // 데이터가 로드되면 로컬 상태 업데이트
  useEffect(() => {
    if (selectedTag && tagData) {
      setLocalPosts(tagData.posts)
      setLocalTotal(tagData.total)
    } else if (searchQuery && searchData) {
      setLocalPosts(searchData.posts)
      setLocalTotal(searchData.total)
    } else if (postsData) {
      setLocalPosts(postsData.posts)
      setLocalTotal(postsData.total)
    }
  }, [postsData, searchData, tagData, selectedTag, searchQuery])

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 검색 함수
  const searchPosts = () => {
    if (!searchQuery) return
    refetchSearch()
  }

  // 태그별 게시물 가져오기 함수
  const fetchPostsByTag = (tag) => {
    if (!tag || tag === "all") {
      setSelectedTag("")
      return
    }

    setSelectedTag(tag)
    refetchTag() // React Query의 refetch 활용
  }

  // 게시물 추가 함수
  const addPost = async (newPost) => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()

      // 로컬 상태 업데이트
      setLocalPosts((prev) => [data, ...prev])
      setLocalTotal((prev) => prev + 1)

      return data
    } catch (error) {
      console.error("게시물 추가 오류:", error)
      throw error
    }
  }

  // 게시물 업데이트 함수
  const updatePost = async (post) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      const data = await response.json()

      // 로컬 상태 업데이트
      setLocalPosts((prev) => prev.map((p) => (p.id === post.id ? data : p)))

      return data
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
      throw error
    }
  }

  // 게시물 삭제 함수
  const deletePost = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })

      // 로컬 상태 업데이트
      setLocalPosts((prev) => prev.filter((post) => post.id !== id))
      setLocalTotal((prev) => prev - 1)

      return id
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
      throw error
    }
  }

  // 정렬/필터 바뀔때마다 호출
  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return {
    // 포스트 관련 (이제 로컬 상태 반환)
    posts: localPosts,
    total: localTotal,
    loading: isPostsLoading || isSearchLoading || isTagLoading,

    // 정렬 및 필터 상태
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,

    // 페이지네이션
    skip,
    setSkip,

    // CRUD 함수들
    searchPosts,
    fetchPostsByTag,
    addPost,
    updatePost,
    deletePost,
    updateURL,
  }
}

export default usePostsModel
