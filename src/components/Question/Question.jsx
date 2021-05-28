import React from 'react'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { questionDeny, questionAccept } from '../../../data/SiteConfig'
import './Question.scss'

class Question extends React.Component {  
  constructor(props) {
    super(props);
    const { questionList } = this.props

    this.questions = questionList.flatMap(({ fields }) => {
      const { slug, questions } = fields

      return questions.map(({ question, highlight }) => ({ slug, question, highlight }))
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
      <div className="question">
        <p>
          {question}
        </p>
        <div>
          <button type="button" onClick={this.nextQuestion}>{questionDeny}</button>
          <Link to={`${slug}#${kebabCase(question)}`}>
            {questionAccept}
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
