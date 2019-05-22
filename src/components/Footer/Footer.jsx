import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { siteDescription, footerLogo, footerLink, footerBackground } from '../../../data/SiteConfig'
import Image from '../Image/Image'
import './Footer.scss'
import Question from '../Question/Question'

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
      <footer style={{ backgroundImage: `url(${footerBackground})` }}>
        <Question />
        <nav className="container">
          {(footerLogo && footerLink) && <a href={footerLink} className="logo" rel="noopener noreferrer" target="_blank"><Image src={footerLogo} /></a>}
          
          <div className="menu">
            <p className="description">{siteDescription}</p>
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
          </div>
        </nav>
      </footer>
    )}
  />
)