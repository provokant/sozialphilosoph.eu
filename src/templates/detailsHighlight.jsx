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
    this.html = props.data.markdownRemark.html
  }

  render() {
    const { data, pageContext } = this.props
    const { slug } = pageContext
    const { markdownRemark } = data
    const { html } = markdownRemark
    const { title, source, image } = markdownRemark.frontmatter

    const htmlAppendedQuestions = () => {
      const doc = new DOMParser()
        .parseFromString(html, `text/html`)
        
      const paragraphs = doc.querySelectorAll(`p`)

      if (this.questions) {
        this.questions.forEach(({ question, highlight }) => {
          if (question === null || highlight === null ) return

          const highlightedText = paragraphs[highlight].innerHTML
          const questionNode = document.createElement(`a`)
          const anchorNode = document.createElement('div')
          const highlightedNode = document.createElement(`div`)
          const paragraphNode = document.createElement(`p`)

          highlightedNode.setAttribute(`class`, `highlight`)
          highlightedNode.setAttribute(`style`, `background-color: ${this.bgColor}1c`)
          // highlightedNode.setAttribute(`id`, kebabCase(question))

          questionNode.setAttribute(`class`, `question`)
          questionNode.setAttribute(`aria-hidden`, true)
          questionNode.setAttribute(`href`, `#${kebabCase(question)}`)
          questionNode.setAttribute(`style`, `color: ${this.bgColor}`)
          
          questionNode.innerText = question

          anchorNode.setAttribute(`class`, `paragraph-anchor`)
          anchorNode.setAttribute(`id`, kebabCase(question))

          paragraphNode.innerHTML = highlightedText
          

          highlightedNode.appendChild(anchorNode)
          highlightedNode.appendChild(questionNode)
          highlightedNode.appendChild(paragraphNode)

          paragraphs[highlight].replaceWith(highlightedNode)
        })
      }

      return doc.body.innerHTML
    }

    return (
      <Layout>
        <Helmet title={`${title} | ${siteTitle}`} />
        <SEO postPath={slug} postNode={markdownRemark} postSEO />
        <article className="details">
          <div className="container">
            <aside className="absolute pin-r w-20 pb-8 lg:w-1/3 lg:pb-0 lg:pl-8 lg:pl-8">
              {image && <Image src={image} />}
            </aside>
            <header>
              <h1>{title}</h1>
            </header>
            <section className="details" style={{ backgroundColor }}>
              <div dangerouslySetInnerHTML={{ __html: htmlAppendedQuestions() }} />
              {source && <div className="source">{source}</div>}
            </section>
          </div>
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
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        source: PropTypes.string,
        image: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        highlight: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
      })
    ),
    bgColor: PropTypes.string.isRequired,
  }).isRequired
}