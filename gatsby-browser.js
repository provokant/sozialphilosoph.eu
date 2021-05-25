require("./src/layout/global.css");

exports.onRouteUpdate = (location) => {
  if (location.hash) {
    setTimeout(() => {
      document.querySelector(`${location.hash}`).scrollIntoView();
    }, 0);
  }
};
