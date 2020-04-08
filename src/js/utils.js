function append() {

}
function playHead(done) {
    done()
}
function startDraw() {
    playHead(function () {
        if (app.csvData) {
            try {
                draw(app.csvData);
            } catch (error) {
                alert(error);
            }
        }
    })
}

function resize() {
    $("#svg").attr('height', $(window).height());
    $("#svg").attr('width', $(window).width());
}

function removeClass(className, class1) {
    class1 = ' ' + class1 + ' '
    className = ' ' + className + ' '
    if (className.indexOf(class1) >= 0) {
        className = className.replace(' ' + class1 + ' ', ' ')
    }
    return className.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ')
}
function addClass(className, class1) {
    if (arguments.length < 2 || typeof class1 !== 'string') {
        return className || ''
    }
    class1 = ' ' + class1 + ' '
    className = ' ' + className + ' '
    if (className.indexOf(class1) < 0) {
        className = className + ' ' +  class1
    }
    return className.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ')
}
function proxy(name, args, fn) {
    // 如果存在拦截器, 且拦截器返回了内容, 那么直接返回内容
    // 否则, 执行代理时传入的函数并返回
    if (typeof preset.interceptor === 'function') {
        var result = preset.interceptor(name, args)
        if  (result !== void 0) {
            return result
        }
    }
    return typeof fn === 'function' ? fn() : void 0
}

// 片头配置项的合并策略
function mergeTitlesConfig(base, config) {
    return proxy('mergeTitlesConfig', arguments, function() {
        base = base || preset.after.base || {}
        return Object.assign({}, base, config.titles || {})
    })
}
// 内容替换策略
// titles 是 config.titles 的合并结果
function replaceContent(content, titles, config) {
    return proxy('replaceContent', arguments, function() {
        return (titles.content || '').replace(/\{\{(\w+)\}\}/g, function (s, $1) {
            return titles[$1] || config[$1] || $1
        })
    })
}

function loadIllustration(done){
    return proxy('loadIllustration', arguments, function() {
        var config = app.csvConfig || {}
        var titles = app.currentTitles = mergeTitlesConfig(null, config)
        var className = titles.className instanceof Object ? titles.className : {}
        var container = loadIllustration.container || document.createElement('div')
        var cb = function() {
            setTimeout(function () {
                container.className = addClass(
                    removeClass(container.className, className.in),
                    className.out
                )
            }, 4e3)
            typeof done === 'function' && done()
        }
        container.className = 'illustration-container animated'
        if (titles instanceof Object) {
            var box = document.createElement('div')
            box.className = addClass(addClass('illustration-content animated', className.direct), className.in)
            box.style.cssText = titles.style || ''
            box.innerHTML = replaceContent('', titles, config)
            container.innerHTML = ''
            container.appendChild(box)
            if (!loadIllustration.container) {
                loadIllustration.container = container
                document.body.appendChild(container)
            }
            if (typeof titles.duration === 'number') {
                setTimeout(cb, titles.duration)
                return
            }
        }
        cb()
    })
}
