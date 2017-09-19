import { Injectable } from '@angular/core';
// export interface UserMediaOption {
//   maxARVideoSize:number;
//   cameraParam: string;
//   onSuccess(): void;
// }

@Injectable()
export class ArService {
  private options: any;
  private setMediaOptionDefaults = {
    maxARVideoSize: 320,
    cameraParam: 'assets/Data/camera_para-iPhone 5 rear 640x480 1.0m.dat'
  };

  constructor() {
  }

  initAR(options?) {
    // this.options = options;
    if (ARController && ARController.getUserMediaThreeScene) {
      return this.aRThreeOnLoad;
    }
  }

  aRThreeOnLoad(cb) {
    // var options = this.options;
    // var param = new ARCameraParam();
    // To use an ARController, you need to tell it the dimensions to use for the AR processing canvas and
    // pass it an ARCameraParam to define the camera parameters to use when processing images.
    // The ARCameraParam defines the lens distortion and aspect ratio of the camera used.

    ARController.getUserMediaThreeScene({
      maxARVideoSize: 320,
      cameraParam: 'assets/Data/camera_para-iPhone 5 rear 640x480 1.0m.dat',
      onSuccess: cb
      // onSuccess: function(arScene, arController, arCamera) {
      // console.log('success arScene, arController, arCamera ', arScene, arController, arCamera);
      // var renderer = new THREE.WebGLRenderer({antialias: true});
      // cb(arScene, arController, arCamera);


      //
      // //inserts the new domElement
      // document.body.insertBefore(options.renderer.domElement, document.body.firstChild);
      //
      // var rotationV = 0;
      // var rotationTarget = 0;
      //
      // options.renderer.domElement.addEventListener('click', function(ev) {
      //   console.log('ev ', options.model.rotation);
      //   ev.preventDefault();
      //   rotationTarget += 1;
      // }, false);
      //
      // arController.loadMarker('assets/Data/patt.hiro', function(markerId) {
      //   var markerRoot = arController.createThreeMarker(markerId);
      //
      //   // adds the object
      //   markerRoot.add(options.model);
      //   arScene.scene.add(markerRoot);
      // });
      //
      //
      // var tick = function() {
      //   arScene.process();
      //
      //   rotationV += (rotationTarget - options.model.rotation.z) * 0.05;
      //   options.model.rotation.z += rotationV;
      //   rotationV *= 0.8;
      //
      //   arScene.renderOn(options.renderer);
      //   requestAnimationFrame(tick);
      // };
      //
      // tick();

      // }//onSuccess
    });

  }///Onload

  // Sets the size of the camera
  setCameraSize(arController) {
    if (arController.orientation === 'portrait') {
      var w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
      var h = window.innerWidth;
      this.options.renderer.setSize(w, h);
      this.options.renderer.domElement.style.paddingBottom = (w - h) + 'px';
    } else {
      if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
        this.options.renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
      } else {
        this.options.renderer.setSize(arController.videoWidth, arController.videoHeight);
        this.options.el.className += ' desktop';
      }
    }

  }
}
