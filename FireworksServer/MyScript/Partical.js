'use strict';

var TIME_LIFE = 3000;
var TIME_REMOVE = 500;
function ParticalSystem(option,scene){
        this.option = option;
        this.rocket = new Rocket(option, scene);
        this.fountain = BABYLON.Mesh.CreateBox("point", 0.1, scene);
        this.fountain.visibility = 0.0;
        this.fountain.position = option.position || new BABYLON.Vector3(0, 0, 0);

        option.music && (this.music = option.music) ;
        option.music && this.music.attachToMesh(this.fountain);

        this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        this.particleSystem.particleTexture = option.texture || new BABYLON.Texture("textures/flare.png", scene);

        this.particleSystem.emitter = this.fountain;

        this.particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.maxEmitBox =  new BABYLON.Vector3(0, 0, 0);

        this.particleSystem.color1 = option.color1 || new BABYLON.Color4(1.0, 0.0, 0.0, 1.0);
        this.particleSystem.color2 = option.color2 || new BABYLON.Color4(1.0, 0.5, 0.0, 1.0);

        this.particleSystem.colorDead = new BABYLON.Color4(0.0, 0.0, 0.0, 0.5);

        this.particleSystem.minSize = 0.09;
        this.particleSystem.maxSize = 0.2;

        this.particleSystem.minLifeTime = option.minLifeTime || 0.3;
        this.particleSystem.maxLifeTime = option.maxLifeTime || 0.7;
        this.option.maxLifeTime =  this.particleSystem.maxLifeTime;

        this.particleSystem.emitRate = option.emitRate || 1000;

        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        this.particleSystem.gravity = new BABYLON.Vector3(0, -11, 0);

        this.particleSystem.direction1 = option.direction1 || new BABYLON.Vector3(1, 1, 0);
        this.particleSystem.direction2 = option.direction2 || new BABYLON.Vector3(-1, 1, 2);

        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;

        this.particleSystem.minEmitPower = 1;
        this.particleSystem.maxEmitPower = 5;
        this.particleSystem.updateSpeed = 0.005;
        option = null;

    var launch = function(){
        this.particleSystem.start();
        var self = this;
        setTimeout(function(){
            self.particleSystem.stop();
            setTimeout(function(){
                self.fountain.dispose();
                self.option.music && self.music.dispose();
            },TIME_LIFE + self.option.maxLifeTime);

        },TIME_REMOVE + self.option.maxLifeTime);
    };
    this.start = function(){
        this.rocket.start(launch, this);
    }
}