const React = require('react');

const Layout = require('./src/templates/partials/Layout.js').default;

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
