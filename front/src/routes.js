//home
import Home from "./containers/home/Home"
import Page from "./containers/page"

import ChannelLease from "./containers/lease-channel/CreateLease.js"

const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
    menu: false,
    submenu: false,
  },
  {
    component: ChannelLease,
    exact: false,
    icon: "pencil alternate",
    name: "Channel Lease",
    path: "/lease/create",
    menu: true,
    submenu: false,
  }

]

export const defaultPath = "/"

export default routes