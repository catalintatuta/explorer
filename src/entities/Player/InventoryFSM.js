import {FiniteStateMachine, State} from '../../FiniteStateMachine'
import * as THREE from 'three'

export default class InventoryFSM extends FiniteStateMachine{
    constructor(proxy){
        super();
        this.proxy = proxy;
        this.Init();
    }

    Init(){
        this.AddState('idle', new IdleState(this));
        this.AddState('shoot', new ShootState(this));
        // this.AddState('reload', new ReloadState(this));
    }
}

class IdleState extends State{
    constructor(parent){
        super(parent);
    }

    get Name(){return 'idle'}
    get Animation(){return null; }

    Enter(prevState){
    }

    Update(t){
        // if(this.parent.proxy.shoot && this.parent.proxy.magAmmo > 0){
        //     this.parent.SetState('shoot');
        // }
    }
}

class ShootState extends State{
    constructor(parent){
        super(parent);
    }

    get Name(){return 'shoot'}
    get Animation(){return null }

    Enter(prevState){
    }

    Update(t){
        // if(!this.parent.proxy.shoot || this.parent.proxy.magAmmo == 0){
        //     this.parent.SetState('idle');
        // }
    }
}
