const path = require("path")
const _ = require("lodash")
const moment = require("moment")
const siteConfig = require("./data/SiteConfig")

const postNodes = []

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug
  let sort
  let onLandingPage
  let onHeaderMenu
  let onFooterMenu
  let isIndex
  let isActive
  let hasChildren

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
      isIndex = false
      onLandingPage = false
    } else {
      slug = `/${parsedFilePath.dir}/`
      isIndex = true
      onLandingPage = true
    }

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, "hasChildren")) {
      hasChildren = node.frontmatter.hasChildren
    } else {
      hasChildren = true
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`

      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "isActive")) {
        isActive = node.frontmatter.isActive
      } else {
        isActive = true
      }

      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "onLandingPage")) {
        onLandingPage = node.frontmatter.onLandingPage
      }

      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "onHeaderMenu")) {
        onHeaderMenu = node.frontmatter.onHeaderMenu
      } else {
        onHeaderMenu = false
      }

      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "onFooterMenu")) {
        onFooterMenu = node.frontmatter.onFooterMenu
      } else {
        onFooterMenu = false
      }
      
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "sort")) {
        sort = node.frontmatter.sort
      } else {
        sort = 10000
      }
    }
    createNodeField({ node, name: "slug", value: slug })
    createNodeField({ node, name: "sort", value: sort })
    createNodeField({ node, name: "onHeaderMenu", value: onHeaderMenu })
    createNodeField({ node, name: "onFooterMenu", value: onFooterMenu })
    createNodeField({ node, name: "onLandingPage", value: onLandingPage })
    createNodeField({ node, name: "isIndex", value: isIndex })
    createNodeField({ node, name: "isActive", value: isActive })
    createNodeField({ node, name: "hasChildren", value: hasChildren })

    postNodes.push(node)
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
  const { name } = type
  const { createNodeField } = actions
  if (name === "MarkdownRemark") {
    // addSiblingNodes(createNodeField)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const overviewPage = path.resolve("src/templates/overview.jsx")
    const detailsPage = path.resolve("src/templates/details.jsx")

    resolve(
      graphql(
        `
          {
            allMarkdownRemark (
              filter: {
                fields: {
                  isActive: { eq: true }
                }
              }
            ) {
              edges {
                node {
                  frontmatter {
                    sort
                    title
                  }
                  fields {
                    slug
                    isIndex
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.allMarkdownRemark.edges.forEach(edge => {

          if (edge.node.fields.isIndex) {
            createPage({
              path: edge.node.fields.slug,
              component: overviewPage,
              context: {
                excerpt: edge.node.frontmatter.excerpt,
                slug: edge.node.fields.slug,
                sort: edge.node.fields.sort,
                title: edge.node.fields.title
              }
            })
          } else {
            createPage({
              path: edge.node.fields.slug,
              component: detailsPage,
              context: {
                slug: edge.node.fields.slug,
                title: edge.node.fields.title
              }
            })
          }
        })
      })
    )
  })
}
