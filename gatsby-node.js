const path = require('path')
const _ = require('lodash')

const postNodes = []

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug
  let sort
  let highlight
  let question
  let questions
  let onLandingPage
  let onHeaderMenu
  let onFooterMenu
  let isIndex
  let isActive
  let hasChildren

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    const { frontmatter } = node

    if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
      isIndex = false
      onLandingPage = false
    } else {
      slug = `/${parsedFilePath.dir}/`
      isIndex = true
      onLandingPage = true
    }

    if (Object.prototype.hasOwnProperty.call(frontmatter, 'hasChildren')) {
      ({ hasChildren } = frontmatter)
    } else {
      hasChildren = true
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(frontmatter, 'slug'))
        slug = `/${_.kebabCase(frontmatter.slug)}`

      if (Object.prototype.hasOwnProperty.call(frontmatter, 'isActive')) {
        ({ isActive } = frontmatter)
      } else {
        isActive = true
      }

      if (Object.prototype.hasOwnProperty.call(frontmatter, 'onLandingPage')) {
        ({ onLandingPage } = frontmatter)
      }

      if (Object.prototype.hasOwnProperty.call(frontmatter, 'onHeaderMenu')) {
        ({ onHeaderMenu } = frontmatter)
      } else {
        onHeaderMenu = false
      }

      if (Object.prototype.hasOwnProperty.call(frontmatter, 'onFooterMenu')) {
        ({ onFooterMenu } = frontmatter)
      } else {
        onFooterMenu = false
      }

      if (Object.prototype.hasOwnProperty.call(frontmatter, 'sort')) {
        ({ sort } = frontmatter)
      } else {
        sort = 10000
      }

      if (Object.prototype.hasOwnProperty.call(frontmatter, 'highlight') && Object.prototype.hasOwnProperty.call(frontmatter, 'question')) {
        ({ highlight } = frontmatter);
        ({ question } = frontmatter)
      } else {
        question = null
        highlight = -1
      }

      if (Object.prototype.hasOwnProperty.call(frontmatter, 'questions')) {
        ({ questions } = frontmatter)
      } else {
        questions = null
      }
    }


    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'highlight', value: highlight })
    createNodeField({ node, name: 'question', value: question })
    createNodeField({ node, name: 'questions', value: questions })
    createNodeField({ node, name: 'sort', value: sort })
    createNodeField({ node, name: 'onHeaderMenu', value: onHeaderMenu })
    createNodeField({ node, name: 'onFooterMenu', value: onFooterMenu })
    createNodeField({ node, name: 'onLandingPage', value: onLandingPage })
    createNodeField({ node, name: 'isIndex', value: isIndex })
    createNodeField({ node, name: 'isActive', value: isActive })
    createNodeField({ node, name: 'hasChildren', value: hasChildren })

    postNodes.push(node)

    /**
     * If question and highlight exists, add separate post.
     */
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const overviewPage = path.resolve('src/templates/overview.jsx')
    const detailsPage = path.resolve('src/templates/details.jsx')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(filter: { fields: { isActive: { eq: true } } }) {
              edges {
                node {
                  html
                  frontmatter {
                    sort
                    title
                    image
                    bgColor
                    teaser
                  }
                  fields {
                    slug
                    isIndex
                    hasChildren
                    highlight
                    question
                    questions {
                      question
                      highlight
                    }
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
          const { html, frontmatter, fields } = edge.node
          const { sort, title, bgColor, image, source, teaser } = frontmatter
          const { slug, isIndex, hasChildren, questions } = fields

          if (isIndex && hasChildren) {
            createPage({
              path: slug,
              component: overviewPage,
              context: {
                html,
                slug,
                sort,
                title,
                image,
                bgColor,
                source,
                teaser
              },
            })
          } else {
            createPage({
              path: slug,
              component: detailsPage,
              context: {
                slug,
                title,
                questions,
                bgColor
              },
            })
          }
        })
      })
    )
  })
}
