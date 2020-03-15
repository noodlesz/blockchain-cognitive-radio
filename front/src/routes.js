//home
import Home from "./containers/home/Home"
import Page from "./containers/page"

const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
    menu: false,
    submenu: false,
  },
  {
    component: Page,
    exact: false,
    icon: "pencil alternate",
    name: "Page",
    path: "/page",
    menu: true,
    submenu: false,
  }
]

export const defaultPath = "/"

export default routes