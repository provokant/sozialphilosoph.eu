const config = {
  siteTitle: "Praesto - Philosophical paragraphs explained",
  siteTitleShort: "Praesto",
  siteTitleAlt: "GatsbyJS Starter",
  siteLogo: "images/logos/logo-1024.png",
  siteUrl: "https://localhost:8000",
  siteLanguage: "en",
  pathPrefix: "/gatsby-praesto-starter/",
  siteRss: "/rss.xml",
  siteDescription: "Selected Philosophical Writings",
  dateFromFormat: "YYYY-MM-DD",
  dateFormat: "DD/MM/YYYY",
  userLocation: "North Pole, Earth",
  themeColor: "#c62828",
  backgroundColor: "#fff",
  backgroundImage: "images/content/spiral.jpg",
  landingPageTitle: "Philosophical<br>Paragraphs<br>Explained",
  landingPageTeaser:
    "We're constantly collecting introductory material for all those interested in philosophy.<br><br><br><i><small>Easy language · Well researched · User-friendly</small></i>",
  landingPageImage: "images/content/hands.png",
  footerLogo: "images/logos/logo-1024.png",
  footerLink: "//dailysh.it",
  footerBackground: "/images/content/sky.jpg",
  questionDeny: "No, thanks",
  questionAccept: "Yes, let me read more!",
  showBackButton: true,
  showCategoryLinks: true,
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

module.exports = config;
