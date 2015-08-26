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

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.TargetCamera('camera1', new BABYLON.Vector3(0, 0, 10), scene);

        camera.setTarget(new BABYLON.Vector3(0,0,0));

        camera.attachControl(canvas, false);
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

        var wall = BABYLON.Mesh.CreatePlane("wall", 40.0, scene);
        wall.material = new BABYLON.StandardMaterial("wallMat", scene);
        wall.material.emissiveColor = new BABYLON.Color3(1, 1, 1);


        scene.onPointerDown = function (evt, pickResult) {
            if (pickResult.hit) {
                var x = pickResult.pickedPoint.x;
                var y = pickResult.pickedPoint.y;
				appInsights.trackEvent("click");
                $.connection.hub.start().done(function(){
                    connectionServer.server.send(x, y);
                });
            }
        };

        return scene;
    };

    var scene = createScene();
    connectionServer.client.broadcastMessage = function (x, y) {
        var position = new BABYLON.Vector3(x, y, 0);
        var boom = new ParticalSystem({'position': position, /*'music': new BABYLON.Sound("fireworks", "sounds/fireworks.mp3", scene,
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