import Component from '../../Component'
import {item_details} from "../../items_info";
import {parseResults} from "../../utils";

export default class UIManager extends Component{
    constructor(){
        super();
        this.name = 'UIManager';
    }

    RenderItem(item, light) {
        let interval;
        const {name, description, images} = item_details[item];

        const flexRow = document.createElement('DIV');
        flexRow.className = 'flex_row';
        flexRow.id = item;

        const itemName = document.createElement('H3');
        itemName.className = 'item_name';
        itemName.innerText = name;

        const itemDescription = document.createElement('DIV');
        itemDescription.className = 'item_description';
        itemDescription.innerText = description;

        const flexCol = document.createElement('DIV');
        flexCol.className = 'flex_column';
        flexCol.appendChild(itemName)
        if (light) {
            return {renderedItem: flexCol}
        }
        flexCol.appendChild(itemDescription)

        const itemImage = document.createElement('DIV');
        itemImage.className = 'item_image';
        itemImage.style.backgroundImage = `url(${images[0]})`;
        if (images.length > 1) {
            let i = 1
            interval = setInterval(() => {
                itemImage.style.backgroundImage = `url(${images[i]})`;
                i++;
                if (i === images.length) {
                  i = 0;
                }
            }, 1000);
        }
        flexRow.appendChild(itemImage);
        flexRow.appendChild(flexCol);

        return {
          interval,
          renderedItem: flexRow
        };
    }

    SetItemCount(itemCount, maxItems){
        if (itemCount >= maxItems) {
            document.getElementById("item_counter").style.color = 'cyan';
        } else {
            document.getElementById("item_counter").style.color = 'white';
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
            const {interval, renderedItem} = this.RenderItem(item)
            document.getElementById('dialog_item_parent').replaceChildren(renderedItem);
            document.getElementById('confirm_item').onclick = () => {
                confirm();
                if (interval) {
                    clearInterval(interval)
                }
                this.HandleMenu('dialog', false);
            }
            document.getElementById('decline_item').onclick = () => {
                decline();
                if (interval) {
                    clearInterval(interval)
                }
                this.HandleMenu('dialog', false);
            }
            document.getElementById('close_dialog').onclick = () => {
                decline();
                if (interval) {
                    clearInterval(interval)
                }
                this.HandleMenu('dialog', false);
            }
            this.HandleMenu('dialog', true);
        } else {
            this.LogError('Unknown Item');
        }
    }

    ConfirmDelete(onConfirm) {
      document.getElementById('confirm_delete').onclick = () => {
        onConfirm();
        document.getElementById('delete_item_answer').style.visibility = 'hidden';
      }
      document.getElementById('decline_delete').onclick = () => {
        document.getElementById('delete_item_answer').style.visibility = 'hidden';
      }
      document.getElementById('delete_item_answer').style.visibility = 'visible';

    }

    ShowInventory(items, close, deleteItem){
        const intervals = []
        if (items.length) {
            const renderedItems = []
            items.forEach(item => {
                const {interval, renderedItem} = this.RenderItem(item)

                const flexCol = document.createElement('DIV');

                const deleteItemButton = document.createElement('BUTTON');
                deleteItemButton.id=`delete_${item}_button`;
                deleteItemButton.className='delete_button';
                deleteItemButton.innerText='🗑️ delete';
                deleteItemButton.onclick = () => {
                  this.ConfirmDelete(
                    () => {
                      deleteItem(item);
                      flexCol.remove();
                    }
                  )
                }

                flexCol.className = 'flex_column';
                flexCol.appendChild(renderedItem);
                flexCol.appendChild(deleteItemButton);

                renderedItems.push(flexCol);
                if (interval) {
                  intervals.push(interval);
                }
            })
            document.getElementById('items_list').replaceChildren(...renderedItems);
        }
        document.getElementById('close_inventory').onclick = () => {
            close();
            intervals.forEach(i => clearInterval(i))
            this.HandleMenu('inventory', false);
        }
        this.HandleMenu('inventory', true);
    }

    ShowEndGame(items){
        document.getElementById("game_hud").style.visibility = 'hidden';
        if (items.length) {
          const renderedItems = []
          items.forEach(item => {
            const {renderedItem} = this.RenderItem(item, true)
            renderedItems.push(renderedItem);
          })
          document.getElementById("endgame_list").replaceChildren(...renderedItems);
        }
        document.getElementById("boring_avatar").src = `https://source.boringavatars.com/marble/80?colors=${parseResults(items)}`
        this.HandleMenu('endgame', true);
    }

    HandleMenu(menuId, opening) {
        document.getElementById('crosshair').style.visibility = opening ? 'hidden' : 'visible';
        document.getElementById(menuId).style.visibility = opening ? 'visible' : 'hidden';
        document.getElementById(menuId).style.opacity = opening ? 1 : 0;
    }

    LogError(message) {
        console.error(message);
    }
    Initialize(){
        document.getElementById("game_hud").style.visibility = 'visible';
    }
}
