import { OnInit, AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener, Renderer2 } from '@angular/core';

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

  private defaultOptions = {
    model: {},
    renderer: {}
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  @Input()
  set model(model: string) {
    this.defaultOptions.model = this.three.createModel(model);
  }

  @HostListener('click') onClickHandler(e) {
    console.log('clicled el', this.defaultOptions.model);
    this.three.clicked();
  }


  constructor(private service: ArService, private three: ThreeService, private renderer: Renderer2) {
    console.log('rem', this.renderer);
  }

  ngOnInit() {
    this.service.initAR()(this.arCallback.bind(this));
  }

  arCallback(arScene, arController, arCamera) {

    this.defaultOptions.renderer = this.three.getRenderer();

    console.log('callback runnin here too');
    document.body.className = arController.orientation;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
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
        document.body.className += ' desktop';
      }
    }
    document.body.insertBefore(renderer.domElement, document.body.firstChild);
    var rotationV = 0;
    var rotationTarget = 0;
    renderer.domElement.addEventListener('click', function(ev) {
      ev.preventDefault();
      rotationTarget += 1;
    }, false);
    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.MeshNormalMaterial()
    );
    sphere.material.shading = THREE.FlatShading;
    sphere.position.z = 0.5;
    var torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 8, 8),
      new THREE.MeshNormalMaterial()
    );
    torus.material.shading = THREE.FlatShading;
    torus.position.z = 0.5;
    torus.rotation.x = Math.PI / 2;
    arController.loadMarker('assets/Data/patt.hiro', function(markerId) {
      var markerRoot = arController.createThreeMarker(markerId);

      // adds the object
      markerRoot.add(torus);
      arScene.scene.add(markerRoot);
    });
    // arController.loadMarker('Data/patt.kanji', function(markerId) {
    //   var markerRoot = arController.createThreeMarker(markerId);
    //   markerRoot.add(torus);
    //   arScene.scene.add(markerRoot);
    // });
    var tick = function() {
      arScene.process();
      rotationV += (rotationTarget - sphere.rotation.z) * 0.05;
      sphere.rotation.z += rotationV;
      torus.rotation.y += rotationV;
      rotationV *= 0.8;
      arScene.renderOn(renderer);
      requestAnimationFrame(tick);
    };
    tick();
    //insert new domElement
  }


}
