import React, { Component } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import "./Header.scss"
import config from "../../../data/SiteConfig"

// const HeaderLinks = ({ data }) => (
//   <header>
//     <nav>
//       {data.allMarkdownRemark.edges.map(link => {
//         console.log(link.node.frontmatter.title);
//         <Link to={link.node.fields.slug}>
//           {link.node.frontmatter.title}
//         </Link>
//       })}
//     </nav>
//   </header>
// )

export default () => (
  <StaticQuery
    query={graphql`
      query HeaderMenuQuery { 
        allMarkdownRemark(
          sort: {fields: [fields___sort], order: ASC}, 
          filter: {fields: { isActive: { eq: true} , onHeaderMenu: {eq: true}}}
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
        <nav>
          <Link to={`/`}>
            {config.siteTitleShort}
          </Link>
          {data.allMarkdownRemark.edges.map((link, i) => 
            <Link to={link.node.fields.slug} key={i}>
              {link.node.frontmatter.title}
            </Link>
          )}
        </nav>
      </header>
    )}
  />
)

// Header.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       edges: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//       }).isRequired,
//     }).isRequired,
//   }).isRequired,
// }