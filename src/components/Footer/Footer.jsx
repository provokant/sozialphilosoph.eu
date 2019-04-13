import React, { Component } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import "./Footer.scss"
import config from "../../../data/SiteConfig"

// const FooterLinks = ({ data }) => (
//   <Footer>
//     <nav>
//       {data.allMarkdownRemark.edges.map(link => {
//         console.log(link.node.frontmatter.title);
//         <Link to={link.node.fields.slug}>
//           {link.node.frontmatter.title}
//         </Link>
//       })}
//     </nav>
//   </Footer>
// )

export default () => (
  <StaticQuery
    query={graphql`
      query FooterMenuQuery { 
        allMarkdownRemark(
          sort: {fields: [fields___sort], order: ASC}, 
          filter: {fields: { isActive: { eq: true} , onFooterMenu: {eq: true}}}
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
      <footer className="bg-grey-darker">
        <nav className="container flex justify-end mx-auto mt-20 py-10">
          <p className="text-white self-start mr-7">{config.siteDescription}</p>
          <div className="self-stretch">
            {data.allMarkdownRemark.edges.map((link, i) => (
              <Link to={link.node.fields.slug} key={i} className="text-white py-6">
                {link.node.frontmatter.title}
              </Link>
))}
          </div>
        </nav>
      </footer>
    )}
  />
)

// Footer.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       edges: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//       }).isRequired,
//     }).isRequired,
//   }).isRequired,
// }