import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import TopMenu from '../top-menu'

class IMenu extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { children, currentUser } = this.props

    return (
      <div className='container-menu'>
        <div className='container-content'>
          <TopMenu />
          <div className='children'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser }
}

export default connect(mapStateToProps)(IMenu)