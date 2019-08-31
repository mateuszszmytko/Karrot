require('es6-shim');

if (!window.fetch) {
  require('whatwg-fetch');
}
