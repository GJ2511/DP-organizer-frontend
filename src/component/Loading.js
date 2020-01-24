import React from 'react'

function Loading () {
  return (
    <div className='container'>
      <button className='btn btn-primary' disabled>
        <span className='spinner-border spinner-border-sm' />
    Loading..
      </button>
    </div>
  )
}

export default Loading
