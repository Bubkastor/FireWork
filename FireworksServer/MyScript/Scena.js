'use strict';

function Scena(engine, canvas) {
    var scene = new BABYLON.Scene(engine, canvas);

    var camera = new BABYLON.TargetCamera('camera1', new BABYLON.Vector3(0, 0, 10), scene);

    camera.setTarget(new BABYLON.Vector3(0, 0, 0));

    camera.attachControl(canvas, false);
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    var wall = BABYLON.Mesh.CreatePlane("wall", 40.0, scene);
    wall.material = new BABYLON.StandardMaterial("wallMat", scene);
    wall.material.emissiveColor = new BABYLON.Color3(1, 1, 1);




    return scene;
}