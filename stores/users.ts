import { defineStore } from 'pinia'

interface User {
  id: number;
  // add other user properties as needed
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    loading: false,
    error: null,
    selectedUser: null,
  }),
  actions: {
    async fetchUsers(this: UsersState & { users: User[]; loading: boolean; error: string | null; selectedUser: User | null }) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('/api/user')
        if (!res.ok) throw new Error('Gagal mengambil data user')
        this.users = await res.json()
      } catch (err: any) {
        this.error = err.message || 'Unknown error'
      } finally {
        this.loading = false
      }
    },
    selectUser(this: UsersState, user: User) {
      this.selectedUser = user
    },
    clearSelectedUser(this: UsersState) {
      this.selectedUser = null
    }
  },
  getters: {
    userCount: (state) => state.users.length,
    getUserById: (state) => (id: number) => state.users.find(u => u.id === id),
  }
})
