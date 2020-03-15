import React from 'react'
import {
    Loader
} from 'semantic-ui-react'

export const PageLoading = () => (
    <div className='page-loader'>
        <Loader active
            content='Loading...'
            inline='centered' />
    </div>
)