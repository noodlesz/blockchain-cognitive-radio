import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Header, Icon, Grid, Button } from "semantic-ui-react";

import { PageLoading } from "../../components/PageLoading";

import PageForm from "./PageForm";

// Redux
import {
  updatePage,
  fetchPage
} from "../../store/page/actions";

class PageUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;

    this.props.fetchPage(slug).then(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  submit = values => {
    const { slug } = this.props.match.params;

    this.props.updatePage(slug, values, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then(response => {
        const { data } = response
        this.props.history.push(`/page/${data.slug}/detail`);
    });
  };

  render() {
    const { isLoading } = this.state;
    const { page } = this.props;
    const { slug } = this.props.match.params;

    if (isLoading) return <PageLoading />;

    return (
      <Container className='content'>
        <Grid>
          <Grid.Row>
            <PageForm
              onSubmit={this.submit}
              pageTitle={gettext('Update Page')}
              cancelUrl={`/page/${slug}/detail`}
              initialValues={page}/>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({ page, currentUser }, { match }) => ({
  page: page.results[match.params.slug],
  currentUser
});

export default connect(
  mapStateToProps,
  {
    updatePage,
    fetchPage
  }
)(PageUpdate);
