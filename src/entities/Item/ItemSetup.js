import Component from '../../Component'
import {Ammo, AmmoHelper} from '../../AmmoLib'

const pi = Math.PI;
const maxHeight = 2.5;
const minHeight = 1.5;

export default class ItemSetup extends Component{
    constructor(mesh, scene, physicsWorld){
      // TODO: add interface image to show in menu/pick-up
        super();
        this.scene = scene;
        this.physicsWorld = physicsWorld;
        this.name = 'ItemSetup';
        this.mesh = mesh;

        this.direction = 1;
        this.update = true;
    }

    get IsPlayerInHitbox(){
        return this.hitbox.overlapping;
    }

    Disable(){
        this.update = false;
        this.scene.remove(this.mesh);
        this.physicsWorld.removeCollisionObject(this.collisionObject);
    }

    AnimateModel(t) {
        const entityPos = this.parent.position;
        //
        const oldY = entityPos.y;
        const increment = t / 2 * this.direction;
        const newY = oldY + increment;
        this.direction = Math.sign(
          (this.direction > 0 ? maxHeight : minHeight) - newY
        );
        entityPos.y = newY;

        this.mesh.position.copy(entityPos);
        this.mesh.rotateY((2 * pi / 4) * t);
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

    ConfirmPickup = (item) => {
        const {inventory, maxItems} = this.player.GetComponent('Inventory')
        if (inventory.length >= maxItems) {
            this.uimanager.ShowError('Inventory Full')
        } else {
            this.player.Broadcast({topic: 'ItemPickup', item });
            this.Disable();
        }
        if(!this.player.GetComponent('PlayerControls').isLocked) {
            document.body.requestPointerLock();
        }
        this.player.GetComponent("PlayerControls").menuOpen = false;
    };

    DeclinePickup = () => {
        if(!this.player.GetComponent("PlayerControls").isLocked) {
            document.body.requestPointerLock();
        }
        this.player.GetComponent("PlayerControls").menuOpen = false;
    };
    TakeHit = msg => {
      if (this.IsPlayerInHitbox) {
        if (this.player.GetComponent("PlayerControls").isLocked) {
          document.exitPointerLock();
          this.player.GetComponent("PlayerControls").menuOpen = true;
          this.uimanager.ShowItemDialog(
            this.parent.name,
            () => this.ConfirmPickup(this.parent.name),
            this.DeclinePickup);
          console.log('pick up ' + this.parent.name + ' ?')
          // TODO make it only after clicking yes:

        }
      } else {
        console.log('get closer');
      }
    }

    Initialize(){
        this.uimanager = this.FindEntity("UIManager").GetComponent("UIManager");

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
        window.testMesh = this.mesh;
    }

    Update(t){
        if(!this.update){
            return;
        }

        this.AnimateModel(t);
        const transform = this.collisionObject.getWorldTransform();
        const entityPos = this.parent.position;
        transform.getOrigin().setValue(entityPos.x, entityPos.y, entityPos.z);
    }
}
