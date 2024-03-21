import * as THREE from 'three'
import Component from '../../Component'
import Input from '../../Input'
import {Ammo, AmmoHelper, CollisionFilterGroups} from '../../AmmoLib'

import WeaponFSM from './WeaponFSM';


export default class Weapon extends Component{
    constructor(camera, world,
                // shotSoundBuffer, listner
    ){
        super();
        this.name = 'Weapon';
        this.camera = camera;
        this.world = world;
        this.shoot = false;
        this.fireRate = 0.1;
        this.shootTimer = 0.0;

        // this.shotSoundBuffer = shotSoundBuffer;
        // this.audioListner = listner;

        this.magAmmo = 2;
        this.ammoPerMag = 1;
        this.ammo = 0;
        this.damage = 2;
        this.uimanager = null;
        this.reloading = false;
        this.hitResult = {intersectionPoint: new THREE.Vector3(), intersectionNormal: new THREE.Vector3()};

    }

    SetSoundEffect(){
        // this.shotSound = new THREE.Audio(this.audioListner);
        // this.shotSound.setBuffer(this.shotSoundBuffer);
        // this.shotSound.setLoop(false);
    }

    AmmoPickup = (e) => {
        this.ammo += 1;
        this.uimanager.SetAmmo(this.magAmmo, this.ammo);
    }

    Initialize(){
        // this.SetSoundEffect();

        this.stateMachine = new WeaponFSM(this);
        this.stateMachine.SetState('idle');

        this.uimanager = this.FindEntity("UIManager").GetComponent("UIManager");
        this.uimanager.SetAmmo(this.magAmmo, this.ammo);

        this.SetupInput();

        //Listen to ammo pickup event
        this.parent.RegisterEventHandler(this.AmmoPickup, "AmmoPickup");
    }

    SetupInput(){
        Input.AddMouseDownListner( e => {
            if(e.button != 0 || this.reloading){
                return;
            }

            this.shoot = true;
            this.shootTimer = 0.0;
        });

        Input.AddMouseUpListner( e => {
            if(e.button != 0){
                return;
            }

            this.shoot = false;
        });

        Input.AddKeyDownListner(e => {
            if(e.repeat) return;

            if(e.code == "KeyR"){
                this.Reload();
            }
        });
    }

    Reload(){
        if(this.reloading || this.magAmmo == this.ammoPerMag || this.ammo == 0){
            return;
        }

        this.reloading = true;
        // this.stateMachine.SetState('reload');
    }

    ReloadDone(){
        this.reloading = false;
        const bulletsNeeded = this.ammoPerMag - this.magAmmo;
        this.magAmmo = Math.min(this.ammo + this.magAmmo, this.ammoPerMag);
        this.ammo = Math.max(0, this.ammo - bulletsNeeded);
        this.uimanager.SetAmmo(this.magAmmo, this.ammo);
    }

    Raycast(){
        const start = new THREE.Vector3(0.0, 0.0, -1.0);
        start.unproject(this.camera);
        const end = new THREE.Vector3(0.0, 0.0, 1.0);
        end.unproject(this.camera);

        const collisionMask = CollisionFilterGroups.AllFilter & ~CollisionFilterGroups.SensorTrigger;

        if(AmmoHelper.CastRay(this.world, start, end, this.hitResult, collisionMask)){
            const ghostBody = Ammo.castObject( this.hitResult.collisionObject, Ammo.btPairCachingGhostObject );
            const rigidBody = Ammo.castObject( this.hitResult.collisionObject, Ammo.btRigidBody );
            const entity = ghostBody.parentEntity || rigidBody.parentEntity;

            entity && entity.Broadcast({'topic': 'hit', from: this.parent, amount: this.damage, hitResult: this.hitResult});
        }
    }

    Shoot(t){
        if(!this.shoot){
            return;
        }

        if(!this.magAmmo){
            //Reload automatically
            this.Reload();
            return;
        }

        if(this.shootTimer <= 0.0 ){
            //Shoot
            this.shootTimer = this.fireRate;
            this.magAmmo = Math.max(0, this.magAmmo - 1);
            this.uimanager.SetAmmo(this.magAmmo, this.ammo);

            this.Raycast();
            this.Broadcast({topic: 'ak47_shot'});

            // this.shotSound.isPlaying && this.shotSound.stop();
            // this.shotSound.play();
        }

        this.shootTimer = Math.max(0.0, this.shootTimer - t);
    }

    Update(t){
        this.stateMachine.Update(t);
        this.Shoot(t);
    }

}
