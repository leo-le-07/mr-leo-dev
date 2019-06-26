import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styled from 'styled-components'
import Image from 'gatsby-image'

import Layout from '@components/Layout'
import Seo from '@components/Seo'
import RecentPost from '@components/RecentPost'
import Disqus from 'gatsby-plugin-disqus'

interface IRecentPost {
  title: string
  slug: string
  publishedDate: string
  heroImage: {
    sizes: {
      aspectRatio: number,
      src: string,
      srcSet: string,
      sizes: string,
    }
  }
}

interface IProps {
  pageContext: {
    slug: string
  }
  location: ILocation
  data: {
    postDetails: {
      title: string
      slug: string
      publishedDate: string
      description: string
      heroImage: {
        sizes: {
          aspectRatio: number,
          src: string,
          srcSet: string,
          sizes: string,
        }
      }
    }
  }
}

const StyledContainer = styled.div`
  .header-container {
    h1 {
      margin-top: 0;
    }

    .published-date {
      ${props => ({ ...props.theme.scale(-0.5) })}
      margin-top: ${props => props.theme.rhythm(-0.75)};
      color: ${props => props.theme.colors.gray600};
    }
  }

  .hero-image {
    margin: ${props => props.theme.rhythm(1.25)} 0;
  }

  .body-container {
    margin-bottom: ${props => props.theme.rhythm(4.25)};

    blockquote {
      ${props => ({ ...props.theme.scale(0.5) })}
      border-left-color: ${props => props.theme.colors.primary};
    }

    img {
      width: 100%;
    }

    .md-figure {
      figcaption {
        text-align: center;
        font-style: italic;

        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  }

  .recent-posts-container {
    .title {
      text-transform: uppercase;
      position: relative;
      padding-left: ${props => props.theme.rhythm(3 / 4)};

      &::before {
        content: '';
        background-color: ${props => props.theme.colors.primary};
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .recent-post {
        width: 33.3333%;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .recent-posts-container {
      .list {
        display: block;

        .recent-post {
          width: 100%;
        }
      }
    }
  }
`

class BlogPostTemplate extends React.Component<IProps, {}> {
  render() {
    const post = get(this.props, 'data.postDetails')
    const recentPosts = get(this.props, 'data.recentPosts.edges')
    const siteConfig = get(this.props, 'data.site.siteMetadata')

    return (
      <Layout location={this.props.location}>
        <StyledContainer>
          <Seo title={post.title} />
          <div className="header-container">
            <h1>{post.title}</h1>
            <div className="published-date">
              {post.publishedDate}
            </div>
            <div className="hero-image">
              <Image sizes={post.heroImage.sizes} alt="" />
            </div>
          </div>
          <div className="body-container"
            dangerouslySetInnerHTML={{ __html: post.body.childMarkdownRemark.html }}
          />
          <div className="recent-posts-container">
            <h1 className="title">Recent Posts</h1>
            <div className="list">
              {recentPosts.map(({ node }: { node: IRecentPost }) => (
                <div className="recent-post" key={node.slug}>
                  <RecentPost
                    title={node.title}
                    publishedDate={node.publishedDate}
                    heroImage={node.heroImage}
                    slug={node.slug}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="comment-container">
            <Disqus
              identifier={post.slug}
              title={post.title}
              url={`${siteConfig.siteUrl}${this.props.location.pathname}`}
            />
          </div>
        </StyledContainer>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    postDetails: contentfulBlogPost(slug: { eq: $slug }) {
      title
      description
      heroImage {
        sizes(maxWidth: 700, maxHeight: 349, resizingBehavior: SCALE) {
          ...GatsbyContentfulSizes_withWebp
        }
      }
      slug
      publishedDate(formatString: "MMM DD, YYYY")
      tags
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    recentPosts: allContentfulBlogPost(
      sort: { fields: [publishedDate], order: DESC }
      filter: {
        slug: { ne: $slug }
      }
      limit: 6
    ) {
      edges {
        node {
          slug
          title
          publishedDate(formatString: "MMM DD, YYYY")
          heroImage {
            sizes(maxWidth: 192, maxHeight: 120, resizingBehavior: SCALE) {
             ...GatsbyContentfulSizes_withWebp
            }
          }
        }
      }
    }
  }
`
