import { Injectable } from '@angular/core';

@Injectable()
export class ArService {

  private options: any;
  private setMediaOptionDefaults = {
    maxARVideoSize: 320,
    cameraParam: 'assets/Data/camera_para-iPhone 5 rear 640x480 1.0m.dat'
  };

  constructor() { }

  initAR(options?) {
    // this.options = options;
    if (ARController && ARController.getUserMediaThreeScene) {
      return this.aRThreeOnLoad;
    }
  }

  // To use an ARController, you need to tell it the dimensions to use for the AR processing canvas and
  // pass it an ARCameraParam to define the camera parameters to use when processing images.
  // The ARCameraParam defines the lens distortion and aspect ratio of the camera used.
  aRThreeOnLoad(cb) {
    // var param = new ARCameraParam();

    ARController.getUserMediaThreeScene({
      maxARVideoSize: 320,
      cameraParam: 'assets/Data/camera_para-iPhone 5 rear 640x480 1.0m.dat',
      onSuccess: cb
    });

  }

  // Sets the size of the camera
  // TODO: take the size from the component not window
  setCameraSize(arController, renderer) {
    if (arController.orientation === 'portrait') {
      var w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
      var h = window.innerWidth;
      renderer.setSize(w, h);
      renderer.domElement.style.paddingBottom = (w - h) + 'px';
    } else {
      if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
        renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
      } else {
        renderer.setSize(arController.videoWidth, arController.videoHeight);
        return 'desktop';
      }
    }

  }
}
