const postcssImport = require('postcss-import');
const path = require('path');
const precss = require('precss');
const tailwindcss = require('tailwindcss')('./tailwind.config.js');
const cssnano = require('cssnano')({
  preset: ['default', { discardComments: { removeAll: true } }],
});
const autoprefixer = require('autoprefixer');

module.exports = {
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
  style: {
    postcss: {
      plugins: [
        postcssImport,
        tailwindcss,
        precss,
        ...(process.env.NODE_ENV === 'production' ? [cssnano] : []),
        autoprefixer,
      ],
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const currentInclude = webpackConfig.module.rules[2].oneOf[1].include;
      webpackConfig.module.rules[2].oneOf[1].include = [
        currentInclude,
        path.resolve(__dirname, '../toolbox/src'),
      ];
      webpackConfig.module.rules[2].oneOf[4].use.splice(
        1,
        0,
        'css-modules-typescript-loader',
      );
      return webpackConfig;
    },
  },
};
