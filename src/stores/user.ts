import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: '',
    avatar: '',
  }),
  actions: {
    getUserInfo() {
      const token = localStorage.getItem('token')
      if (token === null) window.location.href = '/login'
      fetch('/api/userinfo', {
        headers: {
          token: token
        }
      }).then(res => res.json()).then(res => {
        console.log(res)
        if (res.code !== 0) {
          window.location.href = '/login'
        } else {
          this.name = res.data.name
          this.avatar = res.data.avatar
        }
      })
    }
  },
})