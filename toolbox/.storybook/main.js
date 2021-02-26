const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.tsx',
    '../src/**/*.stories.jsx',
    '../src/**/*.stories.js',
  ],
  addons: ['@storybook/addon-a11y/register', '@storybook/addon-knobs/register'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules.push({
      test: /\.css$/,
      loaders: [
        {
          loader: 'postcss-loader',
        },
      ],

      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
};
