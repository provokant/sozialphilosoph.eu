import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Image from '../components/Image/Image'
import Layout from '../layout/index'
import PostListing from '../components/PostListing/PostListing'
import SEO from '../components/SEO/SEO'
import { siteTitle, landingPageTeaser, landingPageTitle, landingPageImage, backgroundColor } from '../../data/SiteConfig'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark

    return (
      <Layout>
        <Helmet title={siteTitle} />
        <SEO />
        <section className="index flex items-center" style={{ backgroundColor }}>
          <div className="container mx-auto mb-20 relative">
            <div className="mb-6 pt-20 flex justify-center">
              <div className="w-1/2 text-center">
                <h2 className="text-5xl font-thin tracking-normal mb-4 uppercase">{landingPageTitle}</h2>
                <p className="leading-normal text-grey-darker">{landingPageTeaser}</p>
              </div>
            </div>
          </div>
          <figure className="absolute w-full max-w-lg mx-auto my-auto">
            <Image src={landingPageImage} />
          </figure>
        </section>
        <PostListing postEdges={edges} />
      </Layout>
    )
  }
}

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired
    }).isRequired,
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
      edges {
        node {
          excerpt(pruneLength: 300)
          frontmatter {
            title
            bgColor
            image
          }
          fields {
            slug
            sort
            hasChildren
          }
        }
      }
    }
  }
`