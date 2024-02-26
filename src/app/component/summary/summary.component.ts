import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../service/common.service';
import { CarSummary } from '../../model/car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  public carSummary!: CarSummary;
  public totalCost!: number;
  subscription: Subscription = new Subscription();

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.getCarSummary();
  }

  /**
   * @description method for get the summary of a car
   */
  getCarSummary() {
    this.subscription = this.commonService
      .getTeslaCarSummary()
      .subscribe((response) => {
        this.carSummary = response;
        this.calculateTotalCost();
      });
  }

  /**
   * @description method for calculating total cost of a car
   */
  calculateTotalCost() {
    const configColorCost =
      (this.carSummary?.config?.price ?? 0) +
      (this.carSummary?.color?.price ?? 0);
    const additionalCost =
      this.carSummary?.towHitch && this.carSummary?.yoke
        ? 2000
        : this.carSummary?.towHitch || this.carSummary?.yoke
        ? 1000
        : 0;
    this.totalCost = configColorCost + additionalCost;
  }
}
