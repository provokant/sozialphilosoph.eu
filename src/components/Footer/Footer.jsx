import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import './Footer.scss'
import config from '../../../data/SiteConfig'

export default () => (
  <StaticQuery
    query={graphql`
      query FooterMenuQuery {
        allMarkdownRemark(
          sort: { fields: [fields___sort], order: ASC }
          filter: {
            fields: { isActive: { eq: true }, onFooterMenu: { eq: true } }
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
      <footer className="bg-black">
        <nav className="container flex justify-end mx-auto py-10">
          <p className="text-white self-start mr-7">{config.siteDescription}</p>
          <div className="self-stretch">
            {data.allMarkdownRemark.edges.map(link => (
              <Link
                to={link.node.fields.slug}
                key={link.node.fields.slug}
                className="text-white py-6 ml-4"
              >
                {link.node.frontmatter.title}
              </Link>
            ))}
          </div>
        </nav>
      </footer>
    )}
  />
)