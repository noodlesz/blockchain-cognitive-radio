import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import ReactToPrint from "react-to-print";

import {
  Container,
  Grid,
  Button,
  Icon,
  Label,
  Menu,
  Modal,
  Dropdown,
  Image
} from "semantic-ui-react";

import {
  fetchPage,
  fetchPageBreadcrumb,
  duplicatePage
} from "../../store/page/actions";

import { fetchCategoryById } from '../../store/category/actions'

import { PageLoading } from '../../components/PageLoading'
import { PagePrint } from '../../components/print/PagePrint'

import NoImage from '../../static/images/no-image.png'

import { reverseDict } from '../../utils'

class PageDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      activeItem: 'leitura',
      markdown: null,
      open: false,
      title: '',
      error: ''
    }

    this.renderCategories = this.renderCategories.bind(this)
  }

  componentDidMount() {
    this.load()
  }

  load = (slug_new) => {
    this.setState({ isLoading: true })
    let slug = null

    if(_.isUndefined(slug_new))
      slug = this.props.match.params.slug
    else
      slug = slug_new

    this.props.fetchPage(slug).then(() => {
      const { page } = this.props

      Promise.all([
        this.props.fetchPageBreadcrumb(slug),
        this.props.fetchCategoryById({ 'category': page.category })
      ]).then(() => {
        this.setState({ isLoading: false })
      })
    })
  }

  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false, title: '' })

  handleChange = (event) => this.setState({ title: event.target.value, error: '' })

  clonePage = () => {
    const { title } = this.state
    const { page } = this.props

    if (_.isEmpty(title))
      this.setState({ error: gettext('Please enter a title for the new page.') })
    else {
      let data = { title: title, slug: page.slug }

      this.props.duplicatePage(data).then((response) => {
        const { data } = response

        this.setState({ open: false })
        this.props.history.push(`/page/${data.slug}/detail`)
      })
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderCategories = () => {
    const { category } = this.props
    _.map(category.results, (category) => {
      return <Label className='category-item' key={category.slug}>{category.title}test</Label>
    })
  }

  renderBreadcrumb = () => {
    const { page } = this.props

    const breadcrumb = reverseDict(page.breadcrumb)
    return _.map(breadcrumb, ({title, slug}) => {
      return (
        <Link
          to={`/page/${slug}/detail`}
          className='breadcrumb-item'
          onClick={() => {
            this.load(slug)
          }}>
          {title}
        </Link>
      )
    })
  }

  render() {
    const { isLoading, activeItem, title, open, error } = this.state
    const { page, category } = this.props

    if (isLoading) return <PageLoading />

    return (
      <Container className='content page-detail'>
        <Modal size={'tiny'} open={open} onClose={this.close}>
          <Modal.Header>{gettext('Duplicar Page')}</Modal.Header>
          <Modal.Content>
            <p>{gettext('Give the new page a name.')}</p>
            <input type="text" name="new-page-title" className='modal-input'
              value={title} onChange={(event) => this.handleChange(event)} />
            <p>{error}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative content={gettext('Cancel')} onClick={this.close} />
            <Button positive content={gettext('Duplicate')} onClick={this.clonePage} />
          </Modal.Actions>
        </Modal>


        <Grid>
          <Grid.Row className='title-content'>
            <div className='title-row'>
              <Image
                src={_.isNull(page.featured_image) ? NoImage : page.featured_image}
                className='float-left thumb' />
              <p className='title float-left'>
                {page.title}
                <ReactToPrint
                  trigger={() => <Icon name='print' className='print-button' />}
                  content={() => this.componentRef} />
              </p>

              <Dropdown
                simple
                placeholder={gettext('Criar página')}
                button
                className='filled-button float-right page-action'
                as={Link} to='/page/create'>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/page/${page.slug}/edit`}>
                    <Icon name='edit' />
                    {gettext('Editar')}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to={'#'} onClick={this.show}>
                    <Icon name='copy' />
                    {gettext('Duplicar')}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to={`/page/${page.slug}/history`} onClick={this.show}>
                    <Icon name='history' />
                    {gettext('Histórico')}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to={`/page/${page.slug}/history`} onClick={this.show}>
                    <Icon name='print' />
                    {gettext('Imprimir')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Grid.Row>
          <Grid.Row className='breadcrumb'>
            {this.renderBreadcrumb()}
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

              {/* right menu */}
              <Menu.Menu
                position='right'
                className='right-menu'>

                {/* <Menu.Item
                    name='historico'
                    onClick={this.handleItemClick}
                    active={activeItem === 'historico'}>
                      {gettext('Histórico')}
                  </Menu.Item>

                  <Menu.Item
                    name='configuracoes'
                    onClick={this.handleItemClick}
                    active={activeItem === 'configuracoes'}>
                      {gettext('Configurações')}
                  </Menu.Item>

                  <Menu.Item
                    name='edicao'
                    onClick={this.handleItemClick}
                    active={activeItem === 'edicao'}>
                      {gettext('Edição')}
                  </Menu.Item>

                  <Menu.Item
                    name='leitura'
                    onClick={this.handleItemClick}
                    active={activeItem === 'leitura'}>
                      {gettext('Leitura')}
                  </Menu.Item> */}
              </Menu.Menu>
            </Menu>
          </Grid.Row>
          <Grid.Row>
            <ReactMarkdown className='body-text' source={page.text} escapeHtml={false} />
            <PagePrint page={page} ref={el => (this.componentRef = el)}/>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = ({ page, category, currentUser }, { match }) => {
  return {
    page: page.results[match.params.slug],
    category,
    currentUser
  }
}

export default withRouter(connect(
  mapStateToProps, {
  duplicatePage,
  fetchPage,
  fetchCategoryById,
  fetchPageBreadcrumb
}
)(PageDetail))