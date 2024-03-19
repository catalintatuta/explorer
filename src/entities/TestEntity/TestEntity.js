import Component from '../../Component'

export default class TestEntity extends Component{
    constructor(scene, model, physicsWorld){
        super();
        this.name = 'TestEntity';
        this.model = model;
        this.scene = scene;
        this.world = physicsWorld;

        this.update = true;
    }

    Initialize(){
        this.player = this.FindEntity('Player');
        this.playerPhysics = this.player.GetComponent('PlayerPhysics');

        this.scene.add(this.model);
    }

    Update(t){
        if(!this.update){
            return;
        }

        const entityPos = this.parent.position;
        const entityRot = this.parent.rotation;

        this.model.position.copy(entityPos);
        this.model.quaternion.copy(entityRot);
    }

}
