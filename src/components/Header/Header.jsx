import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { siteDescription, siteTitleShort } from '../../../data/SiteConfig'
import './Header.scss'

const classNames = {
  default: 'block text-center mt-0 py-3',
  get defaultLink() {
    return `${this.default} md:text-left md:inline-block text-grey-darkest hover:text-black`
  },
  get link() {
    return `${this.defaultLink} px-3`
  },
  get brand() {
    return `${this.defaultLink} lowercase font-bold tracking-wide text-black md:mr-8`
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
    const { menuList } = this.props

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
      <div className="fixed flex flex-col justify-center pin-l pin-t pin-r pin-b bg-white z-10">
        {menuLinks}
      </div>
    )

    return (
      <header className={showMenu ? `header fixed` : `header`}>
        <nav className="container">
          <div className="text-sm w-full block flex-grow justify-between flex items-center w-auto z-20">
            <div className="flex">
              {brandLink}
              <div className="hidden md:block">
                {menuLinks}
              </div>
            </div>
            <div className="text-grey italic hidden xl:block">
              {siteDescription}
            </div>
            <div className="block md:hidden">
              <button type="button" className="text-grey-dark tracking-wide hover:text-black" onClick={this.toggleMenu}>
                <span className="mr-2">{showMenu ? `CLOSE MENU` : `NAVIGATE`}</span>
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

export default () => (
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
    render={({ menuList }) => <Header menuList={menuList.nodes} />}
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
}
