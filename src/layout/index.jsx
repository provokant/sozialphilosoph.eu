import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../../data/SiteConfig'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import './index.css'

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}