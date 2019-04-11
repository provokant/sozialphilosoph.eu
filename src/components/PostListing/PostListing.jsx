import React from "react"
import { Link } from "gatsby"

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
      <div>
        {this.postList.map(post => (
          <Link to={post.path} key={post.title}>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    )
  }
}

export default PostListing
