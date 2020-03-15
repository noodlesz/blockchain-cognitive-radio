import React from 'react'
import {
  Loader
} from 'semantic-ui-react'


export const IfChartLoader = ({ isLoading, children }) => isLoading ? (
  <div className='if-chart-loader'>
    <Loader
      active
      content='Carregando'
      inline='centered' />
  </div>
) : children