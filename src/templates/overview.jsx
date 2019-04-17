import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../layout/index'
import PostListing from '../components/PostListing/PostListing'
// import PostListItem from '../components/PostListItem/PostListItem' 
import { siteTitle } from '../../data/SiteConfig'

export default class OverviewTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark
    const { title, bgColor, html, image, path } = pageContext

    console.log(image)

    return (
      <Layout>
        <Helmet title={`${title} | ${siteTitle}`} />
        <section style={{backgroundColor: bgColor}} key={path} className="intro">
          <div className="container mx-auto">
            <div className="mb-6 py-20 flex">
              <div className="w-2/3">
                <h2 className="text-5xl font-thin tracking-tight w-2/3 mb-4 uppercase">{title}</h2>
                <div className="columns" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
              <div className="w-1/3  flex items-center justify-center">
                {image && <img alt="" src={image} className="object-contain" />}
              </div>
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
      filter: { fields: { slug: { regex: $slug }, isIndex: { ne: true } } }
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