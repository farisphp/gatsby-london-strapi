import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
import "../assets/css/homepage.css"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.strapiHomepage.hero.title
  const posts = data.allStrapiArticle.edges
  let postCounter = 0

  return (
    <Layout title={siteTitle}>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      {/* <Bio /> */}
      <section className="video-container">
        <div className="video-player">
          <video
            playsInline={true}
            autoPlay={true}
            loop={true}
            muted
            style={{ zIndex: -1, position: "absolute" }}
            poster={
              data.strapiHomepage.videoThumbnail.localFile.childImageSharp.fluid
                .src
            }
          >
            <source
              src={data.strapiHomepage.video.localFile.publicURL}
              type="video/mp4"
            />
          </video>
        </div>
        {data.strapiHomepage.seo.metaDescription && (
          <header className="page-head">
            <h2
              className="page-head-title"
              style={{ color: data.strapiHomepage.hero.descriptionColor }}
            >
              {data.strapiHomepage.seo.metaDescription}
            </h2>
          </header>
        )}
      </section>

      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    strapiHomepage {
      hero {
        title
        descriptionColor
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          localFile {
            publicURL
          }
        }
      }
      video {
        localFile {
          publicURL
        }
      }
      videoThumbnail {
        localFile {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allStrapiArticle {
      edges {
        node {
          strapiId
          slug
          title
          category {
            name
          }
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          author {
            name
            picture {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 30, height: 30)
                }
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default (props) => (
  <StaticQuery
    query={indexQuery}
    render={(data) => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
