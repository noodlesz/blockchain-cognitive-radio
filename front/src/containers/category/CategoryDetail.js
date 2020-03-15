import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'

import {
  Container,
  Grid,
  Search,
  Button
} from "semantic-ui-react";

import { fetchCategory, fetchCategoryPages } from "../../store/category/actions";

import { initialSearchState } from '../../constants'
import { PageLoading } from '../../components/PageLoading'
import { RenderResult } from '../../components/search/RenderResult'
import { ListItem } from '../../components/list/ListItem'

class CategoryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true, ...initialSearchState }
  }

  componentDidMount() {
    const { slug } = this.props.match.params

    this.props.fetchCategory(slug).then(() => {
      this.props.fetchCategoryPages({ 'slug': slug })
      this.setState({ isLoading: false })
    })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ searching: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        return this.setState({ ...this.state, searching: false, results: [], value: "" })
      }

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        searching: false,
        results: _.filter(this.props.category.pages, isMatch),
      })
    }, 300)
  }

  edit = () => {
    const { slug } = this.props.match.params
    this.props.history.push(`/category/${slug}/edit`)
  }

  render() {
    const { isLoading, results, value } = this.state;
    const { category } = this.props
    const { slug } = this.props.match.params

    if (isLoading) return <PageLoading />

    return (
      <>
        <Search
          className='search'
          placeholder={gettext('Buscar por Título')}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value}
          resultRenderer={(obj) => <RenderResult url={'/page'} obj={obj} />}
          noResultsMessage={gettext('Nenhum resultado encontrado')} />

        <Container className='content category-detail'>
          <Grid>
            <Grid.Row className='title-content'>
              <div>
                <p className='title float-left'>{category.title}</p>

                <Button
                  type="reset"
                  className="ui edit-button icon button float-right filled-button"
                  onClick={this.edit}>
                  {gettext('editar')}
                </Button>
              </div>
            </Grid.Row>
            <Grid.Row>
              {
                _.map(category.pages, ({ title, slug, text, featured_image }) => {
                  return (
                    <ListItem
                      key={slug}
                      titleLinkTo={`/page/${slug}/detail`}
                      title={title}
                      description={text}
                      image={featured_image}
                    />
                  )
                })
              }
            </Grid.Row>
          </Grid>
        </Container>
      </>
    )
  }
}

const mapStateToProps = ({ category, currentUser }, { match }) => {
  return {
    category: category.results[match.params.slug],
    currentUser
  }
}

export default connect(
  mapStateToProps, {
  fetchCategoryPages,
  fetchCategory,
}
)(CategoryDetail)