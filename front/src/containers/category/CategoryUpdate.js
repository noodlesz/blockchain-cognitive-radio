import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Grid
} from "semantic-ui-react";

import { PageLoading } from "../../components/PageLoading";

import CategoryForm from "./CategoryForm";

// Redux
import {
  updateCategory,
  fetchCategory
} from "../../store/category/actions";

class CategoryUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;

    this.props.fetchCategory(slug).then(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  submit = values => {
    const { slug } = this.props.match.params;

    this.props.updateCategory(slug, values).then(response => {
      this.props.history.push(`/category/${response.data.slug}/detail`);
    });
  };

  render() {
    const { isLoading } = this.state;
    const { category } = this.props;
    const { slug } = this.props.match.params;

    if (isLoading) return <PageLoading />;

    return (
      <Container className='content'>
        <CategoryForm
          onSubmit={this.submit}
          initialValues={category}
          pageTitle={gettext('Editar categoria')}
          cancelUrl={`/category/${slug}/detail`}/>
      </Container>
    );
  }
}

const mapStateToProps = ({ category, currentUser }, { match }) => ({
  category: category.results[match.params.slug],
  currentUser
});

export default connect(
  mapStateToProps,
  {
    updateCategory,
    fetchCategory
  }
)(CategoryUpdate);
