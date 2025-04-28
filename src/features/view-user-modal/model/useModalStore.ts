import { fetchUserById } from "@/entities/Users/model/api"
import { User } from "@/entities/Users/model/type"
import { create } from "zustand"

interface UserModalState {
  showUserModal: boolean
  selectedUser: User | null
  openUserModal: (userId: number) => Promise<void>
  setShowUserModal: (open: boolean) => void
}

export const useUserModalStore = create<UserModalState>((set) => ({
  showUserModal: false,
  selectedUser: null,

  openUserModal: async (userId: number) => {
    try {
      const userData = await fetchUserById(userId)
      set({ selectedUser: userData, showUserModal: true })
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  },

  setShowUserModal: (open: boolean) => set({ showUserModal: open }),
}))
