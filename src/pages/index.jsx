import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../layout/index"
import PostListing from "../components/PostListing/PostListing"
import SEO from "../components/SEO/SEO"
import config from "../../data/SiteConfig"

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <Helmet title={config.siteTitle} />
        <SEO />
        <PostListing postEdges={postEdges} />
      </Layout>
    )
  }
}

export default Index

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000,
      sort: {
        fields: [fields___sort], order: ASC
      },
      filter: {
        fields: {
          onLandingPage: { eq: true },
          isActive: { eq: true }
        }
      }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
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
