import React, { Component } from "react"
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

import {
  Container,
  Grid,
  Search,
  Button,
  List,
  Image,
  Icon
} from "semantic-ui-react"

import { toast } from 'react-toastify'

import '../../static/css/page.scss'

import {
  fetchPages,
  lastCreated
} from "../../store/page/actions"
import {
  createMenu,
  fetchMenu,
  deleteMenu
} from '../../store/menu/actions'

import { PageLoading } from '../../components/PageLoading'

import noImage from '../../static/images/no-image.png'

import { initialSearchState } from '../../constants'
import { RenderResult } from '../../components/search/RenderResult'
import { ListItem } from '../../components/list/ListItem'

class PageList extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true, ...initialSearchState }
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchMenu(),
      this.props.fetchPages()
    ]).then(() => {
      this.setState({ isLoading: false })
    })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ searching: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) {
        return this.setState({ ...this.state, searching: false, results: [], value: "" })
      }

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        searching: false,
        results: _.filter(this.props.pages, isMatch),
      })
    }, 300)
  }

  renderSideMenu = () => {
    const { pages } = this.props

    if(_.size(pages) > 0) {
      return _.map(pages, page => {
        if(page.parent) return

        const subpages = _.map(page.subpages, subpage => {
          let curr = pages[subpage]
          if(_.isUndefined(curr)) {
            return
          }

          return (
            <List.Item as={Link} to={`/page/${curr.slug}/detail`} key={curr.id}>
              {curr.title}
            </List.Item>
          )
        })

        return (
          <Grid.Row key={page.id}>
            <Link to={`/page/${page.slug}/detail`} className='subtitle sidemenu-title'>{page.title}</Link>
            <List bulleted>
              {subpages}
            </List>
          </Grid.Row>
        )
      })
    } else {
      return (
        <div>
          <Icon className='warning-icon' name='search'/>
          <p className='warning'>{gettext('Nenhuma página encontrada')}</p>
          <p className='warning text-color-gray'>{gettext('Você pode criar uma clicando no botão \'Nova página\'')}</p>
        </div>
      )
    }

  }

  renderLastCreated = () => {
    const { pages, last_pages } = this.props

    if(last_pages.length > 0) {
      return _.map(last_pages, page => {
        const curr_page = pages[page]

        return (
          <ListItem
            key={curr_page.id}
            image={curr_page.featured_image}
            titleLinkTo={`/page/${curr_page.slug}/detail`}
            title={curr_page.title}
            description={curr_page.text}
            pinInMenuButton={true}
            clickFixButton={() => this.pinInMenu(curr_page.id, curr_page.slug)}/>
        )
      })
    } else {
      return (
        <p className='warning'>{gettext('Nenhuma página recente encontrada')}</p>
      )
    }
  }

  renderMostViewed = () => {
    return <></>
  }

  deleteFavoriteMenu = (slug) => {
    this.props.deleteMenu(slug)
  }

  renderFavoriteMenu = () => {
    const { menu } = this.props

    if(_.size(menu) > 0) {
      return _.map(menu, page => {
        return (
          <Grid.Row key={page.id}>
            <Link to={`/page/${page.slug}/detail`} className='subtitle'>{page.title}</Link>
            <Icon name='close' onClick={() => this.deleteFavoriteMenu(page.slug)} className='red float-right pointer' />
          </Grid.Row>
        )
      })
    } else {
      return (
        <div className='warning-content'>
          <Icon name='star' color='yellow' />
          <p className='warning-text'>{gettext('Nenhuma página salva como favorita')}</p>
        </div>
      )
    }
  }

  pinInMenu = (id, slug) => {
    const { menu } = this.props

    if(_.isUndefined(menu[slug]))
      this.props.createMenu({'page': id})
    else
      toast.info(gettext('Página já está nos favoritos'), {
        position: toast.POSITION.TOP_RIGHT
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
          resultRenderer={(obj) => <RenderResult url='/page' obj={obj} />}
          noResultsMessage={gettext('Nenhum resultado encontrado')} />
        <Container className='content'>
          <Grid>
            <Grid.Row className='title-content'>
              <div>
                <p className='title float-left'>{gettext('Nova Página')}</p>
                <Button className='filled-button float-right' as={Link} to='/page/create'>{gettext('Criar página')}</Button>
              </div>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4} className='side-menu'>
                <Grid.Row className='title-content'>
                  <p className='subtitle'>{gettext('Páginas favoritas')}</p>
                </Grid.Row>
                {this.renderFavoriteMenu()}
                <Grid.Row className='title-content'>
                  <p className='subtitle'>{gettext('Todas as páginas')}</p>
                </Grid.Row>
                {this.renderSideMenu()}
              </Grid.Column>
              <Grid.Column width={12} className='page-content'>
                <Grid.Row>
                  <Grid.Row className='title-content'>
                    <p className='subtitle'>{gettext('Ultimas páginas criadas')}</p>
                  </Grid.Row>
                  {this.renderLastCreated()}
                </Grid.Row>
                {/* missing the endpoint, this will be used later
                <Grid.Row>
                  <Grid.Row className='title-content'>
                    <p className='subtitle'>{gettext('Mais Visualizadas')}</p>
                  </Grid.Row>
                  {this.renderMostViewed()}
                </Grid.Row> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    )
  }
}

const mapStateToProps = ({ page, menu }, { match }) => {
  return {
    pages: page.results,
    last_pages: page.last,
    menu: menu.results
  }
}

export default connect(
  mapStateToProps,
  {
    fetchPages,
    createMenu,
    fetchMenu,
    deleteMenu
  }
)(PageList)