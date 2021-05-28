import React from 'react'
import PropTypes from 'prop-types'
import PostListItem from '../PostListItem/PostListItem' 

class PostListing extends React.Component {
  get postList() {
    const { postEdges } = this.props

    return postEdges.map(({
      fields: { slug: path },
      frontmatter: { image, title, bgColor, teaser },
      excerpt
    }) => ({ path, excerpt, image, title, teaser, bgColor }))
  }

  render() {
    return (
      <>
        {this.postList.map((post, i) => (
          <PostListItem {...post} isOdd={i % 2 !== 0} key={post.slug} />
        ))}
      </>
    )
  }
}

PostListing.propTypes = {
  postEdges: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        teaser: PropTypes.string,
      }).isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      excerpt: PropTypes.string.isRequired
    })
  ).isRequired,
}

export default PostListing
