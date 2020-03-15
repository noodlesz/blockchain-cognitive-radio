import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Dropdown,
  Grid,
  Button,
  Icon,
  Modal
} from "semantic-ui-react"
import { Field, change, reduxForm } from "redux-form"
import { withRouter } from "react-router";

// Third Party Imports
import CKEditor from '@ckeditor/ckeditor5-react'

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

// Project Imports
import { editorConfiguration } from "./utils/editorConfig"

import { fetchPages } from '../../store/page/actions'
import { fetchCategories } from '../../store/category/actions'

import { PageLoading } from '../../components/PageLoading'

class PageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      showCancelModal: false
    }
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchPages(),
      this.props.fetchCategories()
    ]).then(() => {
      this.setState({ isLoading: false })
    })
  }

  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, type, meta }) => {
    return (
      <>
        <input {...input} type={type} />
        {this.renderError(meta)}
      </>
    )
  }

  renderDropdown = ({ input, placeholder, values, meta, multiple }) => {
    if (_.isEmpty(values)) return <>No record available.</>

    const { dispatch } = this.props
    const options = _.map(values, instance => {
      return { key: instance.id, value: instance.id, text: instance.title }
    })

    return (
      <div>
        <Dropdown
          placeholder={placeholder}
          fluid
          search
          multiple={multiple ? true : false}
          selection
          options={options}
          value={input.value}
          clearable
          onChange={(event, data) => {
            dispatch(change("pageform", input.name, data.value, true))
          }}
        />

        <input {...input} type="hidden" />
        {this.renderError(meta)}
      </div>
    )
  }

  renderTextarea = ({ input, meta }) => {
    const { dispatch } = this.props
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          onInit={editor => {
            editor.setData(input.value)
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            dispatch(change("pageform", input.name, data, true))
          }} />

        <input {...input} type="hidden" />
        {this.renderError(meta)}
      </div>
    )
  }

  renderFileField = ({ input, meta }) => {
    delete input.value

    return (
      <>
        <input type='file' {...input} />
        {this.renderError(meta)}
      </>
    )
  }

  prepSave = (values) => {
    let data = new FormData()
    _.each(values, (value, key) => {
      if(key === 'featured_image' && !_.isNull(value) && !_.isUndefined(value)){
        if(typeof(value) != 'string')
          data.append(key, value[0], value[0].name)
      } else {
        data.append(key, value)
      }
    })
    this.props.onSubmit(data)
  }

  showCancelModal = (bool) => this.setState({showCancelModal: bool})

  render() {
    const { initialValues, pages, categories, pageTitle, cancelUrl } = this.props
    const { isLoading, showCancelModal } = this.state

    if(isLoading) return <PageLoading />

    return (
      <form
          onSubmit={this.props.handleSubmit(values => this.prepSave(values))}
          className="ui form error page-form">

        <Modal size={'tiny'} open={showCancelModal}>
          <Modal.Header>{gettext('Deseja cancelar?')}</Modal.Header>
          <Modal.Content>
            <p>{gettext('Ao cancelar, todas as modificações serão perdidas.')}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              onClick={() => this.showCancelModal(false)}>{gettext('Não')}</Button>
            <Button
              positive
              onClick={() => this.props.history.push(cancelUrl)}>
              {gettext('Sim')}
            </Button>
          </Modal.Actions>
        </Modal>
        <Grid>
          <Grid.Row className='title-content'>
            <div>
              <p className='title float-left'>{pageTitle}</p>

              <Button
                className="ui save-button icon button margin-left-small float-right filled-button"
                type='submit'>
                {
                  _.isUndefined(initialValues) || _.isNull(initialValues) ?
                    gettext('Criar') : gettext('Editar')
                }
              </Button>

              <Button
                type="reset"
                className="ui cancel-button icon button float-right secondary-button"
                onClick={() => this.showCancelModal(true)}>
                {gettext('Cancelar')}
              </Button>
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8} floated='left' className='left-content'>
              <div className="field">
                <label>{gettext('Title')} <span className='color-red'>*</span></label>
                <Field name="title" component={this.renderInput} type="text" />
              </div>

              <div className="field">
                <label>{gettext('Parent')}</label>
                <Field
                  className='parent-field'
                  name="parent"
                  placeholder="Parent"
                  values={pages}
                  component={this.renderDropdown} />
              </div>

              <div className="field">
                <label>{gettext('Categories')}</label>
                <Field name="category" placeholder="Category" values={categories} component={this.renderDropdown} multiple={true} />
              </div>
            </Grid.Column>

            <Grid.Column width={6} floated='right' className='right-content'>
              <div className="field">
                <label>{gettext('Imagem destacada')}</label>
                <img src={this.state.imagePrevie} />
                <Field name="featured_image" component={this.renderFileField} />

                <div className='info-featured-image'>
                  <Icon name='info circle' />
                  <p className='description'>
                    {gettext('Escolha uma imagem para representar a página na lista.')}
                  </p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className='edition-content'>
            <div className="field">
              <label>{gettext('Content')}</label>
              <Field name="text" component={this.renderTextarea} />
            </div>
          </Grid.Row>
        </Grid>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = gettext("Por favor, insira um título para a página")
  }

  return errors
}

const mapStateToProps = ({ page, category }) => ({
  pages: page.results,
  categories: category.results
})

PageForm = withRouter(connect(
  mapStateToProps,
  { fetchPages, fetchCategories }
)(PageForm))

export default reduxForm({
  form: "pageform",
  validate
})(PageForm)