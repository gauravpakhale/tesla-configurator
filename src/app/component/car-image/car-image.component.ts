import { Component } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.scss',
})
export class CarImageComponent {
  public carImageUrl: string = '';
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.getTeslaCarImageUrl().subscribe((response) => {
      this.carImageUrl = response;
    });
  }
}
