# AyAR

http://bit.ly/ng-ar-demo

## SetUp to view

* Make sure your browser is WebXR capable. You can check which browsers support WebXR and WebVR at [CanIUse.com](https://caniuse.com/#search=webxr).

* You can also enable experimental flags on Chrome by typing 'chrome://flags' on the searchbar and search for WebXR. 

* Navigate to http://bit.ly/ng-ar-demo.

* Point your camera to the [Hiro image](src/assets/HIRO.jpg).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Using Custom Markers

You can create your own markers by uploading an image to [marker generator](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html).

You also need to save the generated marker file under the [assets folder](src/assets/). 

In the [ArJsService file](src/app/arjs.service.ts), you need to point Camera Controls patternUrl to your custom file.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
