import * as THREE from 'three'
import Component from '../../Component'
import Input from '../../Input'
import {Ammo, AmmoHelper, CollisionFilterGroups} from '../../AmmoLib'

import InventoryFSM from './InventoryFSM';


export default class Inventory extends Component{
    constructor(camera, world,
    ){
        super();
        this.name = 'Inventory';
        this.camera = camera;
        this.world = world;

        this.inventory = [];
        this.uimanager = null;
        this.hitResult = {intersectionPoint: new THREE.Vector3(), intersectionNormal: new THREE.Vector3()};

    }

    AmmoPickup = (e) => {
        // TODO remove this handler
        this.inventory.push(e.item);
        this.uimanager.SetItemCount(this.inventory.length);
    }

    ItemPickup = (e) => {
        this.inventory.push(e.item)
        this.uimanager.SetItemCount(this.inventory.length);
    }

    Initialize(){

        // TODO maybe delete this, or use it for menu
        this.stateMachine = new InventoryFSM(this);
        this.stateMachine.SetState('idle');

        this.uimanager = this.FindEntity("UIManager").GetComponent("UIManager");

        this.SetupInput();

        //Listen to item pickup event
        this.parent.RegisterEventHandler(this.AmmoPickup, "AmmoPickup");
        this.parent.RegisterEventHandler(this.ItemPickup, "ItemPickup");
    }

    SetupInput(){
        Input.AddMouseDownListner( e => {
            if(e.repeat) return;


            this.Raycast();
        });

        Input.AddKeyDownListner(e => {
            if(e.repeat) return;

            if(e.code == "KeyR"){
                this.Reload();
            }
        });
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

            entity && entity.Broadcast({'topic': 'hit', from: this.parent, hitResult: this.hitResult});
        }
    }

    Update(t){
        this.stateMachine.Update(t);
    }

}
