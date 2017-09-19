import { Directive, OnInit, Input, HostListener, Renderer2, TemplateRef, ElementRef, ViewContainerRef } from '@angular/core';
import { ArService } from './ar.service';
import { ThreeService } from './three.service';

@Directive({
  selector: '[aAr]'
})
export class ArDirective {
  private defaultOptions = {
    model: {},
    renderer: this.three.getRenderer()
  }

  @Input()
  set aAr(model: string) {
    this.defaultOptions.model = this.three.createModel(model);
  }
  @HostListener('click') onClickHandler(e) {
    console.log('clicled el', this.defaultOptions.model);
    //?
    this.three.clicked();

  }

  constructor(
    private service: ArService, private three: ThreeService,
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    var glrenderer = this.three.getRenderer();
    this.defaultOptions.renderer = glrenderer;

    var func = this.service.initAR(this.defaultOptions);
    console.log('func ', func);
    func(() => console.log('callback runnin'))
  }

}
