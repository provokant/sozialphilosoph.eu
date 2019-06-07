import React from 'react'
import './Back.scss'

const goBack = () => {
  if(window) {
    window.history.back()
  }
}

export default () => (
  <div className="back-wrapper">
    <div className="container">
      <button type="button" className="back" onClick={goBack}>«</button>
    </div>
  </div>
)