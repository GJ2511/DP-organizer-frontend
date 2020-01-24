import React from 'react'
import PropTypes from 'prop-types'

function Register ({ name, setName, handleSubmit }) {
  return (
    <div className='container'>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>Enter Your name</span>
        </div>
        <input type='text' className='form-control' value={name} onChange={e => setName(e.target.value)} />
        <button type='button' id='register' className='btn btn-primary' disabled={!name.trim().length} onClick={handleSubmit}>Take me In!</button>
      </div>
    </div>
  )
}

Register.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Register
