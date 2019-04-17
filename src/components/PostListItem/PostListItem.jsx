import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './PostListItem.scss'

class PostListItem extends React.Component {
  render() {
    const { postNode, isOdd, isIntro } = this.props

    return (
      <section style={{backgroundColor: postNode.bgColor}} key={postNode.path} className={isIntro ? `intro` : ``}>
        <div className="container mx-auto">
          <Link
            to={postNode.path}
            className={`mb-6 py-20 flex ${
              isOdd ? `flex-row-reverse text-right` : ``
            }`}
          >
            <div 
              className={`w-1/2 ${
                isOdd ? `flex flex-col items-end` : ``
              }`}
            >
              <h2 className="text-5xl font-thin tracking-tight w-2/3 mb-4 uppercase">{postNode.title}</h2>
              <p className="text-xl leading-normal">{postNode.excerpt}</p>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              {postNode.image && <img alt="" src={postNode.image} className="object-contain" />}
            </div>
          </Link>
        </div>
      </section>
    )
  }
}

PostListItem.propTypes = {
  postNode: PropTypes.arrayOf(
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
