import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { siteDescription, siteTitleShort } from '../../../data/SiteConfig'
import './Header.scss'

const classNames = {
  default: 'block text-center mt-0 py-3',
  get defaultLink() {
    return `${this.default} md:text-left md:inline-block`
  },
  get link() {
    return `${this.defaultLink} pl-3 lg:pr-3`
  },
  get brand() {
    return `${this.defaultLink} lowercase font-bold tracking-wide md:mr-8`
  }
}

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu
    }))
  }

  render() {
    const { showMenu } = this.state
    const { menuList, isLandingPage } = this.props

    const brandLink = (
      <Link to="/" className={classNames.brand}>{siteTitleShort}</Link>
    )

    const menuLinks = menuList.map(({ fields, frontmatter }) => (
      <Link
        to={fields.slug}
        key={fields.slug}
        className={classNames.link}
        activeStyle={{
          color: fields.hasChildren ? frontmatter.bgColor : ``
        }}
        partiallyActive
      >
        {frontmatter.title}
      </Link>
    ))

    const mobileMenu = (
      <div className="mobile-menu">
        {menuLinks}
      </div>
    )

    const headerClassNames = `header ${showMenu ? `fixed` : ``} ${isLandingPage ? `dark` : ``}`

    return (
      <header className={headerClassNames}>
        <nav className="container">
          <div className="outer">
            <div className="inner">
              {brandLink}
              <div className="hidden md:block">
                {menuLinks}
              </div>
            </div>
            <div className="description">
              {siteDescription}
            </div>
            <div className="mobile-toggle">
              <button type="button" onClick={this.toggleMenu}>
                <span>{showMenu ? `CLOSE MENU` : `NAVIGATE`}</span>
                {showMenu ? `✕` : `☰`}
              </button>
            </div>
          </div>
          {showMenu && mobileMenu}
        </nav>
      </header>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query HeaderMenuQuery {
        menuList: allMarkdownRemark(
          sort: { fields: [fields___sort], order: ASC }
          filter: {
            fields: { isActive: { eq: true }, onHeaderMenu: { eq: true } }
          }
        ) {
          nodes {
            frontmatter {
              title
              bgColor
            }
            fields {
              hasChildren
              slug
            }
          }
        }
      }
    `}
    render={({ menuList }) => <Header menuList={menuList.nodes} {...props} />}
  />
)

Header.propTypes = {
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        hasChildren: PropTypes.bool.isRequired
      }).isRequired,
    }),
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  isLandingPage: PropTypes.bool
}

Header.defaultProps = {
  isLandingPage: false
}
