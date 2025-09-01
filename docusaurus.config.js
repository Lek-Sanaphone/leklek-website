// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lek Nammathao | LekLek',
  tagline: 'I am a Software Engineering student at the University of Technology Sydney with a strong passion for cloud, networking, and technology.',
  favicon: 'img/favicon.ico',

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://leklek.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Lek-Sanaphone', // Usually your GitHub org/user name.
  projectName: 'leklek-website', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Lek-Sanaphone/leklek-website/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,              // better caching on GitHub Pages
        indexDocs: true,           // index /docs
        indexBlog: true,           // index /blog if you use it
        indexPages: true,          // index non-doc pages
        docsRouteBasePath: ['/'],  // if your docs are served at '/', else use '/docs'
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'https://leklek.net/img/leklek-social-card.jpg',
      navbar: {
        title: 'LekLek',
        logo: {
          alt: 'My Site Logo',
          src: 'img/avatar.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Note',
          },
          {to: '/projects', label: 'Projects', position: 'left'},
          {to: '/resume', label: 'Resume', position: 'left'},
          {
            href: 'https://github.com/Lek-Sanaphone',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://resume.leklek.net',
            label: 'Resume',
            position: 'right',
          },
        ],
      },
      mermaid: {
        theme: {
          light: 'neutral', // Light mode style
          dark: 'forest',   // Dark mode style
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Note',
            items: [
              {
                label: 'Main',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/lek-sanaphone-nammathao-4aa0a3312/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Resume',
                to: '/resume',
              },
              {
                label: 'Projects',
                to: '/projects',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Lek-Sanaphone',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
