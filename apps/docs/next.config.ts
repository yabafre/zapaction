import nextra from "nextra";

const withNextra = nextra({
  search: {
    codeblocks: false,
  },
});

const transpilePackages = ["@zapaction/core", "@zapaction/react", "@zapaction/query"];

export default withNextra({
  transpilePackages,
});
