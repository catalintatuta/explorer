import Component from '../../Component'
import {item_details} from "../../items_info";

export default class UIManager extends Component{
    constructor(){
        super();
        this.name = 'UIManager';
    }
    // TODO implement item pick-up menu

    SetItemCount(itemCount, maxItems){
        if (itemCount === maxItems) {
          document.getElementById("item_counter").style.color = 'cyan';
        }
        document.getElementById("item_count").innerText = itemCount;
        if (maxItems) {
          document.getElementById("max_items").innerText = maxItems;
        }
    }

    ShowItemDialog(item, confirm, decline){
        if (item_details[item]) {
          const {name, description, images} = item_details[item];
          document.getElementById("item_name").innerText = name;
          document.getElementById("item_description").innerText = description;
          if (images.length > 1) {
            // TODO handle multiple images
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
            document.getElementById("item_image").style.backgroundImage = `url(${images[0]})`;
          } else {
            document.getElementById("item_image").style.backgroundImage = `url(${images[0]})`;
          }
          document.getElementById('confirm_item').onclick = () => {
            confirm();
            this.HandleMenu('dialog_wrapper', false);
          }
          document.getElementById('decline_item').onclick = () => {
            decline();
            this.HandleMenu('dialog_wrapper', false);
          }
          this.HandleMenu('dialog_wrapper', true);
        } else {
          // TODO: remove after removing all ammo from map
          console.log(item)
        }
    }

    HandleMenu(menuId, open) {
      document.getElementById('crosshair').style.visibility = open ? 'hidden' : 'visible';
      document.getElementById(menuId).style.visibility = open ? 'visible' : 'hidden';
    }

    ShowError(message) {
      // TODO: show this in the menu
        console.error(message);
    }
    Initialize(){
        document.getElementById("game_hud").style.visibility = 'visible';
    }
}
