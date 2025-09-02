import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    instansi_id: null as number | null,
    username: '' as string,
  }),
  actions: {
    setInstansiId(id: number) {
      this.instansi_id = id;
    },
    clearInstansiId() {
      this.instansi_id = null;
    },
    setUsername(username: string) {
      this.username = username;
    },
    clearUsername() {
      this.username = '';
    },
  },
});
