import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../layout'
import PostListing from '../components/PostListing/PostListing'

export default class OverviewTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark

    return (
      <Layout>
        <Helmet>
          {/* <title>{`${post.title} | ${config.siteTitle}`}</title> */}
        </Helmet>

        <PostListing postEdges={edges} />
      </Layout>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query OverviewQuery($slug: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___sort], order: ASC }
      filter: { fields: { slug: { regex: $slug }, isIndex: { ne: true } } }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

OverviewTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.object.isRequired
    }).isRequired,
  }).isRequired
}