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
              '@pagination-item-bg-active': '#469D62',
              '@pagination-item-link-bg': '#469D62',
              '@pagination-item-bg': '#469D62',
              '@pagination-item-disabled-color-active': '#469D62',
              '@pagination-item-disabled-bg-active': '#469D62',
              '@pagination-item-input-bg': '#469D62',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
