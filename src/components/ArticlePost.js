import React from "react"

import styles from "./ArticlePost.module.css"

export default function ArticlePost({ title, date, excerpt }) {
  return (
    <article className={styles.article}>
      <h2>{title}</h2>
      <h3>{date}</h3>
      <p>{excerpt}</p>
    </article>
  )
}
