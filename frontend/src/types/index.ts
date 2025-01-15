export interface Material {
    id: string;
    productNumber: string;
    dimension: string;
    width: number;
    height: number;
    length: number;
    thickness: number;
    outerDiameter: number;
    wallThickness: number;
    webThickness: number;
    flangeThickness: number;
    material: string;
    form: string;
    finish: string
    choice: string;
    grade: string;
    surface: string;
    weight: number;
    quantity: number;
    location: string;
  }
  
  export interface Preference {
    id: string;
    material: string;
    form: string;
    grade: string;
    dimensions?: string;
    widthMin?: number;
    widthMax?: number;
    thickenessMin?: number;
    thickenessMax?: number;
  }
  