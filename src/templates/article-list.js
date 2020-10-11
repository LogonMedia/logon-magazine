import React from "react"
import { graphql, Link } from "gatsby"

import ArticlePost from "../components/ArticlePost"
import Layout from "../components/Layout"
import styles from "./article-list.module.css"

export default function ArticleListTemplate({ data, pageContext }) {
  // Generate the previous and next page URLs.
  const previousPage =
    pageContext.currentPage === 2
      ? "/article"
      : `/article/${pageContext.currentPage - 1}`
  const nextPage = `/article/${pageContext.currentPage + 1}`

  return (
    <Layout>
      <div id={styles.hero}>
        <h1>LOGON Media</h1>
      </div>
      <main className={styles.articleList}>
        {data.allMarkdownRemark.edges.map(node => (
          <ArticlePost
            key={node.node.id}
            slug={node.node.fields.slug}
            title={node.node.frontmatter.title}
            date={node.node.frontmatter.date}
            excerpt={node.node.excerpt}
          />
        ))}
      </main>

      <div id={styles.pageLinks}>
        {pageContext.currentPage > 1 && (
          <Link to={previousPage}>Previous Page</Link>
        )}

        {pageContext.currentPage < pageContext.pageCount && (
          <Link to={nextPage}>Next Page</Link>
        )}
      </div>
    </Layout>
  )
}

// The page query.
export const query = graphql`
  query ArticleListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { contentKey: { eq: "article" } } }
      limit: $limit
      skip: $skip
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
`
