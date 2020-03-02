$(window).resize(resize);
resize();

$(window).on("keydown", function (e) {
    if (!app.csvConfig.autoplay && /F10/i.test(e.key) && e.ctrlKey) {
        startDraw();
    }
});

$("#inputfile").change(function () {
    $("#inputfile").attr("hidden", true);
    var r = new FileReader();
    r.readAsText(this.files[0], config.encoding);
    r.onload = function () {
        app.csvResult = this.result;
        var customConfig = {};
        // csv自定义配置
        var result = this.result.replace(/(\n|)---[\n\r]+([\s\S]+)[\n\r]+---(\n|)/, function (s, $1, $2) {
            try {
                customConfig = jsyaml.load($2);
            } catch (e) {
                console.log([e, $2]);
            }
            return ''
        });
        app.csvConfig = Object.assign({}, customConfig);
        delete customConfig.config;
        Object.assign(config, customConfig || {});
        // csv注释
        app.csvData = d3.csvParse((result + '\n').replace(/(#(.*?)[\n\r])/g, '').replace(/[\n\r]+/g, '\n').replace(/^\s+|\s+$/g, ''));
    };
});