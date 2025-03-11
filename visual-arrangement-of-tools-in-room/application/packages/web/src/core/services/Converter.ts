export class Converter {
  public static mmToCm(mm: number): number {
    return Number((mm / 100).toFixed(2));
  }

  public static toFixed(val: number): number {
    return Number(val.toFixed(2));
  }

  public static hexToRgb(hex: string): [number, number, number] {
    const r = Number.parseInt(hex.slice(1, 3), 16);
    const g = Number.parseInt(hex.slice(3, 5), 16);
    const b = Number.parseInt(hex.slice(5, 7), 16);

    return [r, g, b];
  }

  public static toRadians(deg: number): number {
    return (deg * Math.PI) / 180.0;
  }

  public static radiansToDegrees(rad: number): number {
    return (rad * 180.0) / Math.PI;
  }
}
