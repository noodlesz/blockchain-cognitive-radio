import React, { Component } from "react"
import { Redirect } from "react-router"
import { Switch } from "react-router-dom"

// Depedendencies
import _ from 'lodash'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Containers
import Login from "./containers/login/login"

// Components
import IMenu from "./containers/common/side-menu"
import RouteWithSubRoutes from "./components/route-with-sub-routes"

// Constants
import routes, { defaultPath } from "./routes"
const user = window.currentUser

class App extends Component {
  constructor(props) {
    super(props)
  }

  menuClick = () => {
    if (this.state.visibleMenu) {
      this.setState({ visibleMenu: false, iconMenu: "indent" })
    } else {
      this.setState({ visibleMenu: true, iconMenu: "outdent" })
    }
  }

  render() {
    // if (user.is_active) {
      return (
        <IMenu {...this.props}>
          <Switch>
            {_.map(routes, (route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))}
            <Redirect from="*" to={defaultPath} />
          </Switch>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable={false}
            pauseOnHover
            transition={Slide} />
        </IMenu>
      )
    // } else {
    //   return <Login />
    // }
  }
}

export default App