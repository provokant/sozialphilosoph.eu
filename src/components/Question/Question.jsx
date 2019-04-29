import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
// import { siteDescription, footerLogo } from '../../../data/SiteConfig'
// import Image from '../Image/Image';

export default () => (
  <StaticQuery
    query={graphql`
      query QuestionQuery {
        allSitePage(
          filter: {
            context: {
              highlight: { ne: null }
            }
          }
        ) {
          edges {
            node {
              id
              path
              context {
                slug
                highlight
                question
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className="flex flex-col items-center py-10">
        <p className="text-xl w-2/3 text-center text-white">
          Want to know what Foucault thinks psychiatries are for?
        </p>
        <div className="flex mt-8">
          <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">No</button>
          <Link to="existentialism/camus/" className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded ml-6">
            Yes, please!
          </Link>
        </div>
      </div>
    )}
  />
)