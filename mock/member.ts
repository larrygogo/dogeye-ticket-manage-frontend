import Mock from "mockjs"

export default [
  {
    url: "/api/member/list",
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
                "uid|+1": (page - 1) * pageSize + 1,
                "nickname": "@name",
                "fullName": "@cname",
                "gender|1": [0, 1],
                "age": "@integer(18, 60)",
                "phone": /^1[385][1-9]\d{8}/,
                "isVip|1": [true, false],
                "integral": "@integer(0, 100)",
                "viewTimes": "@integer(0, 100)",
              }
            ]
          }).list
        }
      }
    },
  }
]