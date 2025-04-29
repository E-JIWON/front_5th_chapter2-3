import { useCustomMutation } from "@/shared/api/useCustomMutation"

export const useAddPost = (onSuccessCallback?: () => void) => {
  return useCustomMutation(async (newPost) => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()

    // 성공 콜백 호출
    if (onSuccessCallback) {
      onSuccessCallback()
    }

    return data
  })
}
