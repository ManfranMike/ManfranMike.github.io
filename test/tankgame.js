function loadGame() {
    gameCanvas.start(640,480);
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function (w,h) {
        this.canvas.width = w;
        this.canvas.height = h;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function Tank(x,y) {
    this.w = 30;
    this.x = x;
    this.y = y;
    ctx = gameCanvas.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.w, this.w)
}