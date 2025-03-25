import React from 'react'
import LoadingGif from '/loading.gif'
const Loader = () => {
  return (
    <div className="loader">
        <div className="loader__img">
            <img src={LoadingGif} alt=''/>
        </div>
    </div>
  )
}

export default Loader
