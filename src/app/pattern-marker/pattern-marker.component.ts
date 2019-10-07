import { OnInit, AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener, Renderer2, NgZone } from '@angular/core';
// import { Component, OnInit, ElementRef, Input, ViewChild, HostListener, Renderer2,  } from '@angular/core';

import { ArjsService } from '../arjs.service';


/**
 * Takes a pattern image and optional model to render AR
 * Uses ArService to get the user media and ThreeService to render 3D scene.
 */
@Component({
  selector: 'a-pattern-marker',
  templateUrl: './pattern-marker.component.html',
  styleUrls: ['./pattern-marker.component.css']
})

export class PatternMarkerComponent implements AfterViewInit {

  private options = {
    model: {},
    renderer: {},
    rotationTarget: 0
  }

  private arScene: any;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas', {static: false})
  private canvasRef: ElementRef;

  @Input()
  set model(model: string) {
    this.options.model = this.service.createModel(model);
  }

  @HostListener('click') onClickHandler(e) {
    console.log('clicled parent');
  }

  constructor(private service: ArjsService) { }

  ngAfterViewInit() {
    this.service.initAR(this.canvas);
  }

  onResize(e) {
    console.log('resized ', e);
  }

  canvasClick(e) {
    e.preventDefault();
    this.options.rotationTarget += 1;
  }

}
