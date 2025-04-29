// src/features/comment-add/model/useCommentAddStore.ts
import { create } from "zustand"

interface CommentAddStore {
  // 상태
  showAddCommentDialog: boolean
  newComment: {
    body: string
    postId: number | null
    userId: number
  }

  // 액션
  openAddCommentDialog: (postId: number) => void
  closeAddCommentDialog: () => void
  setNewCommentBody: (body: string) => void
  resetNewComment: () => void
}

export const useCommentAddStore = create<CommentAddStore>((set) => ({
  // 초기 상태
  showAddCommentDialog: false,
  newComment: {
    body: "",
    postId: null,
    userId: 1,
  },

  // 액션
  openAddCommentDialog: (postId) =>
    set({
      showAddCommentDialog: true,
      newComment: { body: "", postId, userId: 1 },
    }),

  closeAddCommentDialog: () =>
    set({
      showAddCommentDialog: false,
    }),

  setNewCommentBody: (body) =>
    set((state) => ({
      newComment: { ...state.newComment, body },
    })),

  resetNewComment: () =>
    set({
      newComment: { body: "", postId: null, userId: 1 },
    }),
}))
