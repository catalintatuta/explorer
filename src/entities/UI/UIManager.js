import Component from '../../Component'

export default class UIManager extends Component{
    constructor(){
        super();
        this.name = 'UIManager';
    }
    // TODO implement item pick-up menu

    SetItemCount(itemCount){
        if (itemCount === 10) {
          document.getElementById("item_counter").style.color = 'cyan';
        }
        document.getElementById("item_count").innerText = itemCount;
    }

    Initialize(){
        document.getElementById("game_hud").style.visibility = 'visible';
    }
}
