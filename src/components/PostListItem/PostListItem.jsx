import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import './PostListItem.scss'
import Image from '../Image/Image'

class PostListItem extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef()
    this.link = React.createRef()
    this.scrollIntoView = this.scrollIntoView.bind(this)
  }

  scrollIntoView(e) {
    if(this.wrapper.current.getBoundingClientRect().top !== 0) {
      e.preventDefault()
      this.wrapper.current.scrollIntoView()
      setTimeout(() => {
        this.link.current.click()
      }, 160)
    }
  }

  render() {
    const { path, title, bgColor, teaser, excerpt, image, key } = this.props
    const slug = kebabCase(title)

    return (
      <section className="item" key={key} ref={this.wrapper} id={slug}>
        <Link to={path} ref={this.link} style={{ color: bgColor || `#000`}} className="container" onClick={e => this.scrollIntoView(e)}>
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
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string,
  path: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  title: PropTypes.string.isRequired,
}

PostListItem.defaultProps = {
  bgColor: ``,
  image: ``,
  teaser: ``,
}

export default PostListItem
