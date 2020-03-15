import React, { Component } from "react"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"

import LeaseChannelForm from "./LeaseChannelForm"

// Redux
import { leaseChannel } from "../../store/lease-channel/actions"

import { withRouter } from "react-router"

class CreateLease extends Component {
  constructor(props) {
    super(props)
  }

  submit = data => {
    this.props.leaseChannel(data).then(response => {
      this.props.history.push(`/`)
    })
  }


  render() {
    return (
      <Container className='content'>
        <LeaseChannelForm onSubmit={this.submit} />
      </Container>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
})

export default withRouter(connect(
  mapStateToProps, { leaseChannel }
)(CreateLease))