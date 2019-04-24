const config = {
  siteTitle: 'Praesto - GatsbyJS Starter', // Site title.
  siteTitleShort: 'Praesto', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: 'GatsbyJS Starter', // Alternative site title for SEO.
  siteLogo: 'images/logos/logo-1024.png', // Logo used for SEO and manifest.
  siteUrl: 'https://localhost:8000', // Domain of your website without pathPrefix.
  pathPrefix: '', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteDescription: 'Praesto - Flat-File (Content Management) System for advanced developers based on GatsbyJS', // Website description used for RSS feeds/meta description tag.
  dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
  dateFormat: 'DD/MM/YYYY', // Date format for display.
  userLocation: 'North Pole, Earth', // User location to display in the author segment.
  themeColor: '#c62828', // Used for setting manifest and progress theme colors.
  backgroundColor: '#fff', // Used for setting manifest background color.
  landingPageTitle: 'praesto Starter-Kit',
  landingPageTeaser: 'Flat-File CMS (Content Management System) based on GatsbyJS for advanced developers',
  landingPageImage: 'images/content/hands.png',
  footerLogo: 'images/logos/nls.svg'
}

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/')
  config.siteUrl = config.siteUrl.slice(0, -1)

module.exports = config
