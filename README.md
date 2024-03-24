# Three FPS Demo

Three.js FPS game using ammo.js and three-pathfinding with ES6 and Webpack.

The project features an entity/component system, FPS controller using ammo.js rigidbody, NPC with root-motion animations and a basic AI.

Please note that the project is still under development.

[Online Demo](http://venolabs.com/three-fps-demo/)

## Install
Before you begin, make sure you are comfortable with terminal commands and have [Node and NPM installed](https://www.npmjs.com/get-npm). Then either install via a download or with Git.

### Install via Download
First download the [zip of the project](https://github.com/mohsenheydari/three-fps/archive/master.zip) and extract it. Then in terminal at that folder type `npm install` to set things up. To get going run: `npm start`.

### Install with Git
In terminal clone the project into a directory of your choice then delete the git folder to start fresh.

```bash
git clone --depth=1 https://github.com/mohsenheydari/three-fps.git three-fps
cd three-fps
rm -rf .git
npm install
```

## Running the development server
To see the changes you make to the project go to the project's folder in terminal and type...

```bash
npm start
```

This command will bundle the project code and start a development server at [http://localhost:8080/](http://localhost:8080/). Visit this in your web browser.

## Editing the code
The first file you should open is `./src/entry.js`. In it you will find the main application class. This class is reponsible for initializing the libraries and loading art assets, it also handles the main game loop.

## Building the project for the web
Running `npm run build` in terminal will bundle your project into the folder `./build/`. You can upload this directory to a web server. For more complex results read [this guide](https://webpack.js.org/guides/production/).

## About the models
Art assets used in this project:

* Skybox by rawpixel on [Freepik](https://www.freepik.com/free-vector/stream-binary-code-design-vector_31069134.htm#fromView=search&page=1&position=1&uuid=35f96bea-3cd1-46c7-9677-036b4e7a2269)
* Circuit tiles by [Freepik](https://www.freepik.com/free-photo/top-view-circuit-board-close-up_20282397.htm#&position=8&from_view=search&track=ais&uuid=bd03caf3-895d-4be5-9b39-8a9f16b3e759)
* Cloud texture by [Freepik](https://www.freepik.com/free-vector/circuit-background-flat-design_1019409.htm#fromView=search&page=1&position=29&uuid=70b84d2b-8a58-4e12-95b9-d6d4ca1c1bf9)
* Time Hotel 5.20 (ID Card) by S. Paul Michael [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/0ZXI8WCHi9_)
* Video Camera by dook [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/7IV9LlcdNB)
* Circuit parts by Bill Baran (Sirkut) [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/fL02Z7OItO9)
* Clouds by Poly by Google [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/5vL346OfNST)
* Thumb drive by Poly by Google [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/8DhBCSmGQ2I)
* Cumulus Clouds 5 by S. Paul Michael [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/25RmW99gwuv)
* [Metal Ammo Box](https://skfb.ly/6UAQY) by [TheoClarke](https://sketchfab.com/TheoClarke) is licensed under CC BY 4.0
* [Veld Fire](https://hdrihaven.com/hdri/?h=veld_fire) by [Greg Zaal](https://hdrihaven.com/hdris/?a=Greg%20Zaal) is licensed under CC0

## Thanks to
* [Three Seed](https://github.com/edwinwebb/three-seed)
* [ammo.js](https://github.com/kripken/ammo.js/)
* [three-pathfinding](https://github.com/donmccurdy/three-pathfinding)

## License
[MIT](https://github.com/mohsenheydari/three-fps/blob/master/LICENSE)
