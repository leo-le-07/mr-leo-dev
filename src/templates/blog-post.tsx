import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styled from 'styled-components'
import Image from 'gatsby-image'

import Layout from '@components/Layout'
import Seo from '@components/Seo'

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
    blockquote {
      ${props => ({ ...props.theme.scale(0.5) })}
      border-left-color: ${props => props.theme.colors.primary};
    }

    img {
      width: 100%;
    }
  }
`

class BlogPostTemplate extends React.Component<IProps, {}> {
  render() {
    const post = get(this.props, 'data.postDetails')

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
        </StyledContainer>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
  }
`
