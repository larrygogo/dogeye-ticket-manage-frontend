const routes = [
  { path: '/login', component: "/login" },
  { path: '/',
    component: "/layout/index",
    children: [
      { path: '/', component: "/home/index" },
      { path: '/about', component: "/About" },
    ]
  },
]

export default routes;