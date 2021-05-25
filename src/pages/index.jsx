import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../layout/index'
import PostListing from '../components/PostListing/PostListing'
import SEO from '../components/SEO/SEO'
import { landingPageTeaser, landingPageTitle, siteTitle } from '../../data/SiteConfig'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const { allMarkdownRemark, file } = data
    const { nodes } = allMarkdownRemark

    return (
      <Layout isLandingPage>
        <Helmet title={siteTitle} />
        <SEO />
        <section
          className="index"
          style={{ backgroundImage: `url(${file.childImageSharp.gatsbyImageData.images.fallback.src})` }}
        >
          <div className="container">
            <div className="outer">
              <div className="inner">
                <h1 dangerouslySetInnerHTML={{ __html: landingPageTitle }} />
                <p dangerouslySetInnerHTML={{ __html: landingPageTeaser }} />
              </div>
            </div>
          </div>
        </section>
        <PostListing postEdges={nodes} />
      </Layout>
    )
  }
}

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      nodes: PropTypes.array.isRequired
    }).isRequired,
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        gatsbyImageData: PropTypes.shape({
          images: PropTypes.shape({
            fallback: PropTypes.shape({
              src: PropTypes.string
            })
          })
        })
      })
    })
  }).isRequired
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___sort], order: ASC }
      filter: {
        fields: { onLandingPage: { eq: true }, isActive: { eq: true } }
      }
    ) {
      nodes {
        excerpt(pruneLength: 300)
        frontmatter {
          title
          bgColor
          image
          teaser
        }
        fields {
          slug
          sort
          hasChildren
        }
      }
    }
    file(relativePath: {eq: "images/content/spiral.jpg"}) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
