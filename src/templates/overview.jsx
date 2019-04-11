import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../layout"
import SEO from "../components/SEO/SEO"
import PostListing from "../components/PostListing/PostListing"
import config from "../../data/SiteConfig"

export default class OverviewTemplate extends React.Component {
  render() {
    const { slug } = this.props.pageContext
    const postEdges = this.props.data.allMarkdownRemark.edges
    // const postNode = this.props.data.markdownRemark
    // const post = postNode.frontmatter
    // if (!post.id) {
    //   post.id = slug
    // }
    console.log(this.props)

    return (
      <Layout>
        <div>
          <Helmet>
            {/* <title>{`${post.title} | ${config.siteTitle}`}</title> */}
          </Helmet>

          <PostListing postEdges={postEdges} />

          {/* <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </div> */}
        </div>
      </Layout>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query OverviewQuery($slug: String!) {
    allMarkdownRemark(
      limit: 2000, 
      sort: { 
        fields: [fields___sort],
        order: ASC
      }, 
      filter: {
        fields: {
          slug: { regex: $slug }, 
          isIndex: { ne: true }
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
          }
        }
      }
    }
  }

`
