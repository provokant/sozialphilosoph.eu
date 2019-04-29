import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { siteDescription, footerLogo } from '../../../data/SiteConfig'
import Image from '../Image/Image'
import './Footer.scss'

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
      <footer className="bg-black h-screen flex flex-col justify-between">
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