import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
// import { siteDescription, footerLogo } from '../../../data/SiteConfig'
// import Image from '../Image/Image';

class Question extends React.Component {  
  constructor(props) {
    super(props);

    const { questions } = this.props

    this.questions = questions
    this.state = {
      currentQuestion: this.randomQuestion
    }
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  get randomQuestion() {
    return this.questions[Math.floor(Math.random() * this.questions.length)].node.fields
  }

  nextQuestion() {
    this.setState(() => ({
      currentQuestion: this.randomQuestion
    }))
  }



  render() {
    const { currentQuestion } = this.state
    const { question, slug } = currentQuestion
    
    return (
      <div className="flex flex-col items-center justify-center py-10 flex-grow">
        <p className="text-2xl w-2/3 lg:w-1/3 text-center text-white">
          {question}
        </p>
        <div className="flex mt-8">
          <button className="bg-transparent text-white font-bold py-2 px-4 rounded hover:text-grey" type="button" onClick={this.nextQuestion}>No, thanks</button>
          <Link to={`${slug}#highlight`} className="border text-white font-bold py-2 px-4 rounded ml-6 hover:text-grey hover:border-grey">
            Yes, let me read more!
          </Link>
        </div>
      </div>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query AllQuestionsQuery {
        questions: allMarkdownRemark(filter: {fields: {highlight: {ne: -1}, question: {ne: null}}}) {
          edges {
            node {
              fields {
                slug
                question
              }
            }
          }
        }
      }
    `}
    render={({ questions }) => <Question questions={questions.edges} {...props} />}
  />
)