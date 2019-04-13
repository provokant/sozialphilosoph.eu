import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../layout"
import SEO from "../components/SEO/SEO"
import config from "../../data/SiteConfig"

export default class DetailsTemplate extends React.Component {
  render() {
    const { slug } = this.props.pageContext
    const { data } = this.props
    const postNode = data.markdownRemark
    const post = postNode.frontmatter
    if (!post.id) {
      post.id = slug
    }
    return (
      <Layout>
        <Helmet title={`${post.title} | ${config.siteTitle}`} />
        <SEO postPath={slug} postNode={postNode} postSEO />
        <article className="container mx-auto">
          <header>
            <h1>{post.title}</h1>
          </header>
          <section>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </section>
        </article>
      </Layout>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query DetailsQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`
