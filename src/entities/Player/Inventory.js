import * as THREE from 'three'
import Component from '../../Component'
import Input from '../../Input'
import {Ammo, AmmoHelper, CollisionFilterGroups} from '../../AmmoLib'


export default class Inventory extends Component{
    constructor(camera, world,
    ){
        super();
        this.name = 'Inventory';
        this.camera = camera;
        this.world = world;

        this.inventory = [];
        this.maxItems = 10;
        this.uimanager = null;
        this.hitResult = {intersectionPoint: new THREE.Vector3(), intersectionNormal: new THREE.Vector3()};

    }

    ItemPickup = (e) => {
        if (this.inventory.length >= this.maxItems) {
          return;
        }
        this.inventory.push(e.item)
        this.uimanager.SetItemCount(this.inventory.length, this.maxItems);
    }

    DeleteItem = (e) => {
        const itemIndex = this.inventory.findIndex(item => item === e.item);
        if (itemIndex === -1) {
          return;
        }

        this.inventory.splice(itemIndex,1);
        this.uimanager.SetItemCount(this.inventory.length, this.maxItems);
    }

    Initialize(){

        this.uimanager = this.FindEntity("UIManager").GetComponent("UIManager");

        this.uimanager.SetItemCount(0, this.maxItems);
        this.SetupInput();
        //Listen to item pickup event
        this.parent.RegisterEventHandler(this.ItemPickup, "ItemPickup");
        this.parent.RegisterEventHandler(this.DeleteItem, "DeleteItem");
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

            entity && entity.Broadcast({'topic': 'clicked'});
        }
    }

    Update(t){
    }

}
