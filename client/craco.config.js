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
              '@menu-dark-inline-submenu-bg': '#fff',
              '@menu-dark-selected-item-text-color': 'red',
              '@segmented-selected-bg': '#469D62',
              '@segmented-label-color': '#000',
              '@segmented-label-hover-color': '#000;',
              '@radio-dot-color': '#EB743A',
              '@radio-button-hover-color': '#EB743A',
              '@radio-button-active-color': '#EB743A',
              '@layout-header-background': '#fff',
              '@switch-color': '#EB743A',

            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
