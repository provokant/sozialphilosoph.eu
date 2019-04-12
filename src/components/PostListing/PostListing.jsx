import React from "react"
import { Link } from "gatsby"
import "./PostListing.scss"

class PostListing extends React.Component {
  get postList() {
    const postList = []
    const { postEdges } = this.props

    postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        image: postEdge.node.frontmatter.image,
        title: postEdge.node.frontmatter.title,
        excerpt: postEdge.node.excerpt
      })
    })
    return postList
  }

  render() {
    return (
      <>
        {this.postList.map((post, i) => (
          <section className={`post-listing`} key={i}>
            <Link to={post.path} key={post.title}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <pre>{post.hasChildren}</pre>
            </Link>
          </section>
        ))}
      </>
    )
  }
}

export default PostListing
