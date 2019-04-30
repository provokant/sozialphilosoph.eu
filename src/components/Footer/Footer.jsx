import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { siteDescription, footerLogo } from '../../../data/SiteConfig'
import Image from '../Image/Image'
import './Footer.scss'
import Question from '../Question/Question';

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
      <footer className="bg-black h-screen flex flex-col justify-between px-4 lg:px-2">
        <Question />
        <nav className="container flex justify-end mx-auto py-10">
          <div className="max-h-10">
            {footerLogo && <Image src={footerLogo} />}
          </div>
          <p className="text-grey-dark self-start mr-7">{siteDescription}</p>
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