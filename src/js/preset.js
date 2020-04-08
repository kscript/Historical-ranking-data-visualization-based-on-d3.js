var funcs = {
  loadIllustration: function() {
    var num = config.max_number < 15 ? 15 : 30 - config.max_number
    var style = funcs.loadIllustration.style || document.createElement("style")
    if (!funcs.loadIllustration.style) {
      document.body.className = addClass(document.body.className, 'max-' + num)
      funcs.loadIllustration.style = style
      document.head.appendChild(style)
    }
    style.innerHTML = '.max-' + num + ' circle { r: ' + (num - 1) + 'px; cy: ' + (num - 1) + '; cx: -' + (num + 1) + '; }'
  },
  mergeTitlesConfig: function() {
    
  },
  replaceContent: function(content, titles, conf) {
    if (/迁入|迁出/.test(conf.filename)) {
      return (titles.content || '').replace(/\{\{(\w+)\}\}/g, function (s, $1) {
        if ($1 === 'title') {
          if (conf.filename.indexOf('分省') < 0) {
            return '2020年第一季度</h1><h1>' + conf.itemLabel.split(' ')[0] + '排行(城市前' + config.max_number + ')'
          } else {
            return '2020年第一季度</h1><h1>' + conf.itemLabel.split(' ')[0] + '排行(省级前' + config.max_number + ')'
          }
        }
        return titles[$1] || conf[$1] || $1
      })
    }
  },
}
var preset = {
  before: {

  },
  after: {
    base: {
      className: {
        direct: "",
        out: "bounceOut",
        in: "bounceIn",
      },
      duration: 6000,
      content: "<h1>{{title}}</h1>\
        <p>数据来源: {{source}}<br>可视化模板来自: {{template}}</p>\
        <p>制作人: <span style=\"color: #f40;\">{{author}}</span></p>"
    }
  },
  interceptor: function(name, args) {
    if (funcs[name]) {
      return funcs[name].apply(this, args)
    }
  }
}
