const React = require('react');

const Layout = require('./src/ui/partials/Layout.js').default;

exports.wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;
