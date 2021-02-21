/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, StaticQuery, graphql } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"
import Img from "gatsby-image"

import PostCard from "./post-card"

const PostMaker = ({ data }) => (
  <section className="home-posts">
    <h2>Our  <strong>Team</strong> <span class="icon -right"><RiArrowDownLine/></span></h2>

  <div class="box">
		<div class="imgBx">
    <Img
      fixed='./assets/fredrick-tendong-hvyepjyehdq-unsplash.jpg'
      objectFit="cover"
      objectPosition="50% 50%"
      alt="images"
    />

		{/* <Img fixed="./static/assets/fredrick-tendong-hvyepjyehdq-unsplash.jpg" /> */}
		</div>
		<div class="content">
			<h2>Irakoze Tititof <span> Creative Design</span></h2>
		</div>
	</div>

    <h2>Latest in <strong>Blog</strong> <span class="icon -right"><RiArrowDownLine/></span></h2>
    <div className="grids col-1 sm-2 lg-3">
      {data}
    </div>
    <Link 
      className="button" 
      to="/blog"
      sx={{
        variant: 'links.button'
      }}
    >
      See more<span class="icon -right"><RiArrowRightSLine/></span>
    </Link>

  </section>
)

export default function BlogListHome() {
  return (
    <StaticQuery 
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { template: { eq: "blog-post" } } }
            limit: 6
          ) {
            edges {
              node {
                id
                excerpt(pruneLength: 250)
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  slug
                  title
                  featuredImage {
                    childImageSharp {
                      fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
                        ...GatsbyImageSharpFluid
                        ...GatsbyImageSharpFluidLimitPresentationSize
                      }
                    }
                  }
                }
              }
            }
          }
        }`
      }

      render={ data => {
          const posts = data.allMarkdownRemark.edges
            .filter(edge => !!edge.node.frontmatter.date)
            .map(edge =>
              <PostCard key={edge.node.id} data={edge.node} />
          )
          return <PostMaker data={posts} />
        } 
      }
    />
  )
}