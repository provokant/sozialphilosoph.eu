import React from 'react'
import PropTypes from 'prop-types'
import PostListItem from '../PostListItem/PostListItem' 

class PostListing extends React.Component {
  get postList() {
    const postList = []
    const { postEdges } = this.props

    postEdges.forEach(postEdge => {
      const { node } = postEdge
      const { fields, frontmatter, excerpt } = node
      const { image, title, bgColor, teaser } = frontmatter

      // console.log(frontmatter)

      postList.push({
        path: fields.slug,
        excerpt,
        image,
        title,
        teaser,
        bgColor
      })
    })
    return postList
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
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          teaser: PropTypes.string,
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
