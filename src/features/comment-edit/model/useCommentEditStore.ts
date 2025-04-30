// src/features/comment-edit/model/useCommentEditStore.ts
import { CommentItem } from "@/entities/Comments/model/type"
import { create } from "zustand"

interface CommentEditStore {
  // 상태
  showEditCommentDialog: boolean
  selectedComment: CommentItem | null

  // 액션
  openEditDialog: (comment: CommentItem) => void
  closeEditDialog: () => void
  updateCommentBody: (body: string) => void
  resetSelectedComment: () => void
}

export const useCommentEditStore = create<CommentEditStore>((set) => ({
  // 초기 상태
  showEditCommentDialog: false,
  selectedComment: null,

  // 액션
  openEditDialog: (comment) =>
    set({
      showEditCommentDialog: true,
      selectedComment: comment,
    }),

  closeEditDialog: () =>
    set({
      showEditCommentDialog: false,
    }),

  updateCommentBody: (body) =>
    set((state) => ({
      selectedComment: state.selectedComment ? { ...state.selectedComment, body } : null,
    })),

  resetSelectedComment: () =>
    set({
      selectedComment: null,
    }),
}))
