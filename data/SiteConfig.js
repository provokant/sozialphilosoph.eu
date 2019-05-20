const config = {
  siteTitle: 'Praesto - Selected philosophical writings',
  siteTitleShort: 'Praesto',
  siteTitleAlt: 'GatsbyJS Starter',
  siteLogo: 'images/logos/logo-1024.png',
  siteUrl: 'https://localhost:8000',
  siteLanguage: 'en',
  pathPrefix: '',
  siteRss: '/rss.xml',
  siteDescription: 'Selected philosophical writings',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'DD/MM/YYYY',
  userLocation: 'North Pole, Earth',
  themeColor: '#c62828',
  backgroundColor: '#fff',
  backgroundImage: 'images/content/bg.jpg',
  landingPageTitle: 'Selected<br>philosophical<br>writings',
  landingPageTeaser: 'We collect introductory material for all those interested in philosophy. Easy to read · Well researched · User-friendly',
  landingPageImage: 'images/content/hands.png',
  footerLogo: 'images/logos/logo-1024.png',
  footerBackground: '/images/content/footer.png',
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
