export interface CarModel {
  code: string;
  description: string;
  colors: CarColor[];
}

export interface CarColor {
  code: string;
  description: string;
  price: number;
}

export interface CarSummary {
  code: string;
  description: string;
  color: CarColor;
  config: CarConfig;
  towHitch: boolean;
  yoke: boolean;
}

export interface CarOption {
  configs: CarConfig[];
  towHitch: boolean;
  yoke: boolean;
}

export interface CarConfig {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}

export const Image_URL = 'https://interstate21.com/tesla-app/images';
