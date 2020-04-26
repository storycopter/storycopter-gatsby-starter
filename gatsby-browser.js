const React = require('react');
// const ReactDOM = require('react-dom');

const Layout = require('./src/theme/partials/Layout.js').default;

// exports.replaceHydrateFunction = () => {
//   return (element, container, callback) => {
//     ReactDOM.render(element, container, callback);
//   };
// };

exports.wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;
