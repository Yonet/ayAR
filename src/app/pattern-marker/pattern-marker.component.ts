import { Component, OnInit } from '@angular/core';
import { ArService } from '../ar.service';

@Component({
  selector: 'a-pattern-marker',
  templateUrl: './pattern-marker.component.html',
  styleUrls: ['./pattern-marker.component.css']
})
export class PatternMarkerComponent implements OnInit {

  constructor(private service: ArService) { }

  ngOnInit() {
    this.service.initAR();
  }

}
