import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import { getExcerpt } from '../../utils'
import { If } from '../common/if'

export class RenderResult extends Component {
  render() {
    const { obj, url } = this.props
    return (
      <Link to={`${url}/${obj.slug}/detail`}>
        <div className='search-result-item'>
          <p className='title'>
            {!_.isUndefined(obj.title) && !_.isNull(obj.title) ? obj.title : ''}
          </p>
          <If test={!_.isUndefined(obj.text) && !_.isNull(obj.text)}>
            <p className='description'>{getExcerpt(obj.text, 200)}</p>
          </If>
        </div>
      </Link>
    )
  }
}

export default RenderResult