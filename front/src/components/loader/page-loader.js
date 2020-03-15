import React from 'react'
import {
  Loader
} from 'semantic-ui-react'


export const PageLoader = ({ height = 165 }) => (
  <div className='page-loader' style={{ height: `calc(100vh - ${height}px - 1.6em` }}>
    <Loader
      active
      content='Carregando'
      inline='centered' />
  </div>
)