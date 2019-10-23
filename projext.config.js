module.exports = {
  targets: {
    app: {
      html: {
        template: 'index.tpl.html',
      },
    },
  },
  copy: {
    enabled: true,
    items: [
      'robots.txt',
    ],
    copyOnBuild: {
      targets: ['app'],
    },
  },
};
