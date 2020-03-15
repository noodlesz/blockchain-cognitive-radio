import React, { Component } from "react"
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

import {
  Container,
  Grid,
  Search,
  Button
} from "semantic-ui-react";

import { fetchCategories, fetchCategoryMostUsed } from "../../store/category/actions";

import { initialSearchState } from '../../constants'
import { PageLoading } from '../../components/PageLoading'
import { RenderResult } from '../../components/search/RenderResult'
import { ListItem } from '../../components/list/ListItem'

class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true, ...initialSearchState }
  }

  componentDidMount() {
    this.props.fetchCategories().then(() => {
      this.props.fetchCategoryMostUsed({})
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
        results: _.filter(this.props.categories, isMatch),
      })
    }, 300)
  }

  renderSideMenu = () => {
    const { categories } = this.props
    return _.map(categories, category => {
      return (
        <Grid.Row key={category.slug}>
          <Link
            to={`/category/${category.slug}/detail`}
            className='subtitle'>{category.title}</Link>
        </Grid.Row>
      )
    })
  }

  renderMostUsed = () => {
    const { categories } = this.props
    return _.map(categories.MOST_USED, category => {
      return (
        <ListItem
          key={category.slug}
          title={category.title}
          titleLinkTo={`/category/${category.slug}/detail`}
          showImage={false}
        />
      )
    })
  }

  render() {
    const { results, value, isLoading } = this.state

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
          resultRenderer={(obj) => <RenderResult url='/category' obj={obj} />}
          noResultsMessage={gettext('Nenhum resultado encontrado')} />

        <Container className='content'>
          <Grid>
            <Grid.Row className='title-content'>
              <div>
                <p className='title float-left'>Categorias</p>
                <Button className='filled-button float-right' as={Link} to='/category/create'>{gettext('Nova categoria')}</Button>
              </div>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4} className='side-menu'>
                {this.renderSideMenu()}
              </Grid.Column>
              <Grid.Column width={12} className='page-content'>
                <Grid.Row>
                  <Grid.Row className='title-content'>
                    <p className='subtitle'>{gettext('Categorias mais utilizadas')}</p>
                  </Grid.Row>
                  {this.renderMostUsed()}
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    )
  }
}

const mapStateToProps = ({ category }, { match }) => {
  return { categories: category.results }
}

export default connect(
  mapStateToProps, {
    fetchCategories,
    fetchCategoryMostUsed
  }
)(CategoryList)