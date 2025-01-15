export declare class Inventory {
    id: string;
    productNumber: string;
    material: string;
    form: string;
    choice: string;
    grade: string;
    surface: string;
    finish: string;
    length: number;
    width: number;
    height: number;
    thickness: number;
    outerDiameter: number;
    wallThickness: number;
    webThickness: number;
    flangeThickness: number;
    quantity: number;
    weight: number;
    location: string;
    certificates: string;
    createDate: Date;
    lastUpdated: Date;
    get dimension(): string | null;
}
