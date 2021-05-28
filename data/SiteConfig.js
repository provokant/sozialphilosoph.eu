const config = {
  backgroundColor: "#fff",
  backgroundImage: "images/content/spiral.jpg",
  copyright: "(c) 2021 - Michael Czechowski",
  dateFormat: "DD/MM/YYYY",
  dateFromFormat: "YYYY-MM-DD",
  footerBackground: "images/content/sky.jpg",
  footerLink: "//dailysh.it",
  footerLogo: "images/logos/logo-1024.png",
  landingPageImage: "images/content/hands.png",
  landingPageTeaser: "We're constantly collecting introductory material for all those interested in philosophy.<br><br><br><i><small>Easy language · Well researched · User-friendly</small></i>",
  landingPageTitle: "Philosophical<br>Paragraphs<br>Explained",
  pathPrefix: "/gatsby-praesto-starter/",
  questionAccept: "Yes, let me read more!",
  questionDeny: "No, thanks",
  showBackButton: true,
  showCategoryLinks: true,
  siteDescription: "Selected Philosophical Writings",
  siteLanguage: "en",
  siteLogo: "images/logos/logo-1024.png",
  siteRss: "/rss.xml",
  siteTitle: "Praesto - Philosophical paragraphs explained",
  siteTitleAlt: "GatsbyJS Starter",
  siteTitleShort: "Praesto",
  siteUrl: "https://localhost:8000",
  themeColor: "#c62828",
  userLocation: "North Pole, Earth",
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
