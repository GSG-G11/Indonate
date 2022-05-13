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
              '@layout-header-background': '#fff',
              '@menu-dark-selected-item-text-color': 'red',
              '@radio-dot-color': '#EB743A',
              '@radio-button-hover-color': '#EB743A',
              '@radio-button-active-color': '#EB743A',
              '@table-header-bg': '#fff',
              '@table-header-color': '#469D62',
              '@table-border-color': '#d8d8d8',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
