import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../layout/index'
import PostListing from '../components/PostListing/PostListing'
import SEO from '../components/SEO/SEO'
import config from '../../data/SiteConfig'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark

    return (
      <Layout>
        <Helmet title={config.siteTitle} />
        <SEO />
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