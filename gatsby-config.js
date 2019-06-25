const path = require('path')

module.exports = {
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          "@pages": path.resolve(__dirname, 'src/pages'),
          "@components": path.resolve(__dirname, 'src/components'),
          "@utils": path.resolve(__dirname, 'src/utils'),
          "@constants": path.resolve(__dirname, 'src/constants'),
          "@templates": path.resolve(__dirname, 'src/templates'),
          "@static": path.resolve(__dirname, 'src/static'),
        },
        extensions: [],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.ts`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mr Leo`,
        short_name: `mrleo`,
        start_url: `/`,
        background_color: `#222`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `static/icon.png`,
      },
    },
    `gatsby-plugin-offline`
  ]
}
