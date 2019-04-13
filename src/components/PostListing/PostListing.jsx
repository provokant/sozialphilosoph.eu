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
          <section className="container mx-auto" key={i}>
            <Link to={post.path} key={post.title} className={`mb-6 py-20 flex hover:opacity-75 ${  i % 2 === 0 ? `flex-row-reverse` : ``}`}>
              <h2 className={i % 2 === 0 && `ml-10`}>{post.title}</h2>
              <p className={i % 2 !== 0 && `ml-10`}>{post.excerpt}</p>
            </Link>
          </section>
        ))}
      </>
    )
  }
}

export default PostListing
