import _ from 'lodash'
import React, { Component } from 'react'

import RouteWithSubRoutes from '../../components/route-with-sub-routes'


class Index extends Component {

  render() {
    const { routes } = this.props

    return (
      <div>
        {_.map(routes, (route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </div>
    )
  }
}

export default Index