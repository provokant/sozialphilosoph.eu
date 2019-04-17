import React from 'react'
import PropTypes from 'prop-types'
import './PostListing.scss'
import PostListItem from '../PostListItem/PostListItem' 

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
          <PostListItem postNode={post} isOdd={i % 2 !== 0} />
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
