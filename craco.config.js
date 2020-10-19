const CracoLessPlugin = require(`craco-less`)

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': `#70bf58`,
              '@link-color': `#70bf58`,
              '@success-color': `#70bf58`,
              '@warning-color': `#faad14`,
              '@error-color': `#f5222d`,
              '@font-size-base': `16px`,
              '@processing-color': `#70bf58`,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
