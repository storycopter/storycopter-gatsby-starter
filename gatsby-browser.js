const React = require('react');

const Layout = require('./src/ui/partials/Layout.js').default;

// exports.onClientEntry = () => {
//   // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
//   if (!(`IntersectionObserver` in window)) {
//     import(`intersection-observer`);
//     // console.log(`# IntersectionObserver is polyfilled!`);
//   }
// };

exports.wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;
