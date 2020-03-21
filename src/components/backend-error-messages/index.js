import React from 'react'

function BackendErrorMessages({ backendErrors }) {
  const errorMessages = Object.entries(backendErrors).map(field => {
    const [ fieldName, fieldErrorMessages ] = field
    const messages = fieldErrorMessages.join(' ')
    return `${fieldName} ${messages}`
  })

  return (
    <ul className='error-messages'>
      {errorMessages.map(errorMessage => (
        <li key={ errorMessage }>
          {errorMessage}
        </li>
      ))}
    </ul>
  )
}

export default BackendErrorMessages