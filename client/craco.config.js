const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#469D62',
              '@link-color': '#469D62',
              '@border-radius-base': '2px',

            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
