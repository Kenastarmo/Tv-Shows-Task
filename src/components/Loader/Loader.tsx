import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div>
            <ColorRing
                visible={true}
                height="120"
                width="120"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#4d4d4d', '#4d4d4d', '#4d4d4d', '#4d4d4d', '#4d4d4d']}
            />
        </div>
    )
}

export default Loader