import React from 'react'
import { kebabCase } from 'lodash'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import Layout from '../layout'
import SEO from '../components/SEO/SEO'
import { siteTitle, backgroundColor } from '../../data/SiteConfig'
import Image from '../components/Image/Image'
import 'katex/dist/katex.min.css'

export default class DetailsHighlightTemplate extends React.Component {

  constructor(props) {
    super(props)
    this.questions = props.pageContext.questions
    this.bgColor = props.pageContext.bgColor
  }

  componentDidMount() {
    if (!this.questions) {
      return
    }
    const paragraphs = document.querySelectorAll(`section p`)

    this.questions.forEach(({ question, highlight }) => {
      const highlightedNode = paragraphs[highlight]
      const questionNode = document.createElement(`div`)
      const anchorNode = document.createElement('a')

      highlightedNode.setAttribute(`class`, `highlight`)
      highlightedNode.setAttribute(`style`, `background-color: ${this.bgColor}1c`)

      questionNode.setAttribute(`class`, `question`)
      questionNode.setAttribute(`style`, `color: ${this.bgColor}`)
      questionNode.innerText = question
      highlightedNode.prepend(questionNode)

      anchorNode.setAttribute(`class`, `anchor`)
      anchorNode.setAttribute(`name`, kebabCase(question))      
      anchorNode.setAttribute(`id`, kebabCase(question))      
      highlightedNode.prepend(anchorNode)
    })
  }

  render() {
    const { data, pageContext } = this.props
    const { slug } = pageContext
    const { markdownRemark } = data
    const { html } = markdownRemark
    const { title, source, image } = markdownRemark.frontmatter

    return (
      <Layout>
        <Helmet title={`${title} | ${siteTitle}`} />
        <SEO postPath={slug} postNode={markdownRemark} postSEO />
        <article className="details container">
          <aside className="absolute pin-r w-20 pb-8 lg:w-1/3 lg:pb-0 lg:pl-8 lg:pl-8">
            {image && <Image src={image} />}
          </aside>
          <header>
            <h1>{title}</h1>
          </header>
          <section className="details" style={{ backgroundColor }}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            {source && <div className="source">{source}</div>} 
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
        image
      }
    }
  }
`

DetailsHighlightTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf({
      highlight: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
    }),
    bgColor: PropTypes.string.isRequired,
  }).isRequired
}