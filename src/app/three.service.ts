import { Injectable } from '@angular/core';

@Injectable()
export class ThreeService {
  public renderer = new THREE.WebGLRenderer({ antialias: true });

  // scene
  // camera
  // lighting
  // object
  //  shape define
  //  texture

  constructor() { }

  getRenderer() {
    return this.renderer;
  }

  createModel(type) {
    let model: any;
    if (type === 'sphere') {
      model = this.createSphere();
    } else if (type === 'torus') {
      model = this.createTorus();
    } else {
      model = this.createBox();
    }
    return model;
  }

  clicked() {
    //Animate...
  }

  createSphere() {
    let sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.MeshNormalMaterial()
    );
    sphere.material.shading = THREE.FlatShading;
    sphere.position.z = 0.5;

    return sphere;
  }

  createBox() {
    let box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial()
    );
    box.material.shading = THREE.FlatShading;
    box.position.z = 0.5;
    return box;
  }

  createTorus() {
    var torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 8, 8),
      new THREE.MeshNormalMaterial()
    );
    torus.material.shading = THREE.FlatShading;
    torus.position.z = 0.5;
    torus.rotation.x = Math.PI / 2;

    return torus;
  }

}
