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
      const { image, title, bgColor } = frontmatter

      postList.push({
        path: fields.slug,
        excerpt,
        image,
        title,
        bgColor
      })
    })
    return postList
  }

  render() {
    return (
      <>
        {this.postList.map((post, i) => (
          <section style={{backgroundColor: post.bgColor}} key={post.path}>
            <div className="container mx-auto">
              <Link
                to={post.path}
                className={`mb-6 py-20 flex hover:opacity-75 ${
                  i % 2 === 0 ? `flex-row-reverse` : ` `
                }`}
              >
                <div className="w-1/2">
                  <h2 className="text-5xl tracking-tight w-2/3 mb-4">{post.title}</h2>
                  <p className="text-xl leading-normal">{post.excerpt}</p>
                </div>
                <div className="w-1/2">
                  {post.image && <img alt="" src={post.image} className="object-contain" />}
                </div>
              </Link>
            </div>
          </section>
        ))}
      </>
    )
  }
}

PostListing.propTypes = {
  postEdges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
        fields: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }).isRequired,
        excerpt: PropTypes.string.isRequired
      }).isRequired,
    })
  ).isRequired,
}

export default PostListing
