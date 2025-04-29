import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// 한개씩 해보자..
const usePostsModel = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 포스트 관련
  const [posts, setPosts] = useState([]) // 포스트 전체
  const [loading, setLoading] = useState(false) // 로딩
  const [total, setTotal] = useState(0) // 포스트 전체 개수

  // 정렬 및 필터
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10")) // 표시 개수
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "") // 검색한
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "") // 정렬 기준
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc") // 정렬
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "") // 태그 검색 ?

  // 페이지네이션
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0")) // 다음/이전 버튼

  // 게시물 가져오기
  const fetchPosts = () => {
    setLoading(true)
    let postsData
    let usersData

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
        }))
        setPosts(postsWithUsers)

        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 정렬/필터 바뀔때마다 호출 -> 포스트 패치, 태그,
  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  return {
    // 포스트 관련
    posts,
    setPosts,
    loading,
    total,

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
  }
}

export default usePostsModel
