const routes = [
  { path: '/login', component: "/Login" },
  { path: '/',
    component: "/layout/index",
    children: [
      { path: '/', component: "/home/index", title: "首页", meta: { title: "首页" }},
      { path: '/about', component: "/About" },
      { path: '/member', component: "/member/list" },
      { path: '/order', component: "/order/list" },
      { path: '/film', component: "/film/list" },
    ]
  },
]

export default routes;