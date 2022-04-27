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
              '@segmented-bg': 'fade(@black, 2%)',
              '@segmented-hover-bg': 'fade(@black, 2%)',
              '@segmented-selected-bg': '#EB743A',
              '@segmented-label-color': 'fade(@black, 65%)',
              '@segmented-label-hover-color': '#262626;',
              '@radio-dot-color': '#EB743A',
              '@radio-button-hover-color': '#EB743A',
              '@radio-button-active-color': '#EB743A',
              '@layout-header-background': '#fff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
