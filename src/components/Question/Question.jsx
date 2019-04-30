import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
// import { siteDescription, footerLogo } from '../../../data/SiteConfig'
// import Image from '../Image/Image';

const Question = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {fields: {highlight: {ne: -1}, question: {ne: null}}}) {
        edges {
          node {
            id
            fields {
              slug
              question
            }
          }
        }
      }
    }
  `)

  let currentQuestion

  function pick() {
    const { question, slug } = data.allMarkdownRemark.edges[Math.floor(Math.random()*data.allMarkdownRemark.edges.length)].node.fields

    return { question, slug}
  }

  function updateQuestion() {
    console.log(`updating`)
    currentQuestion = pick()
  }

  updateQuestion()

  return (
    <div className="flex flex-col items-center justify-center py-10 flex-grow">
      <p className="text-xl w-2/3 text-center text-white">
        {currentQuestion.question}
      </p>
      <div className="flex mt-8">
        <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button" onClick={updateQuestion()}>No</button>
        <Link to={`${currentQuestion.slug}#highlight`} className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded ml-6">
          Yes, please!
        </Link>
      </div>
    </div>
  )
}

export default Question