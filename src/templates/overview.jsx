import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../layout/index'
import PostListing from '../components/PostListing/PostListing'
import Image from '../components/Image/Image'
// import PostListItem from '../components/PostListItem/PostListItem' 
import { siteTitle } from '../../data/SiteConfig'

export default class OverviewTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark
    const { title, html, image, source } = pageContext

    return (
      <Layout>
        <Helmet title={`${title} | ${siteTitle}`} />
        <section className="overview">
          <div className="container">
            <div className="image">
              {image && <Image src={image} />}
            </div>
            <div className="w-full md:w-2/3">
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              {source && <div className="source">{source}</div>} 
            </div>
          </div>
        </section>
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
      filter: { fields: { 
        slug: { regex: $slug }, 
        isIndex: { ne: true }
      } }
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
          }
        }
      }
    }
  }
`

OverviewTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    html: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    sort: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
  }).isRequired
}