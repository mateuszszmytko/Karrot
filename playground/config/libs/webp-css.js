let postcss = require('postcss')

module.exports = postcss.plugin('webp-css', () => {
  return root => {
    root.walkDecls(decl => {
      if (/\.(jpg|png)/i.test(decl.value)) {
        let rule = decl.parent;
        if (rule.selector.indexOf('.no-webp') !== -1) return;

        let webp = rule.cloneAfter()
        webp.each(i => {
          if (i.prop !== decl.prop && i.value !== decl.value) i.remove()
        })
        webp.selectors = webp.selectors.map(i => 'body.webp ' + i)
        webp.each(i => {
          i.value = i.value.replace(/\.(jpg|png)/ig, '.webp')
          i.value = i.value.replace('../assets/', 'assets/');
          i.prop = i.prop.replace('background:', 'background-image:');
          i.value = /(url\([^\)]+\))/i.exec(i.value)[0];

          if (i.prop === 'background') {
            i.prop = 'background-image';
          }
        })


        if (rule.nodes.length === 0) rule.remove()
      }
    })
  }
})