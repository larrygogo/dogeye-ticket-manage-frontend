import Mock from "mockjs"

export default [
  {
    url: "/api/order/list",
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
                "orderId|+1": "@id",
                "filmName": "@name",
                "seat": "@integer(1, 100)",
                "userId": "@integer(1, 100)",
                "name": "@name",
                "phone": /^1[385][1-9]\d{8}/,
                "orderDate": "@datetime",
                "price": "@integer(20, 100)",
                "status|1": ["已支付", "未支付", "已取消"],
                "cinemaId": "@integer(1, 10)",
              }
            ]
          }).list
        }
      }
    },
  }
]