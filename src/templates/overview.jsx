import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../layout/index'
import PostListing from '../components/PostListing/PostListing'
// import Image from '../components/Image/Image'
import { siteTitle } from '../../data/SiteConfig'

export default class OverviewTemplate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
      isCollapsable: false
    }
    this.wrapper = React.createRef()
    this.container = React.createRef()
    this.toggleCollapse = this.toggleCollapse.bind(this)
  }

  componentDidMount() {
    this.setState(() => ({
      isCollapsable: this.isWrapperOverflown()
    }))
  }

  isWrapperOverflown() {
    return this.wrapper.current.clientHeight < this.container.current.clientHeight
  }

  toggleCollapse() {
    const { isCollapsed } = this.state

    this.setState(() => ({
      isCollapsed: !isCollapsed
    }))

    if (!isCollapsed) {
      this.wrapper.current.scrollIntoView()
    }
  }

  render() {
    const { data, pageContext, location } = this.props
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark
    // const { title, html, image, source, teaser } = pageContext
    const { title, html, source, teaser } = pageContext
    const { isCollapsed, isCollapsable } = this.state
    const { fromHeader } = location.state

    return (
      <Layout fromHeader={fromHeader}>
        <Helmet title={`${title} | ${siteTitle}`} />
        <section ref={this.wrapper} className={`overview ${isCollapsed ? `collapsed` : ``}`}>
          <div ref={this.container} className="container">
            {/* <div className="image">
              {image && <Image src={image} />}
            </div> */}
            <div className="content">
              <h1>{title}</h1>
              {teaser && <div className="teaser">{teaser}</div>}
              <div dangerouslySetInnerHTML={{ __html: html }} />
              {source && <div className="source">{source}</div>} 
            </div>
          </div>
          <div className={`button-wrapper ${!isCollapsable ? `hidden`: ``}`}>
            <div className="container">
              <button type="button" onClick={this.toggleCollapse}>
                Read all 
                {isCollapsed ? ` ▼` : ` ▲`}
              </button>
            </div>
          </div>
        </section>
        <PostListing postEdges={edges} />
      </Layout>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query OverviewQuery($slug: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___sort], order: ASC }
      filter: { fields: { 
        slug: { regex: $slug }, 
        isIndex: { ne: true }
      } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          frontmatter {
            title
            bgColor
            image
            teaser
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

OverviewTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    html: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    sort: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      fromHeader: PropTypes.bool
    })
  })
}

OverviewTemplate.defaultProps = {
  location: {
    state: {
      fromHeader: false
    }
  }
}