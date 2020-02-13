const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-a11y/register'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
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
