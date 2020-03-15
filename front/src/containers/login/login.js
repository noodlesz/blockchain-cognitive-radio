import React, { Component } from 'react'
import { connect } from 'react-redux'


class Index extends Component {
  render() {
    return (
      <div>
        {gettext('Tela de login!')}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser }
}

export default connect(mapStateToProps)(Index)
