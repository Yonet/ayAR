import { Injectable } from '@angular/core';
// import { ArToolkitSource, ArToolkitContext }from 'threex';
let onRenderFcts = [];
let scene;
let renderer;
let arToolkitSource;
let camera;
let arToolkitContext;

@Injectable({
  providedIn: 'root'
})
export class ArjsService {



  constructor() { }

  initAR(canvas) {
    renderer = this.createRenderer(canvas);
    scene = this.createScene();
    arToolkitContext = this.createToolkitContext();
    arToolkitSource = this.handleARToolkitSource();
    this.initCameraControls();
    this.createTorus();

    // render the scene
    onRenderFcts.push(function(){
      renderer.render( scene, camera );
    })

        // run the rendering loop
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
      // keep looping
      requestAnimationFrame( animate );
      // measure time
      lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
      var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec	= nowMsec
      // call each update function
      onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000)
      })
    })
  }

  createRenderer(canvas){
    var renderer	= new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvas
    });
    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize( 640, 480 );
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    return renderer;
  }

  createScene(){
    var scene	= new THREE.Scene();

    // Create a camera
    camera = new THREE.Camera();
    scene.add(camera);

    return scene;
  }

  handleARToolkitSource(){
    var arToolkitSource = new THREEx.ArToolkitSource({
      // to read from the webcam
      sourceType : 'webcam',
      // // to read from an image
      // sourceType : 'image',
      // sourceUrl : THREEx.ArToolkitContext.baseURL + 'assets/Data/img.jpg',
      // to read from a video
      // sourceType : 'video',
      // sourceUrl : THREEx.ArToolkitContext.baseURL + 'assets/Data/videos/headtracking.mp4',
    })

    arToolkitSource.init(function onReady(){
       arToolkitSource.onResizeElement()
      arToolkitSource.copyElementSizeTo(renderer.domElement)
      if( arToolkitContext.arController !== null ){
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
      }
    })

    return arToolkitSource;
  }

  createToolkitContext(){
    var arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: 'assets/Data/camera_para.dat',
      detectionMode: 'mono',
    })
    // initialize it
    arToolkitContext.init(function onCompleted(){
      // copy projection matrix to camera
      camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    })
    // update artoolkit on every frame
    onRenderFcts.push(function(){
      if( arToolkitSource.ready === false )	return
      arToolkitContext.update( arToolkitSource.domElement )
      // update scene.visible if the marker is seen
      scene.visible = camera.visible
    })

    return arToolkitContext;
  }

  initCameraControls () {
    var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
      type : 'pattern',
      patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
      // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
      // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
      changeMatrixMode: 'cameraTransformMatrix'
    })
    // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
      scene.visible = false
  }

  createTorus () {
  // add a torus knot
    var geometry	= new THREE.CubeGeometry(1,1,1);
    var material	= new THREE.MeshNormalMaterial({
      transparent : true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    var mesh	= new THREE.Mesh( geometry, material );
    mesh.position.y	= geometry.parameters.height/2
    scene.add( mesh );
    var geometry	= new THREE.TorusKnotGeometry(0.3,0.1,64,16);
    var material	= new THREE.MeshNormalMaterial();
    var mesh	= new THREE.Mesh( geometry, material );
    mesh.position.y	= 0.5
    scene.add( mesh );
    onRenderFcts.push(function(delta){
      mesh.rotation.x += Math.PI*delta
    })
  }

  sayHi() {
    
  }

}
