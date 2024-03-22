import Component from '../../Component'
import {Ammo, AmmoHelper} from '../../AmmoLib'

export default class ItemSetup extends Component{
    constructor(mesh, scene, physicsWorld){
        super();
        this.scene = scene;
        this.physicsWorld = physicsWorld;
        this.name = 'ItemSetup';
        this.mesh = mesh;
    }

    get IsPlayerInHitbox(){
        return this.hitbox.overlapping;
    }

    SetupHitbox(){
        const shape = new Ammo.btCapsuleShape(1, 4);
        const object = AmmoHelper.CreateTrigger(shape);
        object.parentEntity = this.parent;
        const transform = new Ammo.btTransform();
        transform.setIdentity();
        this.collisionObject = object;
        this.physicsWorld.addCollisionObject(object)
    }

    TakeHit = msg => {
      if (this.IsPlayerInHitbox) {
        console.log(msg);
      } else {
        console.log('get closer');
      }
    }

    Initialize(){
        this.hitbox = this.GetComponent('PickUpTrigger');
        this.player = this.FindEntity("Player");

        this.parent.RegisterEventHandler(this.TakeHit, 'hit');
        this.SetupHitbox();

        // TODO-maybe add node to mesh containing light, otherwise delete third if
        this.mesh.traverse( ( node ) => {
            if ( node.isMesh || node.isLight ) { node.castShadow = true; }
            if(node.isMesh){
                node.receiveShadow = true;
                //node.material.wireframe = true;
            }

            if(node.isLight){
                node.intensity = 3;
                const shadow = node.shadow;
                const lightCam = shadow.camera;

                shadow.mapSize.width = 1024 * 3;
                shadow.mapSize.height = 1024 * 3;
                shadow.bias = -0.00007;

                const dH = 35, dV = 35;
                lightCam.left = -dH;
                lightCam.right = dH;
                lightCam.top = dV;
                lightCam.bottom = -dV;
            }
        });

        this.scene.add( this.mesh );
    }

    Update(t){
        // TODO add removal of logic after pick-up
        // if(!this.update){
        //     return;
        // }

        const entityPos = this.parent.position;
        const entityRot = this.parent.rotation;

        this.mesh.position.copy(entityPos);
        this.mesh.quaternion.copy(entityRot);

        const transform = this.collisionObject.getWorldTransform();

        // this.quat.setValue(entityRot.x, entityRot.y, entityRot.z, entityRot.w);
        // transform.setRotation(this.quat);
        transform.getOrigin().setValue(entityPos.x, entityPos.y, entityPos.z);
    }
}
