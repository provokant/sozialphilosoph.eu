import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import config from '../../../data/SiteConfig'
import './Header.scss'

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
      <header className="bg-grey-lighter mb-8">
        <nav className="container mx-auto flex">
          <Link to="/" className="py-10 text-lg">
            {config.siteTitleShort}
          </Link>
          {data.allMarkdownRemark.edges.map(link => (
            <Link
              to={link.node.fields.slug}
              key={link.node.fields.slug}
              className="py-10 pl-8 text-lg"
            >
              {link.node.frontmatter.title}
            </Link>
          ))}
        </nav>
      </header>
    )}
  />
)
