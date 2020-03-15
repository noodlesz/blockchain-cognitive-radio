import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Dropdown,
  Grid,
  Button,
  Modal
} from "semantic-ui-react"
import { Field, change, reduxForm } from "redux-form"
import { withRouter } from "react-router";

// Project Imports
import { fetchCategories } from "../../store/category/actions"

class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      showCancelModal: false
    }
  }

  componentDidMount() {
    this.props.fetchCategories().then((data) => {
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

  renderDropdown = ({ input, placeholder, values, meta }) => {
    if (_.isEmpty(values)) return <>Nenhuma categoria cadastrada.</>

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
          selection
          clearable
          options={options}
          value={input.value}
          onChange={(event, data) => {
            dispatch(change("categoryform", input.name, data.value, true))
          }}
        />

        <input {...input} type="hidden" />
        {this.renderError(meta)}
      </div>
    )
  }

  showModal = (bool) => this.setState({ showCancelModal: bool })

  render() {
    const { categories, onSubmit, pageTitle, cancelUrl, initialValues } = this.props
    const { showCancelModal } = this.state

    return (
      <form
        onSubmit={this.props.handleSubmit(onSubmit)}
        className="ui form error page-form category-form">

        <Modal size={'tiny'} open={showCancelModal}>
          <Modal.Header>{gettext('Deseja cancelar?')}</Modal.Header>
          <Modal.Content>
            <p>{gettext('Ao cancelar, todas as modificações serão perdidas.')}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              onClick={() => this.showModal(false)}>{gettext('Não')}</Button>
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
                onClick={() => this.showModal(true)}>
                {gettext('Cancelar')}
              </Button>
            </div>
          </Grid.Row>
          <Grid.Column width={16}>
            <div className="field">
              <label>Title</label>
              <Field name="title" component={this.renderInput} type="text" />
            </div>
          </Grid.Column>
        </Grid>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = "Por favor, insira um nome para a categoria."
  }

  return errors
}

const mapStateToProps = ({ category }) => ({
  categories: category.results
})

CategoryForm = withRouter(connect(
  mapStateToProps,
  { fetchCategories }
)(CategoryForm))

export default reduxForm({
  form: "categoryform",
  validate
})(CategoryForm)
