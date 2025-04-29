import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useGetPosts from "./useGetPost"
import useSearchPosts from "./useSearchPosts"
import usePostsByTag from "./usePostByTag"

// 한개씩 해보자..
const usePostsModel = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 정렬 및 필터
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10")) // 표시 개수
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "") // 검색한
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "") // 정렬 기준
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc") // 정렬
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "") // 태그 검색 ?

  // 페이지네이션
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0")) // 다음/이전 버튼

  // 게시물 쿼리 사용
  const {
    data: postsData,
    isLoading: isPostsLoading,
    refetch: refetchPosts,
  } = useGetPosts({
    limit,
    skip,
    sortBy,
    sortOrder,
    enabled: !selectedTag && !searchQuery, // 태그나 검색어가 없을 때만 활성화
  })

  // 검색 쿼리 추가
  const {
    data: searchData,
    isLoading: isSearchLoading,
    refetch: refetchSearch,
  } = useSearchPosts(searchQuery, !!searchQuery)

  // 태그별 게시물 쿼리 추가
  const { data: tagData, refetch: refetchTagPosts } = usePostsByTag(selectedTag, !!selectedTag)

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

  // 게시물 검색
  const searchPosts = async () => {
    refetchSearch()
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      setSelectedTag("")
      refetchPosts()
      return
    }
    refetchTagPosts()
  }

  // 정렬/필터 바뀔때마다 호출 -> 포스트 패치, 태그,
  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      // fetchPosts()
    }
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

  // 최종 데이터 결정 (태그 데이터, 검색 데이터, 또는 일반 게시물 데이터)
  let finalPosts = []
  let finalTotal = 0

  if (selectedTag) {
    finalPosts = tagData?.posts || []
    finalTotal = tagData?.total || 0
  } else if (searchQuery) {
    finalPosts = searchData?.posts || []
    finalTotal = searchData?.total || 0
  } else {
    finalPosts = postsData?.posts || []
    finalTotal = postsData?.total || 0
  }

  return {
    // 포스트 관련
    posts: finalPosts,
    total: finalTotal,
    loading: isPostsLoading || isSearchLoading,

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

    // 함수들
    searchPosts,
    updateURL,
    fetchPostsByTag,
  }
}

export default usePostsModel
