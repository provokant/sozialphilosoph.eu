import React from "react"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import "./index.css"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

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
