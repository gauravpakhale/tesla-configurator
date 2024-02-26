import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../service/common.service';
import { Subscription } from 'rxjs';
import { CarSummary, CarOption, CarConfig } from '../../model/car.model';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  public carSummary!: CarSummary;
  public carConfigOptions!: CarOption;
  public selectedCarConfig!: CarConfig;
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
      .subscribe((reponse) => {
        this.carSummary = reponse;
        this.getTeslaCarOption(this.carSummary.code);
      });
  }

  /**
   * @description method for get a car option/config
   * @param carModel
   */
  getTeslaCarOption(carModel: string) {
    this.subscription = this.subscription = this.commonService
      .getTeslaCarOptions(carModel)
      .subscribe((reponse) => {
        this.carConfigOptions = reponse;
        if (this.carSummary?.config?.description) {
          let tempCarConfig = this.carConfigOptions?.configs?.find(
            (element) =>
              element?.description === this.carSummary?.config?.description
          );
          if (tempCarConfig != undefined) {
            this.selectedCarConfig = tempCarConfig;
          }
        }
      });
  }

  /**
   * @description method for choose the car option and passing choosed value to carSummary variable for next tab reference
   * @param configDesc
   */
  onConfigChange(configDesc: string) {
    const carConfig = this.carConfigOptions?.configs?.find(
      (element) => element?.description === configDesc
    );
    if (carConfig) {
      this.selectedCarConfig = carConfig;
      this.carSummary.config = this.selectedCarConfig;
      this.commonService.setTeslaCarSummary(this.carSummary);
    }
  }

  /**
   * @description method for check towHitch or yoke checkbox
   * @param event
   */
  onOptionChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    const { name, checked } = target;
    if (name === 'towHitch' || name === 'yoke') {
      this.carSummary[name] = checked;
    }
    this.commonService.setTeslaCarSummary(this.carSummary);
  }

  /**
   * @description Method for destroying observables
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
