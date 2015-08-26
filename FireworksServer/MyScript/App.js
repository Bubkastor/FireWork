'use strict';

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

document.addEventListener('DOMContentLoaded', start, false);

function start(){
    var connectionServer = $.connection.clientHub;

    UserCount(connectionServer);
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    var scene = Scena(engine, canvas);

    scene.onPointerDown = function (evt, pickResult) {
        if (pickResult.hit) {
            var x = pickResult.pickedPoint.x;
            var y = pickResult.pickedPoint.y;
            appInsights.trackEvent("click");
            $.connection.hub.start().done(function () {
                connectionServer.server.send(x, y);
            });
        }
    };
    connectionServer.client.broadcastMessage = function (x, y) {
        var position = new BABYLON.Vector3(x, y, 0);
        var boom = new ParticalSystem({'position': position/*, 'music': new BABYLON.Sound("fireworks", "sounds/fireworks.mp3", scene,
            function(){
                console.log('Sound loaded')
            },{ autoplay: true})*/
        }, scene);
        boom.start();
    };

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener('resize', function () {
        engine.resize();
    });

}