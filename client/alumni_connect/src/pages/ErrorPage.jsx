import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className='center'>
        <Link to='/' >Go Back Home</Link>
        <h2>page Not Found</h2>
      </div>

    </section>
  )
}

export default ErrorPage
