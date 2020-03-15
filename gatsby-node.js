exports.onCreateWebpackConfig = ({ stage, rules, loaders, actions }) => {
  switch (stage) {
    case 'build-html':
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /leaflet/,
              use: [loaders.null()]
            }
          ]
        }
      });
      break;
  }
};