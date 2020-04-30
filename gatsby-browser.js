import React from 'react';
import Layout from './src/ui/partials/Layout';

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;
