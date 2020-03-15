import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Dropdown,
  Grid,
  Button
} from "semantic-ui-react"
import { Field, change, reduxForm } from "redux-form"
import { withRouter } from "react-router"

import { PageLoading } from './../../components/PageLoading'

import { fetchChannels } from '../../store/channel/actions'

class LeaseChannelForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: true
      }
    }
  
    componentDidMount() {
      Promise.all([
        this.props.fetchChannels()  
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
  
    renderDropdown = ({ input, placeholder, values, meta }) => {
      if (_.isEmpty(values)) return <>No record available.</>
  
      console.log('values: ', values)

      const { dispatch } = this.props
      const options = _.map(values, instance => {

        let tech = ''
        if(instance.channel_type == 1) {
          tech = 'Wi-Fi'
        } else if (instance.channel_type == 2) {
          tech = 'Zigbee'
        } else {
          tech = 'Bluetooth'
        }

        return { key: instance.id, value: instance.id, text: (tech + ' ' + instance.band) }
      })
  
      return (
        <div>
          <Dropdown
            placeholder={placeholder}
            fluid
            search
            selection
            options={options}
            value={input.value}
            clearable
            onChange={(event, data) => {
              dispatch(change("leaseform", input.name, data.value, true))
            }}
          />
  
          <input {...input} type="hidden" />
          {this.renderError(meta)}
        </div>
      )
    }
  
  render() {
    const { initialValues, onSubmit, channels } = this.props
    const { isLoading } = this.state

    if(isLoading) return <PageLoading />

    return (
      <form
        onSubmit={this.props.handleSubmit(onSubmit)}
        className="ui form error page-form">

        <Grid>
          <Grid.Row className='title-content'>
            <div>

              <Button
                className="ui save-button icon button margin-left-small float-right filled-button"
                type='submit'>
                {
                  _.isUndefined(initialValues) || _.isNull(initialValues) ?
                    gettext('Criar') : gettext('Editar')
                }
              </Button>

            </div>
          </Grid.Row>
          <Grid.Row>
              <div className="field">
                <label>{gettext('SSID')} <span className='color-red'>*</span></label>
                <Field name="ssid" component={this.renderInput} type="text" />
              </div>

              <div className="field">
                <label>{gettext('Channel')}</label>
                <Field
                  className='field'
                  name="channel"
                  placeholder="channel"
                  values={channels}
                  component={this.renderDropdown} />
              </div>

              <div className="field">
                <label>{gettext('Pasword')} <span className='color-red'>*</span></label>
                <Field name="password" component={this.renderInput} type="text" />
              </div>

              <div className="field">
                <label>{gettext('Begin')} <span className='color-red'>*</span></label>
                <Field name="begin" component={this.renderInput} type="text" />
              </div>

              <div className="field">
                <label>{gettext('End')} <span className='color-red'>*</span></label>
                <Field name="end" component={this.renderInput} type="text" />
              </div>
            
          </Grid.Row>
        </Grid>
      </form>
    )
  }
}
  
const validate = values => {
    const errors = {}

    if (!values.ssid) {
        errors.ssid = gettext("Por favor, insira um ssid para o canal")
    }

    return errors
}
  
const mapStateToProps = ({ channel }) => ({ 
  channels: channel.results
})
  
LeaseChannelForm = withRouter(connect(
    mapStateToProps,
    { fetchChannels }
)(LeaseChannelForm))
  
export default reduxForm({
    form: "leaseform",
    validate
})(LeaseChannelForm)