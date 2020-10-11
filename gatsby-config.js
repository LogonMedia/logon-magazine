module.exports = {
  siteMetadata: {
    title: "LOGON Magazine",
  },

  plugins: [
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "article",
        path: "src/article",
      },
    },
    "gatsby-transformer-remark",
  ],
}
