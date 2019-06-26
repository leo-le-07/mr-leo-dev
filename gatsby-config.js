const path = require('path')

let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) { }

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: `Mr Leo`,
    author: `Mr Leo`,
    description: `Mr Leo blog and portfolio`,
    siteUrl: `https://www.mrleo.dev`,
  },
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
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `https-www-mrleo-dev`,
      },
    },
  ],
}
