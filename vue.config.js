module.exports = {
  lintOnSave: false,
  devServer:{
    port: 9090
  },
  pwa:{
    name: 'Budget Expense',
    themeColor: '#415EDE',
    manifestOptions:{
      name: 'Budget Expense',
      shortname: 'Budget Expense',
      display: 'standalone',
      theme: '#415EDE'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions:{
      swSrc: 'public/service-worker.js'
    },
  }
};
