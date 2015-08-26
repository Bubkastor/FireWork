'use strict';

function Rocket(option, scene){

    var spriteManagerRocket = new BABYLON.SpriteManager("rocketManager", "textures/rocket.png", 270, 70, scene);

    var rocket = new BABYLON.Sprite("rocket", spriteManagerRocket);

    rocket.position.x = option.position.x;
    rocket.position.y = 0;

    var animationRocket = new BABYLON.Animation("rocketMove", "position.y", 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

    var keys = [{
        frame: 0,
        value: -5
    },{
        frame: 100,
        value: option.position.y
    }];
    animationRocket.setKeys(keys);
    rocket.animations.push(animationRocket);

    this.start = function(calback, context){
        scene.beginAnimation(rocket, 0, 100, false);
        setTimeout(function(){
            rocket.dispose();
            calback.call(context);
        }, 800);

    }

}