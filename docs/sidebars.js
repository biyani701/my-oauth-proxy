/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [{ type: 'autogenerated', dirName: '.' }],
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [
  //   {
  //     type: 'category',
  //     label: 'Getting Started',
  //     items: ['intro', 'installation', 'configuration'],
  //   },
  //   {
  //     type: 'category',
  //     label: 'Architecture',
  //     items: ['architecture', 'client-identification', 'credential-management'],
  //   },
  //   {
  //     type: 'category',
  //     label: 'API Reference',
  //     items: ['api', 'auth-config', 'auth-handlers'],
  //   },
  //   {
  //     type: 'category',
  //     label: 'Guides',
  //     items: ['github-setup', 'google-setup', 'multiple-clients'],
  //   },
  //   {
  //     type: 'category',
  //     label: 'Deployment',
  //     items: ['vercel-deployment', 'environment-variables'],
  //   },
  // ],
};

export default sidebars;
