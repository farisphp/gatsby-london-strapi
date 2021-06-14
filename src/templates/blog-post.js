import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Markdown from "react-markdown"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.strapiArticle
    const siteTitle = this.props.data.strapiHomepage.hero.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.title} description={post.description} />
        <article
          className={`post-content ${post.image.localFile || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.title}</h1>
          </header>

          {post.description && (
            <p class="post-content-excerpt">{post.description}</p>
          )}

          {post.image.localFile && (
            <div className="post-content-image">
              <Img
                className="kg-image"
                fluid={post.image.localFile.childImageSharp.fluid}
                alt={post.title}
              />
            </div>
          )}

          <div
            className="post-content-body"
            // dangerouslySetInnerHTML={{ __html: post.content }}
          >
            <Markdown children={post.content} allowDangerousHtml={true} />
          </div>

          <footer className="post-content-footer">
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    strapiHomepage {
      hero {
        title
      }
      seo {
        metaTitle
        metaDescription
      }
    }
    strapiArticle(slug: { eq: $slug }) {
      strapiId
      slug
      title
      description
      content
      published_at
      image {
        localFile {
          publicURL
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
`
