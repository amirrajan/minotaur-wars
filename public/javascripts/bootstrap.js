window.Tactics = Tactics = {
    Models:{},
    Collections:{},
    emitter: LucidJS.emitter()
};

(function () {

    var bootstrap = {

        go: function (canvas, c) {
            var map = Tactics.Map;

            var emitter = Tactics.emitter;

            Tactics.Assets.load(emitter, c);
            
            emitter.on('assets-loaded', function () {
                map.init(canvas, c, emitter);
                animloop();
            });

            emitter.on('debug:show-grid', function(on){
                map.showCoordinates = on;
            })

            emitter.on('move', function (data) {
                map.selectedCell = { row: data.x, column: data.y };
            })

            emitter.on('attack', function(data){
                alert('attacked');
            })

            setInterval(function () {
                map.update();
            }, 200);



            window.requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
            })();

            function animloop() {
                requestAnimFrame(animloop);
                map.draw();
            };
        }
    }

    Tactics.Bootstrap = bootstrap;
})();
