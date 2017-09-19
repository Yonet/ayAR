import { OnInit, AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener, Renderer2, NgZone } from '@angular/core';
// import { Component, OnInit, ElementRef, Input, ViewChild, HostListener, Renderer2,  } from '@angular/core';

import { ArService } from '../ar.service';
import { ThreeService } from '../three.service';

/**
 * Takes a pattern image and optional model to render AR
 * Uses ArService to get the user media and ThreeService to render 3D scene.
 */
@Component({
  selector: 'a-pattern-marker',
  templateUrl: './pattern-marker.component.html',
  styleUrls: ['./pattern-marker.component.css']
})

export class PatternMarkerComponent implements OnInit {

  private options = {
    model: {},
    renderer: {},
    rotationTarget: 0
  }

  private arScene: any;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  @Input()
  set model(model: string) {
    this.options.model = this.three.createModel(model);
  }

  @HostListener('click') onClickHandler(e) {
    console.log('clicled parent');
  }

  constructor(private service: ArService, private three: ThreeService, private ngRenderer: Renderer2, private ngZone: NgZone) { }

  ngOnInit() {
    this.service.initAR()(this.arCallback.bind(this));
  }

  arCallback(arScene, arController, arCamera) {
    var model = this.options.model || this.three.createModel('sphere');
    this.arScene = arScene;
    // Add the style according to based on device orientation
    this.ngRenderer.addClass(this.canvas, arController.orientation);

    // Create a webgl renderer using the component canvasRef
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
    let rotationV = 0;
    let rotationTarget = 0;
    this.service.setCameraSize(arController, renderer);

    arController.loadMarker('assets/Data/patt.hiro', function(markerId) {
      var markerRoot = arController.createThreeMarker(markerId);

      // adds the object
      markerRoot.add(model);
      arScene.scene.add(markerRoot);
    });
    var tick = function() {
      arScene.process();
      rotationV += (rotationTarget - model.rotation.z) * 0.05;
      model.rotation.z += rotationV;
      rotationV *= 0.8;
      arScene.renderOn(renderer);
      requestAnimationFrame(tick);
    };
    tick();
    // this.tick.bind(this, arScene);
    // this.ngZone.runOutsideAngular(this.tick.bind(this, arScene));
  };

  onResize(e) {
    console.log('resized ', e);
  }

  canvasClick(e) {
    e.preventDefault();
    this.options.rotationTarget += 1;
  }

  // tick(arScene) {
  //   // arScene.process();
  //   // console.log('model ', this)
  //   // if (this.options.model.rotation) {
  //   //   rotationV += (this.options.rotationTarget - this.options.model.rotation.z || 0) * 0.05;
  //   //   this.options.model.rotation.z += rotationV;
  //   //   rotationV *= 0.8;
  //   // }
  //   //
  //   // arScene.renderOn(this.options.renderer);
  //   // requestAnimationFrame(() => this.ngZone.runOutsideAngular(this.tick.bind(this, arScene)));
  // }


}
