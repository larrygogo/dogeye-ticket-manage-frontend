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
      fetch(`/api/token?token=${token}`,{
        headers:{
          Authorization: localStorage.getItem('token') || 'token'
        }
      }).then(res => res.json()).then(res => {
        console.log(res)
        if (res.code !== 0) {
          window.location.href = '/login'
        } else {
          this.name = res.data.name
          this.avatar = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        }
      })
    },
    logout() {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  },
})