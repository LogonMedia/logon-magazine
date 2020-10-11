import React from "react"
import { Link } from "gatsby"

import styles from "./ArticlePost.module.css"

export default function ArticlePost({ title, date, excerpt, slug }) {
  return (
    <article className={styles.article}>
      <h2>
        <Link to={slug}>{title}</Link>
      </h2>
      <h3>{date}</h3>
      <p>{excerpt}</p>
    </article>
  )
}
