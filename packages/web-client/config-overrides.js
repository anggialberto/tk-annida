const {alias} = require("react-app-rewire-alias");
module.exports = {
  override: function(config) {
    alias({
      '~assets': 'src/assets',
      '~components': 'src/components',
      '~constants': 'src/constants',
      '~helpers': 'src/helpers',
      '~hooks': 'src/hooks',
      '~http': 'src/http',
      '~pages': 'src/pages',
      '~shared': 'src/shared',
    })(config);

    return config;
  }
}