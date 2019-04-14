import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import config from '../../../data/SiteConfig'
import './Header.css'

export default () => (
  <StaticQuery
    query={graphql`
      query HeaderMenuQuery {
        allMarkdownRemark(
          sort: { fields: [fields___sort], order: ASC }
          filter: {
            fields: { isActive: { eq: true }, onHeaderMenu: { eq: true } }
          }
        ) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <header className="bg-black">
        <nav className="container mx-auto flex items-center justify-between flex-wrap p-6">
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-grey-dark hover:text-white mr-6">
                {config.siteTitleShort}
              </Link>
              {data.allMarkdownRemark.edges.map(link => (
                <Link
                  to={link.node.fields.slug}
                  key={link.node.fields.slug}
                  className="block mt-4 lg:inline-block lg:mt-0 text-grey-dark hover:text-white mr-4"
                >
                  {link.node.frontmatter.title}
                </Link>
              ))}
            </div>
          </div>

        </nav>
      </header>
    )}
  />
)
