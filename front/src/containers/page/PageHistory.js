import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import {
  Container,
  Grid,
  Menu,
  Label,
  Icon,
  Dropdown,
  Pagination
} from 'semantic-ui-react'

import {
  fetchPage,
  fetchPageHistory
} from "../../store/page/actions";

import { fetchCategoryById } from '../../store/category/actions'
import { PageLoading } from '../../components/PageLoading';

import { getLocationFilters, queryString } from '../../utils'

import { If } from '../../components/common/if'

export class PageHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      markdown: null
    }
    this.filters = [
      'page',
      'slug'
    ]
  }

  componentDidMount() {
    const { slug } = this.props.match.params;

    this.props.fetchPage(slug).then((response) => {
      this.props.fetchPageHistory({'slug': slug})

      this.props.fetchCategoryById({ 'category': response.data.category }).then(() => {
        this.setState({ isLoading: false })
      })
    })
  }

  componentDidUpdate(prevProps) {
    const { history } = this.props
    const prevFilters = getLocationFilters(prevProps.location, this.filters)
    const filters = getLocationFilters(history.location, this.filters)

    if (!_.isEqual(prevFilters, filters))
      this.props.fetchPageHistory(filters)
  }

  changeBodyText = (text) => {
    this.setState({markdown: text})
  }

  onPageChange = (event, { activePage }) => {
    const { history } = this.props
    const { slug } = this.props.match.params
    const filters = getLocationFilters(history.location, this.filters)

    filters.page = activePage
    filters.slug = slug
    history.push({ search: queryString.stringify(filters) })
  }

  render() {
    const { slug } = this.props.match.params
    const page = this.props.page.results[slug]
    const { num_pages } = this.props.page
    const { category } = this.props

    const { isLoading, markdown } = this.state

    if (isLoading)
      return <PageLoading />

    const currentContent = (markdown == null ? page.text : markdown)

    return (
      <Container className='content page-detail'>
        <Grid>
          <Grid.Row className='title-content'>
            <div>
              <p className='title float-left'>
                {page.title}
              </p>

              <Dropdown
                item
                simple
                placeholder={gettext('Criar')}
                button={true}
                className='filled-button float-right page-action'
                as={Link}
                to='/page/create'>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/page/${page.slug}/edit`}>{gettext('Editar')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Grid.Row>
          <Grid.Row className='submenu-content'>
            <Menu
              pointing
              secondary>
              <Menu.Item className='left-infos'>
                <p><Icon name='calendar alternate outline' /> <b>{gettext('Última atualização: ')}</b>{
                  new Date(page.modified).toLocaleDateString("pt-BR")
                }</p>
              </Menu.Item>
              <div className='category-list'>
                <Menu.Item className='left-infos'>
                  <p><Icon name='tags' /> {gettext('Categorias: ')}</p>
                  {
                    _.map(category.results, (category) => {
                      return (
                        <Label
                          className='category-item'
                          key={category.slug}
                          as={Link}
                          to={`/category/${category.slug}/detail`}>
                          {category.title}
                        </Label>
                      )
                    })
                  }
                </Menu.Item>
              </div>
            </Menu>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Grid.Row className='margin-bottom'>
                <p className='subtitle text-color-gray'>{gettext('Versões')}</p>
              </Grid.Row>
              <Grid.Row className='history-list-row'>
                <div className='version-list'>
                  {
                    _.map(page.versions, ({ slug, version, modified, text }) => {
                      return (
                        <div
                          key={slug}
                          className='version-item'
                          onClick={() => this.changeBodyText(text)}>
                          <p className='text-bold'>{new Date(modified).toLocaleString("pt-BR")}</p>
                          <p className='text-color-gray'>{interpolate(gettext('Versão %s'), [version])}</p>
                        </div>
                      )
                    })
                  }
                </div>
                <If test={num_pages > 1}>
                  <Pagination
                    className='paginator'
                    defaultActivePage={1}
                    onPageChange={this.onPageChange}
                    totalPages={num_pages}
                    boundaryRange={0}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1} />
                </If>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row className='margin-bottom'>
                <p className='subtitle text-color-gray'>{gettext('Alterações')}</p>
              </Grid.Row>

              <Grid.Row>
                <ReactMarkdown className='body-text padding' source={currentContent} escapeHtml={false} />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = ({ page, category, currentUser }, { match }) => {
  return {
    page,
    category,
    currentUser,
  }
}

export default withRouter(connect(
  mapStateToProps, {
  fetchPage,
  fetchPageHistory,
  fetchCategoryById,
}
)(PageHistory))