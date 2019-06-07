import React from 'react'
import { showBackButton } from '../../../data/SiteConfig'
import './Back.scss'

const goBack = () => {
  if(window) {
    window.history.back()
  }
}

export default () => (
  (showBackButton && (
    <div className="back-wrapper">
      <div className="container">
        <button type="button" className="back" onClick={goBack}>«</button>
      </div>
    </div>
  ))
)