import nextra from "nextra";

const withNextra = nextra({
  search: {
    codeblocks: false,
  },
});

const transpilePackages = ["@zapaction/core", "@zapaction/react", "@zapaction/query"];

export default withNextra({
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  transpilePackages,
});
