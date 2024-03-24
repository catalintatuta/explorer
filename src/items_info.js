import id_scan from './assets/items/models/id_scan.glb';
import video_diaries from './assets/items/models/video_diaries.glb';

import id_scan_image from './assets/items/images/id_scan.jpeg';
import video_diaries_image from './assets/items/images/video_diaries.jpeg';

export const item_details = {
  'id_scan': {
    name: 'ID Scan',
    description: 'Comes in handy when I have to hand in a digital copy of my ID.',
    images: [id_scan_image]
  },
  'video_diaries': {
    name: 'Video diaries',
    description: 'Some of them fall in the category of “Me talking at the camera”. Like a video time-capsule. They were made in key moments of my life (before I moved abroad, or before my Bachelor exam). Instead of writing in a journal, I would make a video like this. That takes up a lot of space.',
    images: [video_diaries_image]
  }
}

export const item_models = [
  {
    id: 'id_scan',
    model: id_scan,
  },
  {
    id: 'video_diaries',
    model: video_diaries,
  }
]
