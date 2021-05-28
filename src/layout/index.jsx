import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../../data/SiteConfig'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import './index.scss'

export default class Layout extends React.Component {
  render() {
    const { children, isLandingPage, fromHeader } = this.props

    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <main>
          <Header isLandingPage={isLandingPage} fromHeader={fromHeader} />
          {children}
          <Footer />
        </main>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isLandingPage: PropTypes.bool,
  fromHeader: PropTypes.bool
}

Layout.defaultProps = {
  isLandingPage: false,
  fromHeader: false
}
