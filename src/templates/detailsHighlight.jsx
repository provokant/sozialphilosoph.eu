import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../layout'
import SEO from '../components/SEO/SEO'
import { siteTitle, backgroundColor } from '../../data/SiteConfig'

export default class DetailsHighlightTemplate extends React.Component {

  constructor(props) {
    super(props)
    this.highlight = props.pageContext.highlight
    this.question = props.pageContext.question
    this.bgColor = props.pageContext.bgColor
  }
  

  componentDidMount() {
    const paragraphs = document.querySelectorAll(`section p`)
    const highlightedParagraph = paragraphs[this.highlight]
    const questionNode = document.createElement(`div`)

    questionNode.setAttribute(`class`, `question`)
    questionNode.setAttribute(`style`, `color: ${this.bgColor}`)
    questionNode.innerText = this.question

    highlightedParagraph.prepend(questionNode)
    highlightedParagraph.setAttribute(`id`, `highlight`)
    highlightedParagraph.setAttribute(`style`, `background-color: ${this.bgColor}33`)
  }

  render() {
    const { data, pageContext } = this.props
    const { slug } = pageContext
    const { markdownRemark } = data
    const { html } = markdownRemark
    const { title, source } = markdownRemark.frontmatter

    return (
      <Layout>
        <Helmet title={`${title} | ${siteTitle}`} />
        <SEO postPath={slug} postNode={markdownRemark} postSEO />
        <article className="container mx-auto mb-6 py-20 px-4 lg:px-2">
          <header>
            <h1 className="text-5xl w-2/3 mb-4">{title}</h1>
          </header>
          <section className="details lg:w-2/3" style={{ backgroundColor }}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            {source && <div className="text-italic text-sm border-t-2 pt-3 text-grey-darker">{source}</div>} 
          </section>
        </article>
      </Layout>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query DetailsHighlightQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        source
      }
    }
  }
`

DetailsHighlightTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    highlight: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
  }).isRequired
}