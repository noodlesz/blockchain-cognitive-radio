import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

import {
  Image
} from 'semantic-ui-react'

import noImage from '../../static/images/no-image.png'

export class PagePrint extends Component {
  render() {
    const { featured_image } = this.props.page
    const image = _.isUndefined(featured_image) || _.isNull(featured_image) ?
      noImage : featured_image

    return (
      <div className='page-print'>
        <Image src={image} className='logo'/>

        <p className='title float-left'>{this.props.page.title}</p>
        <ReactMarkdown className='body-text' source={this.props.page.text} escapeHtml={false} />
      </div>
    )
  }
}

export default PagePrint