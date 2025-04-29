import { PostListItem } from "@/entities/Posts/model/type"
import { create } from "zustand"

interface SelectedPostStore {
  selectedPost: PostListItem | null
  setSelectedPost: (post: PostListItem | null) => void
  clearSelectedPost: () => void
}

export const useSelectedPostStore = create<SelectedPostStore>((set) => ({
  selectedPost: null,

  setSelectedPost: (post) => set({ selectedPost: post }),
  clearSelectedPost: () => set({ selectedPost: null }),
}))
