import Mock from "mockjs"

export default [
  {
    url: "/api/admin/list",
    method: "get",
    response: (res) => {
      const { page , pageSize } = res.query
      return {
        code: 200,
        message: "success",
        data: {
          total: 100,
          page: page,
          pageSize: pageSize,
          list: Mock.mock({
            [`list|${pageSize}`]: [
              {
                "id|+1": (page - 1) * pageSize + 1,
                "nickname": "@name",
                "username": "@email",
                "password": "@string",
                "phone": /^1[385][1-9]\d{8}/,
                "status|1": [0, 1]
              }
            ]
          }).list
        }
      }
    },
  }
]