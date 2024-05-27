import Mock from "mockjs"

export default [
  {
    url: "/api/film/list",
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
                "filmId|+1": (page - 1) * pageSize + 1,
                "filmName": "@name",
                "filmType|1": ["动作", "喜剧", "爱情", "科幻", "恐怖", "剧情"],
                "language|1": ["中文", "英文", "日文", "韩文"],
                "filmDuration": "@integer(60, 180)",
                "synopsis": "@cparagraph",
                "price": "@integer(20, 100)",
              }
            ]
          }).list
        }
      }
    },
  }
]