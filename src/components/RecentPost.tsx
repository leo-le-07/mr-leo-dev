import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

interface IProps {
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

const StyledContainer = styled.div`
  margin-bottom: ${props => props.theme.rhythm(1.25)};

  article {
    padding-right: ${props => props.theme.rhythm(1)};

    .thumb {
      img {
        border: 1px solid rgba(0, 0, 0, .15);
      }
    }

    .content {
      padding: 0 ${props => props.theme.rhythm(0.5)} 0 0;
    }

    .info {
      ${props => ({ ...props.theme.scale(-0.5) })}
      color: ${props => props.theme.colors.gray500};
    }
  }

  a {
    text-shadow: none;
    background-image: none;
  }

  @media only screen and (max-width: 767px) {
    article {
      display: block;
      padding-right: 0;

      .thumb {
        width: 100%;
        padding-right: 0;
        height: ${props => props.theme.rhythm(7)};

        img {
          height: ${props => props.theme.rhythm(7)} !important;
          width: 100%;
        }
      }

      .content {
        width: 100%;
        padding: 0;
        margin-bottom: ${props => props.theme.rhythm(1.25)};
      }
    }
  }
`

const RecentPost = (props: IProps) => {
  const {
    slug,
    heroImage,
    title,
    publishedDate,
  } = props

  return (
    <StyledContainer>
      <article>
        <Link to={`/${slug}`}>
          <div className="thumb">
            <Image sizes={heroImage.sizes} alt="" />
          </div>
          <div className="content">
            <h2>{title}</h2>
            <div className="info">{publishedDate}</div>
          </div>
        </Link>
      </article>
    </StyledContainer>
  )
}

export default RecentPost
