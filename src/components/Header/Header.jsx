import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import config from '../../../data/SiteConfig'
import './Header.scss'

const classNames = {
  default: 'inline-block mt-0 py-3',
  get defaultLink() {
    return `${this.default} text-grey-darkest hover:text-black`
  },
  get link() {
    return `${this.defaultLink} px-3 hidden md:inline-block`
  },
  get brand() {
    return `${this.defaultLink} lowercase font-bold tracking-wide text-black mr-8`
  }
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
                bgColor
              }
              fields {
                hasChildren
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <header className="header">
        <nav className="container mx-auto flex items-center justify-between flex-wrap px-2 md:px-0">
          <div className="text-sm w-full block flex-grow justify-between flex items-center w-auto">
            <div>
              <Link to="/" className={classNames.brand}>
                {config.siteTitleShort}
              </Link>
              {data.allMarkdownRemark.edges.map(link => (
                <Link
                  to={link.node.fields.slug}
                  key={link.node.fields.slug}
                  activeClassName="text-black"
                  className={classNames.link}
                  activeStyle={{
                    backgroundColor: link.node.fields.hasChildren ? link.node.frontmatter.bgColor : ``
                  }}
                >
                  {link.node.frontmatter.title}
                </Link>
              ))}
            </div>
            <div className="text-grey italic hidden lg:block">
              Flat-File System based on GatsbyJS for advanced developers 
            </div>
            <div className="block md:hidden">
              <button type="button" className="text-grey-dark tracking-wide hover:text-black">
                <span className="mr-2">NAVIGATE</span>
                &#9776; 
              </button>
            </div>
          </div>
        </nav>
      </header>
    )}
  />
)
