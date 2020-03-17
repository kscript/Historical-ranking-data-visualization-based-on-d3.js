function append() {

}
function playHead(done){
    done()
}
function startDraw() {
    playHead(function(){
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