import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CarModel, CarSummary, CarOption } from '../model/car.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  /**
   * @description Behaviour subject created with default value
   */
  public carSummary = new BehaviorSubject<CarSummary>({
    code: '',
    description: '',
    color: {
      code: '',
      description: '',
      price: 0,
    },
    config: {
      id: 0,
      description: '',
      range: 0,
      speed: 0,
      price: 0,
    },
    towHitch: false,
    yoke: false,
  });

  public carImageUrl = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  /**
   * @description method for getting car models
   * @returns
   */
  getTeslaCarModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('/models');
  }

  /**
   * @description method for setting summary of a car
   * @param carSummary
   */
  setTeslaCarSummary(carSummary: CarSummary) {
    this.carSummary.next(carSummary);
  }

  /**
   * @description method for getting summary of a car
   * @returns
   */
  getTeslaCarSummary() {
    return this.carSummary;
  }

  /**
   * @description method for setting URL of a car image
   * @param imageUrl
   */
  setTeslaCarImageUrl(imageUrl: string) {
    this.carImageUrl.next(imageUrl);
  }

  /**
   * @description method for getting URL of a car image
   * @returns
   */
  getTeslaCarImageUrl() {
    return this.carImageUrl;
  }

  /**
   * @description method of getting options of a car
   * @param carModel
   * @returns
   */
  getTeslaCarOptions(carModel: string): Observable<CarOption> {
    return this.http.get<CarOption>(`/options/${carModel}`);
  }
}
