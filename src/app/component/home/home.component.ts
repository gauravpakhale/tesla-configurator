import { Component } from '@angular/core';
import { CarModel, CarSummary, Image_URL } from '../../model/car.model';
import { Subscription } from 'rxjs';
import { CommonService } from '../../service/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public carModels!: CarModel[];
  public carSummary!: CarSummary;
  public selectedCarModel!: CarModel;
  subscription: Subscription = new Subscription();

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.getCarModels();
  }
  /**
   * @description method for get the details of a car models
   */
  getCarModels() {
    this.subscription = this.commonService
      .getTeslaCarModels()
      .subscribe((data) => {
        this.carModels = data;
        this.getCarSummary();
      });
  }

  /**
   * @description method for get the summary of a car
   */
  getCarSummary() {
    this.subscription = this.commonService
      .getTeslaCarSummary()
      .subscribe((response) => {
        this.carSummary = response;
        if (this.carSummary?.code) {
          let carModelDetails = this.carModels?.find(
            (element) => element?.code === this.carSummary?.code
          );
          if (carModelDetails) {
            this.selectedCarModel = carModelDetails;
          }
        }
      });
  }

  /**
   * @description Method for choose a car model & matched data we are passing to carSummary variable for next tabs reference
   * @param modelCode
   */
  onModelChange(modelCode: string) {
    const selectedModel = this.carModels?.find(
      (model) => model.code === modelCode
    );
    if (selectedModel) {
      this.selectedCarModel = selectedModel;
      const { code, description, colors } = selectedModel;      
      this.carSummary.code = code;
      this.carSummary.description = description;
      this.carSummary.color = colors?.[0];
      this.carSummary.config = {
        id: 0,
        description: '',
        range: 0,
        price: 0,
        speed: 0,
      };
      this.carSummary.towHitch = false;
      this.carSummary.yoke = false;
      this.createImageURL(this.carSummary?.code, this.carSummary?.color?.code);
      this.commonService.setTeslaCarSummary(this.carSummary);
    }
  }

  /**
   * @description method for chooseing a car color
   * @param modelColor
   */
  onColorChange(modelColor: string) {
    const selectedColor = this.selectedCarModel?.colors?.find(
      (color) => color.code === modelColor
    );
    this.createImageURL(this.selectedCarModel?.code, modelColor);
    if (selectedColor) {
      this.carSummary.color = selectedColor;
      this.commonService.setTeslaCarSummary(this.carSummary);
    }
  }

  /**
   * @description method for generating a URL of a car image
   * @param carCode
   * @param colorCode
   */
  createImageURL(carCode: string, colorCode: string) {
    let imageurl = `${Image_URL}/${carCode}/${colorCode}.jpg`;
    this.commonService.setTeslaCarImageUrl(imageurl);
  }

  /**
   * @description Method for destroying observables
   */
  ngOnDestory() {
    this.subscription.unsubscribe();
  }
}
