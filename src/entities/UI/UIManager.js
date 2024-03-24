import Component from '../../Component'
import {item_details} from "../../items_info";

export default class UIManager extends Component{
    constructor(){
        super();
        this.name = 'UIManager';
    }

    SetItemCount(itemCount, maxItems){
        if (itemCount === maxItems) {
            document.getElementById("item_counter").style.color = 'cyan';
        }
        document.getElementById("item_count").innerText = itemCount;
        if (maxItems) {
            document.getElementById("max_items").innerText = maxItems;
        }
    }

    SetInventoryFull(full) {
        if (full) {
            document.getElementById('pick_answer').style.display = 'none';
            document.getElementById('full_inventory').style.display = 'flex';
        } else {
            document.getElementById('pick_answer').style.display = 'flex';
            document.getElementById('full_inventory').style.display = 'none';
        }
    }

    ShowItemDialog(item, confirm, decline){
        if (item_details[item]) {
            // TODO extract single item UI construction logic to re-use in inventory
            let interval;
            const {name, description, images} = item_details[item];
            document.getElementById("item_name").innerText = name;
            document.getElementById("item_description").innerText = description;
            if (images.length > 1) {
                document.getElementById("item_image").style.backgroundImage = `url(${images[0]})`;
                let i = 1
                interval = setInterval(() => {
                    document.getElementById("item_image").style.backgroundImage = `url(${images[i]})`;
                    i++;
                    if (i === images.length) {
                        i = 0;
                    }
                }, 1000);
            } else {
                document.getElementById("item_image").style.backgroundImage = `url(${images[0]})`;
            }
            document.getElementById('confirm_item').onclick = () => {
                confirm();
                if (images.length > 1 && interval) {
                    clearInterval(interval)
                }
                this.HandleMenu('dialog', false);
            }
            document.getElementById('decline_item').onclick = () => {
                decline();
                if (images.length > 1 && interval) {
                    clearInterval(interval)
                }
                this.HandleMenu('dialog', false);
            }
            document.getElementById('close_dialog').onclick = () => {
                decline();
                if (images.length > 1 && interval) {
                    clearInterval(interval)
                }
                this.HandleMenu('dialog', false);
            }
            this.HandleMenu('dialog', true);
        } else {
            this.LogError('Unknown Item');
        }
    }

    ShowInventory(items, close, deleteItem){
        document.getElementById('items_list').innerText = items.join('\n');
        document.getElementById('close_inventory').onclick = () => {
            close();
            this.HandleMenu('inventory', false);
        }
        this.HandleMenu('inventory', true);
    }

    HandleMenu(menuId, opening) {
        document.getElementById('crosshair').style.visibility = opening ? 'hidden' : 'visible';
        document.getElementById(menuId).style.visibility = opening ? 'visible' : 'hidden';
    }

    LogError(message) {
      // TODO: show this in the menu
        console.error(message);
    }
    Initialize(){
        document.getElementById("game_hud").style.visibility = 'visible';
    }
}
