import Component from '../../Component'
import {Ammo, AmmoHelper, CollisionFilterGroups} from '../../AmmoLib'

export default class End extends Component{
    constructor(physicsWorld, endPosition){
        super();
        this.name = 'End';
        this.physicsWorld = physicsWorld;
        this.endPosition = endPosition;

        //Relative to parent
        this.localTransform = new Ammo.btTransform();
        this.localTransform.setIdentity();
        this.localTransform.getOrigin().setValue(0.0, 1.0, 1.0);

        this.inEndZone = false;
    }

    SetupTrigger(){
        const shape = new Ammo.btSphereShape(6);
        this.ghostObj = AmmoHelper.CreateTrigger(shape);

        this.physicsWorld.addCollisionObject(this.ghostObj, CollisionFilterGroups.SensorTrigger);
    }

    Initialize(){
        this.playerPhysics = this.GetComponent('PlayerPhysics');
        this.SetupTrigger();
    }

    PhysicsUpdate(world, t){
        this.inEndZone = AmmoHelper.IsTriggerOverlapping(this.ghostObj, this.playerPhysics.body);
    }

    Update(t){
        const entityPos = this.endPosition;
        const transform = this.ghostObj.getWorldTransform();

        transform.getOrigin().setValue(entityPos.x, entityPos.y, entityPos.z);
        transform.op_mul(this.localTransform);
    }
}
