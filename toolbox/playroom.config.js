const path = require('path');

module.exports = {
  components: './src/exports.ts',
  outputPath: './dist/playroom',
  title: 'Yozobi Toolbox',
  frameComponent: './.playroom/FrameComponent.tsx',
  snippets: './.playroom/snippets.ts',
  widths: [320, 375, 768, 1024],
  port: 9000,
  openBrowser: true,
  exampleCode: `
    <ButtonBase>
      Hello World!
    </ButtonBase>
  `,
  webpackConfig: (config) => {
    return {
      resolve: {
        mainFields: ['browser', 'main', 'module'],
        extensions: ['.js', '.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-typescript',
                    '@babel/preset-react',
                    '@babel/preset-env',
                  ],
                },
              },
            ],
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: path.resolve(__dirname, './postcss.config.js'),
                  },
                },
              },
            ],
          },
        ],
      },
    };
  },
};
