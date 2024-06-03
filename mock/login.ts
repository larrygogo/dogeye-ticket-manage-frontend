import Mock from "mockjs"

export default [
  {
    url: "/api/login",
    method: "get",
    response: (res) => {
      return {
        code: 0,
        message: "success",
        data: "token123"
      }
    },
  },
  {
    url: "/api/userinfo",
    method: "get",
    response: (res) => {
      console.log(res)
      // 判断 token 是否正确
      const token = res.headers.token
      if (token !== "token123") {
        return {
          code: 401,
          message: "token 错误",
        }
      }

      return {
        code: 0,
        message: "success",
        data: {
          name: "admin123",
          avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        }
      }
    },
  }
]