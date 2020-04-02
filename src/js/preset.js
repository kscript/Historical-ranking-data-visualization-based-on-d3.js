var funcs = {
  mergeTitlesConfig: function() {
    
  },
  replaceContent: function(content, titles, config) {
    console.log(titles, config)
    if (/迁入|迁出/.test(config.filename)) {
      return (titles.content || '').replace(/\{\{(\w+)\}\}/g, function (s, $1) {
        if ($1 === 'title') {
          if (config.filename.indexOf('分省') < 0) {
            return config.itemLabel.slice(0, -4) + '(城市排行前10)'
          } else {
            return config.itemLabel.slice(0, -4) + '(省级排行前10)'
          }
        }
        return titles[$1] || config[$1] || $1
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
        in: "bounceInDown",
      },
      duration: 10000,
      content: "<h1>{{title}}</h1>\
        <p>数据来源: 百度迁徙<br>可视化模板来自: Jannchie</p>\
        <p>制作人: <span style=\"color: #f40;\">bili路人bili</span></p>"
    }
  },
  interceptor: function(name, args) {
    if (funcs[name]) {
      return funcs[name].apply(this, args)
    }
  }
}
