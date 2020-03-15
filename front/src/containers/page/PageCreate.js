import React, { Component } from "react"
import { connect } from "react-redux"
import { Container, Grid, Button } from "semantic-ui-react"

import PageForm from "./PageForm"

// Redux
import { createPage } from "../../store/page/actions"

import { withRouter } from "react-router";

class PageCreate extends Component {
  constructor(props) {
    super(props)
  }

  submit = (data) => {
    this.props.createPage(data, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then(response => {
        const { data } = response
        this.props.history.push(`/page/${data.slug}/detail`)
      })
  }

  render() {
    return (
      <Container className='content'>
        <PageForm
          onSubmit={this.submit}
          pageTitle={'Nova página'}
          cancelUrl='/page/'/>
      </Container>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
})

export default withRouter(connect(
  mapStateToProps, { createPage }
)(PageCreate))