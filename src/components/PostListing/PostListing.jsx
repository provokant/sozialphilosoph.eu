import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './PostListing.scss'

class PostListing extends React.Component {
  get postList() {
    const postList = []
    const { postEdges } = this.props

    postEdges.forEach(postEdge => {
      const { node } = postEdge
      const { fields, frontmatter, excerpt } = node
      const { image, title } = frontmatter

      postList.push({
        path: fields.slug,
        excerpt,
        image,
        title,
      })
    })
    return postList
  }

  render() {
    return (
      <>
        {this.postList.map((post, i) => (
          <section className="container mx-auto" key={post.path}>
            <Link
              to={post.path}
              className={`mb-6 py-20 flex hover:opacity-75 ${
                i % 2 === 0 ? `flex-row-reverse` : ``
              }`}
            >
              <h2 className={i % 2 === 0 && `ml-10`}>{post.title}</h2>
              <p className={i % 2 !== 0 && `ml-10`}>{post.excerpt}</p>
            </Link>
          </section>
        ))}
      </>
    )
  }
}

PostListing.propTypes = {
  postEdges: PropTypes.shape({
    node: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      feilds: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      excerpt: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
}

export default PostListing
