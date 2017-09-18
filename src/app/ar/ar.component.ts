import { Component, OnInit } from '@angular/core';
// import { WebGLRenderer, Color } from 'three';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import * as ar from 'ar.js';

@Component({
  selector: 'a-ar',
  templateUrl: './ar.component.html',
  styleUrls: ['./ar.component.css']
})
export class ArComponent implements OnInit {
  // renderer: WebGLRenderer;
  // constructor() {
  //   THREEx.ArToolkitContext.baseURL = '../'
  // }
  //
  ngOnInit() {}
  //   var renderer = new THREE.WebGLRenderer({
  //     antialias: true,
  //     alpha: true
  //   });
  //   renderer.setClearColor(new THREE.Color('lightgrey'), 0)
  //   renderer.setSize(640, 480);
  //   renderer.domElement.style.position = 'absolute'
  //   renderer.domElement.style.top = '0px'
  //   renderer.domElement.style.left = '0px'
  //   var onRenderFcts = [];
  //
  //   var scene = new THREE.Scene();
  //   console.log('Scene', scene);
  //
  //   console.log('renderer ');
  //   var arToolkitSource = new THREEx.ArToolkitSource({
  //     // to read from the webcam
  //     sourceType: 'webcam',
  //     // to read from an image
  //     // sourceType : 'image',
  //     // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',
  //     // to read from a video
  //     // sourceType : 'video',
  //     // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',
  //
  //   })
  //   arToolkitSource.init(function onReady() {
  //     onResize()
  //   })
  //
  //   // handle resize
  //   window.addEventListener('resize', function() {
  //     onResize()
  //   })
  //   function onResize() {
  //     arToolkitSource.onResize()
  //     arToolkitSource.copySizeTo(renderer.domElement)
  //     if (THREEx.arToolkitContext.arController !== null) {
  //       arToolkitSource.copySizeTo(THREEx.arToolkitContext.arController.canvas)
  //     }
  //   }
  // }

};
