import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './PostListItem.scss'
import Image from '../Image/Image'

class PostListItem extends React.Component {
  render() {
    const { postNode } = this.props
    // const { postNode, isOdd, isIntro } = this.props

    return (
      <section className="item" key={postNode.path}>
        <div className="container mx-auto px-4 lg:px-2">
          <Link to={postNode.path} style={{ color: postNode.bgColor ? postNode.bgColor : `#000`}}>
            <div className="w-full md:w-2/3">
              <h2>{postNode.title}</h2>
              <p>{postNode.excerpt}</p>
              <button type="button">Read more &raquo;</button>
            </div>
            <div className="image flex items-center justify-center w-full px-12 pt-10 md:w-1/3 md:pl-8 md:pr-0 md:pt-0">
              {postNode.image && <Image src={postNode.image} />}
            </div>
          </Link>
        </div>
      </section>
    )
  }
}

PostListItem.propTypes = {
  postNode: PropTypes.shape(
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
  isOdd: PropTypes.bool,
  isIntro: PropTypes.bool
}

PostListItem.getDefaultProps = {
  isOdd: false,
  isIntro: false
}

export default PostListItem
