import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { siteDescription, footerLogo, footerLink } from '../../../data/SiteConfig'
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
          nodes {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
        file(relativePath: {eq: "images/content/sky.jpg"}) {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    `}
    render={({ allMarkdownRemark, file }) => (
      <footer style={{ backgroundImage: `url(${file.childImageSharp.gatsbyImageData.images.fallback.src})` }}>
        <Question />
        <nav className="container">
          {(footerLogo && footerLink) && <a href={footerLink} className="logo" rel="noopener noreferrer" target="_blank"><Image src={footerLogo} /></a>}
          
          <div className="menu">
            <p className="description">{siteDescription}</p>
            <div className="self-stretch">
              {allMarkdownRemark.nodes.map(link => (
                <Link
                  to={link.fields.slug}
                  key={link.fields.slug}
                  className="text-white py-6 ml-4"
                >
                  {link.frontmatter.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </footer>
    )}
  />
)
