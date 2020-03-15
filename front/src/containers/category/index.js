import React, { Component } from 'react'
import RouteWithSubRoutes from '../../components/route-with-sub-routes'

import "../../static/css/category.scss"

import _ from 'lodash'

class Category extends Component {

  render() {
    const { routes } = this.props

    return (
      <div className='top-content'>
        {_.map(routes, (route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </div>
    )
  }
}

export default Category