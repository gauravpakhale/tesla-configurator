import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarImageComponent } from './component/car-image/car-image.component';
import { CommonService } from './service/common.service';
import { CarSummary } from './model/car.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterModule, CarImageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public carSummary!: CarSummary;
 
  constructor(private commonService: CommonService){}

  ngOnInit(){
    this.commonService.getTeslaCarSummary().subscribe(response => {
      this.carSummary = response;
    })
  }
}
