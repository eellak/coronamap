module.exports = {
  siteMetadata: {
    title: `Χάρτης εξάπλωσης COVID-19 - Eλλάδα`,
    description: `Στην σελίδα μπορείς να ενημερωθείς για τον αριθμό, την κατάσταση και την γεωγραφική κατανομή των κρουσμάτων κορονοϊού στην ελληνική επικράτεια. #κορονοιος`,
    author: ``
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#17171a`,
        theme_color: `#696dff`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  proxy: {
    prefix: "/corona-map",
    url: "https://storage.googleapis.com",
  },
}
