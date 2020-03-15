import React from 'react'
import GovLogo from '../images/govgr_white.svg'
import { useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <header>
      <div>
        <a href="https://www.gov.gr" className="gov-logo">
          <img src={GovLogo} alt="GOV.GR" />
        </a>
      </div>
      <div>|</div>
      <div><h1>{site.siteMetadata.title}</h1></div>
    </header>
  )
}

export default Header