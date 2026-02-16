const themeConfig = {
  darkMode: true,
  docsRepositoryBase: "https://github.com/yabafre/zapaction/tree/main/apps/docs",
  editLink: "Suggest an edit",
  feedback: {
    content: "Question? Give feedback",
    labels: "docs-feedback",
  },
  navigation: {
    next: true,
    prev: true,
  },
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
    defaultOpen: true,
    toggleButton: true,
  },
  i18n: [
    { locale: "en", name: "English" },
    { locale: "fr", name: "Francais" },
  ],
  toc: {
    title: "On this page",
    backToTop: "Back to top",
    float: true,
  },
  themeSwitch: {
    dark: "Dark",
    light: "Light",
    system: "System",
  },
};

export default themeConfig;
