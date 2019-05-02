import React from 'react'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class Question extends React.Component {  
  constructor(props) {
    super(props);
    const { questionList } = this.props

    this.questions = questionList.flatMap(({ fields }) => {
      const { slug, questions } = fields

      return questions.map(({ question, highlight }) => {
        return {
          slug,
          question,
          highlight
        }
      })
    })

    this.state = {
      currentQuestion: this.randomQuestion
    }
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  get randomQuestion() {
    return this.questions[Math.floor(Math.random() * this.questions.length)]
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
        <p className="text-2xl w-2/3 lg:w-1/3 text-center text-white min-h-10">
          {question}
        </p>
        <div className="flex mt-8">
          <button className="bg-transparent text-white font-bold py-2 px-4 rounded hover:text-grey" type="button" onClick={this.nextQuestion}>No, thanks</button>
          <Link to={`${slug}#${kebabCase(question)}`} className="border text-white font-bold py-2 px-4 rounded ml-6 hover:text-grey hover:border-grey">
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
        questionList: allMarkdownRemark (
          filter: {
            fields: {
              questions: {
                elemMatch: {
                  question: { ne: null },
                  highlight: { gt: -1 }
                }
              }
            }
          }
        ) {
          nodes {
            fields {
              slug
              questions {
                question
                highlight
              }
            }
          }
        }
      }
    `}
    render={({ questionList }) => <Question questionList={questionList.nodes} {...props} />}
  />
)

Question.propTypes = {
  questionList: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            question: PropTypes.string.isRequired,
            highlight: PropTypes.number.isRequired,
          })
        ),
      }).isRequired,
    })
  ).isRequired,
}