const fetchUserById = async (userId: number) => {
  const response = await fetch(`/api/users/${userId}`)

  if (!response.ok) {
    throw new Error("사용자 정보 가져오기 실패")
  }

  return response.json()
}

export { fetchUserById }
