import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import config from '../../../data/SiteConfig'
import './Header.sass'

const classNames = {
  defaultLink: 'block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-black py-3',
  get link() {
    return `${this.defaultLink} mr-6`
  },
  get brand() {
    return `${this.defaultLink} lowercase font-bold tracking-wide text-black self-end`
  },
}

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
      <header>
        <nav className="container mx-auto flex items-center justify-between flex-wrap">
          <div className="text-sm w-full block flex-grow justify-between lg:flex lg:items-center lg:w-auto">
            <div className="">
              {data.allMarkdownRemark.edges.map(link => (
                <Link
                  to={link.node.fields.slug}
                  key={link.node.fields.slug}
                  activeClassName="text-black"
                  className={classNames.link}
                >
                  {link.node.frontmatter.title}
                </Link>
              ))}
            </div>
            <Link to="/" className={classNames.brand}>
              {config.siteTitleShort}
            </Link>
          </div>
        </nav>
      </header>
    )}
  />
)
