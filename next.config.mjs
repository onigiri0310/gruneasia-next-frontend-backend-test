/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */

const pageConfig = {
  prefix: 'page',
  extensions: ['mdx', 'md', 'js', 'jsx', 'ts', 'tsx'],
}

const pageExtensions = pageConfig.extensions.map(
  (/** @type {string} */ extension) => `${pageConfig.prefix}.${extension}`
)

const config = {
  pageExtensions,
  reactStrictMode: true,
  swcMinify: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
