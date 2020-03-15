import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Image, Icon } from 'semantic-ui-react'

import { getExcerpt } from '../../utils'

import noImage from '../../static/images/no-image.png'

import { If } from '../common/if'

export class ListItem extends Component {

  render() {
    let { image } = this.props
    image = _.isUndefined(image) || _.isNull(image) ? noImage : image

    return (
      <div className='page-item'>
        <If test={this.props.showImage == true || _.isUndefined(this.props.showImage)}>
          <div className='image'>
            <Image src={image} className='thumb' />
          </div>
        </If>

        <div className='infos'>
          <Link className='subtitle text-color-link' to={this.props.titleLinkTo}>
            {this.props.title}
          </Link>
          <If test={this.props.pinInMenuButton}>
            <Icon
              name='star'
              color='yellow'
              inverted
              className='fix-menu-button pointer margin-left-small'
              onClick={this.props.clickFixButton} />
          </If>
          <If test={!_.isUndefined(this.props.description)}>
            <p className='description'>
              {getExcerpt(this.props.description)}
            </p>
          </If>
        </div>
      </div>
    )
  }
}

export default ListItem