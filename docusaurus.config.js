// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// @ts-ignore
import { themes as prismThemes } from "prism-react-renderer";

// @ts-ignore
/** @type {import('@docusaurus/types').Config} */
const config = {

  customFields: {
    // 标题前缀
    titlePrefix: "主页",
    // 开始按钮文字
    start: "开始使用 🚀",
  },

  // 标题部分
  title: "Ratziel",
  titleDelimiter: "|",
  // 描述信息
  tagline: "强大的Minecraft物品与脚本定制插件",
  favicon: "img/favicon.ico",

  // @ts-ignore
  url: "https://theflooddragon.github.io",
  // @ts-ignore
  baseUrl: process.env.BASE_URL ?? '/',

  organizationName: "Altawk/TheFloodDragon",
  projectName: "Ratziel-Wiki",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans", "en"],
  },

  presets: [
    [
      "classic",
      // @ts-ignore
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/TheFloodDragon/Ratziel-Docs/tree/master/",
          showLastUpdateTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    // @ts-ignore
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Ratziel",
        logo: {
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "文档",
          },
          // 搜索框
          {
            type: "search",
            position: "right",
          },
          // Github
          {
            href: "https://github.com/TheFloodDragon/Ratziel-Docs",
            className: "header-github-link",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      // 底部信息
      footer: {
        style: "dark",
        // 底部版权信息
        copyright: `Copyright © ${new Date().getFullYear()} <b>TheFloodDragon</b>, All Rights Reserved.`,
      },
      // 深浅主题
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  themes: [
    [
      // @ts-ignore
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexBlog: false,
        docsRouteBasePath: "/",
      },
    ],
  ],
};

export default config;
