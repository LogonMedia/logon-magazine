import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import ArticlePost from "./ArticlePost"

export default function ArticleList() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { contentKey: { eq: "article" } } }
        limit: 4
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM D, YYYY")
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `)

  return (
    <div>
      {data.allMarkdownRemark.edges.map(edge => (
        <ArticlePost
          key={edge.node.div}
          slug={edge.node.fields.slug}
          title={edge.node.frontmatter.title}
          date={edge.node.frontmatter.date}
          excerpt={edge.node.excerpt}
        />
      ))}
      <div>
        <Link to="/article">More >></Link>
      </div>
    </div>
  )
}
