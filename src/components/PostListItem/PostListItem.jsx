import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './PostListItem.scss'
import Image from '../Image/Image'

class PostListItem extends React.Component {
  render() {
    const { postNode, isOdd, isIntro } = this.props

    return (
      <section style={{color: postNode.bgColor ? postNode.bgColor : `#fff`}} key={postNode.path} className={isIntro ? `intro` : `item`}>
        <div className="container mx-auto px-2 md:px-0">
          {/* <Link
              to={postNode.path}
              className={`mb-6 py-20 block md:flex ${
                isOdd ? `md:flex-row-reverse md:text-right` : ``
              }`}
            >
              <div 
                className={`w-full md:w-2/3 ${
                  isOdd ? `flex flex-col md:items-end` : ``
                }`}
              > */}
          <Link to={postNode.path} className="mb-6 py-20 block md:flex">
            <div className="w-full md:w-2/3">
              <h2 className="text-5xl font-thin tracking-tight md:w-2/3 mb-4 uppercase">{postNode.title}</h2>
              <p className="text-xl leading-normal text-justify text-thin text-black">{postNode.excerpt}</p>
            </div>
            <div className="flex items-center justify-center w-full md:w-1/3 pl-6">
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
