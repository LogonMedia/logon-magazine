const path = require("path")

const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = function({ node, getNode, actions }) {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async function({ graphql, actions }) {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              contentKey
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges.filter(
    edge => edge.node.frontmatter.contentKey === "article"
  )
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/article.js"),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  const pageSize = 4
  const pageCount = Math.ceil(posts.length / pageSize)
  const templatePath = path.resolve("src/templates/article-list.js")

  for (let i = 0; i < pageCount; i++) {
    let path = "/article"
    if (i > 0) {
      path += `/${i + 1}`
    }

    createPage({
      path,
      component: templatePath,
      context: {
        limit: pageSize,
        skip: i * pageSize,
        pageCount,
        currentPage: i + 1,
      },
    })
  }
}
