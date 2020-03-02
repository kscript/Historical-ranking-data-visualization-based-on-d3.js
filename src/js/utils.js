function startDraw() {
    if (app.csvData) {
        try {
            draw(app.csvData);
        } catch (error) {
            alert(error);
        }
    }
}

function resize() {
    $("#svg").attr('height', $(window).height());
    $("#svg").attr('width', $(window).width());
}