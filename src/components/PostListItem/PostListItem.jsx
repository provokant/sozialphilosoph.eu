import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './PostListItem.scss'
import Image from '../Image/Image'

class PostListItem extends React.Component {
  render() {
    const { path, title, bgColor, teaser, excerpt, image } = this.props

    console.log(this.props)

    return (
      <section className="item" key={path}>
        <Link to={path} style={{ color: bgColor || `#000`}} className="container">
          <div className="content">
            <h2>{title}</h2>
            {teaser && <div className="teaser">{teaser}</div>}
            <p className="excerpt">{excerpt}</p>
            <button type="button">Read more &raquo;</button>
          </div>
          <div className="image">
            {image && <Image src={image} />}
          </div>
        </Link>
      </section>
    )
  }
}

PostListItem.propTypes = {
  bgColor: PropTypes.string,
  image: PropTypes.string,
  path: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired
}

PostListItem.defaultProps = {
  bgColor: ``,
  image: ``,
  teaser: ``,
}

export default PostListItem
