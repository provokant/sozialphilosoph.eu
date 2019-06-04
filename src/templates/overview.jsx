import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Layout from '../layout/index'
import PostListing from '../components/PostListing/PostListing'
import Image from '../components/Image/Image'
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
    const { nodes } = allMarkdownRemark
    const { title, html, image, source, teaser, slug, bgColor } = pageContext
    // const { title, html, source, teaser } = pageContext
    const { isCollapsed, isCollapsable } = this.state
    const { fromHeader } = location.state
    const anchors = nodes.map(({ frontmatter }) => {
      const { title: pageTitle } = frontmatter
      const anchor = `${slug}#${kebabCase(pageTitle)}`
      
      return { pageTitle, anchor }
    })

    return (
      <Layout fromHeader={fromHeader}>
        <Helmet title={`${title} | ${siteTitle}`} />
        <section ref={this.wrapper} className={`overview ${isCollapsed ? `collapsed` : ``}`}>
          <div ref={this.container} className="container">
            <div className="image">
              {image && <Image src={image} />}
            </div>
            <div className="content">
              <h1>{title}</h1>
              {teaser && <div className="teaser">{teaser}</div>}
              <div dangerouslySetInnerHTML={{ __html: html }} />
              {source && <div className="source">{source}</div>} 
            </div>
            <ul className="categories">
              {anchors.map(({ pageTitle, anchor}) => (
                <li key={kebabCase(pageTitle)}>
                  <Link to={anchor} style={{ color: bgColor }}>
                    {pageTitle}
                  </Link>
                </li>
              ))}
            </ul>
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
        <PostListing postEdges={nodes} />
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
      nodes {
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
`

OverviewTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      nodes: PropTypes.array.isRequired
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