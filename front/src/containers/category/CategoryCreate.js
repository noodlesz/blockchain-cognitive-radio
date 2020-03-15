import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Button
} from "semantic-ui-react";

import CategoryForm from "./CategoryForm";

// Redux
import { createCategory } from "../../store/category/actions";

class CategoryCreate extends Component {
  constructor(props) {
    super(props);
  }

  submit = values => {
    values = { ...values, slug: values.title }
    this.props.createCategory(values).then(response => {
      const { slug } = response.data
      this.props.history.push(`/category/${slug}/detail`);
    });
  };

  render() {
    return (
      <Container className='content'>
        <CategoryForm
          onSubmit={this.submit}
          pageTitle={gettext('Criar categoria')}
          cancelUrl={'/category/'}/>
      </Container>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

export default connect(
  mapStateToProps, { createCategory }
)(CategoryCreate)