import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Segment,
  Sidebar,
  Container
} from 'semantic-ui-react'

// Components
import AccordionMenu from './accordion-menu'
import TopMenu from '../top-menu'
import SideMenu from './side-menu'

class IMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      params: {},
      sidebarDimmed: true,
      sidebarVisible: false
    }

    this.handleSidebarHide = this.handleSidebarHide.bind(this)
    this.handleSidebarVisibleChange = this.handleSidebarVisibleChange.bind(this)
  }

  handleSidebarHide() {
    this.setState({ sidebarVisible: false })
  }

  handleSidebarVisibleChange() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }


  render() {
    const {
      sidebarDimmed,
      sidebarVisible
    } = this.state
    const { children, currentUser } = this.props

    return (
      <div className='container-menu'>
        <SideMenu />
        <div className='container-content'>
          <TopMenu
            handleSidebarVisibleChange={this.handleSidebarVisibleChange} />
            <div className='children'>
              {children}
            </div>
        </div>
      </div>
      // <Sidebar.Pushable as={Segment} className="01 no-border no-border-radius color-transparent">
      //   <Sidebar
      //     className="side-menu"
      //     animation='overlay'
      //     duration={250}
      //     icon='labeled'
      //     onHide={this.handleSidebarHide}
      //     visible={sidebarVisible}
      //     width='wide'>
      //     <AccordionMenu
      //       currentUser={currentUser}
      //       handleSidebarHide={this.handleSidebarHide} />
      //   </Sidebar>

      //   <Sidebar.Pusher dimmed={sidebarDimmed && sidebarVisible}>
      //     <TopMenu
      //       handleSidebarVisibleChange={this.handleSidebarVisibleChange} />
      //     {children}
      //   </Sidebar.Pusher>
      // </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser }
}

export default connect(mapStateToProps)(IMenu)