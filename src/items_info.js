import id_scan from './assets/items/models/id_scan.glb';
import id_scan_image from './assets/items/images/id_scan.jpeg';

export const item_details = {
  'id_scan': {
    name: 'ID Scan',
    description: 'Comes in handy when I have to hand in a digital copy of my ID',
    images: [id_scan_image]
  }
}

export const item_models = [
  {
    id: 'id_scan',
    model: id_scan,
  }
]
