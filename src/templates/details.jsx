import React from 'react'
import { kebabCase } from 'lodash'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import cheerio from 'cheerio'
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
      // const doc = new DOMParser()
      //   .parseFromString(html, `text/html`)
      const doc = cheerio.load(html)
        
      // const paragraphs = doc.querySelectorAll(`p`)
      const paragraphs = doc(`p`)

      if (this.questions) {
        this.questions.forEach(({ question, highlight }) => {
          if (question === null || highlight === null ) return

          const questionSlug = kebabCase(question)
          const paragraph = doc(paragraphs[highlight])
          const wrapperNode = doc(`<div/>`)

          // const highlightedText = paragraphs[highlight].text
          // const highlightedText = paragraph.html()
          const highlightedParagraph = paragraph.wrap(wrapperNode)
          // const questionNode = document.createElement(`a`)
          // const anchorNode = document.createElement('div')
          // const highlightedParagraph = document.createElement(`div`)
          // const paragraphNode = document.createElement(`p`)
          const questionNode = doc(`<a/>`)

          questionNode
            .addClass(`question`)
            .attr(`aria-hidden`, true)
            .attr(`href`, `#${questionSlug}`)
            .css(`color`, this.bgColor)

          highlightedParagraph
            .css(`background-color`, `${this.bgColor}1c`)
            .attr(`id`, questionSlug)
            .addClass(`highlight`)

          wrapperNode
            .prepend(questionNode)

          

          

          // highlightedParagraph
          // highlightedParagraph
          // highlightedParagraph.setAttribute(`class`, `highlight`)
          // highlightedParagraph.setAttribute(`style`, `background-color: ${this.bgColor}1c`)
          // // highlightedParagraph.setAttribute(`id`, kebabCase(question))

          // questionNode.setAttribute(`class`, `question`)
          // questionNode.setAttribute(`aria-hidden`, true)
          // questionNode.setAttribute(`href`, `#${kebabCase(question)}`)
          // questionNode.setAttribute(`style`, `color: ${this.bgColor}`)
          
          // questionNode.innerText = question

          // anchorNode.setAttribute(`class`, `paragraph-anchor`)
          // anchorNode.setAttribute(`id`, kebabCase(question))

          // paragraphNode.innerHTML = highlightedText
          

          // highlightedParagraph.appendChild(anchorNode)
          // highlightedParagraph.appendChild(questionNode)
          // highlightedParagraph.appendChild(paragraphNode)
          // const highlightedParagraph = doc.append(`<div/>`)

          paragraph.replaceWith(highlightedParagraph)
        })
      }

      return doc.html()
    }

    return (
      <Layout>
        <Helmet title={`${title} | ${siteTitle}`} />
        <SEO postPath={slug} postNode={markdownRemark} postSEO />
        <section className="details" style={{ backgroundColor }}>
          <div className="container">
            <div className="image">
              {image && <Image src={image} />}
            </div>
            <div className="content">
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: htmlAppendedQuestions() }} />
              {source && <div className="source">{source}</div>}
            </div>
          </div>
        </section>
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