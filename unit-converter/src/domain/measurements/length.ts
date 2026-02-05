import { Base } from "./base";

export enum LengthUnit {
  millimeter = "mm",
  centimeter = "cm",
  meter = "m",
  kilometer = "kilometer",
  inch = "in",
  feet = "ft",
  yard = "yd",
  mile = "mi",
}
export class Length extends Base<LengthUnit> {
  protected override unitMap: Record<LengthUnit, number> = {
    [LengthUnit.millimeter]: 0.001,
    [LengthUnit.centimeter]: 0.01,
    [LengthUnit.meter]: 1,
    [LengthUnit.kilometer]: 1000,
    [LengthUnit.inch]: 0.0254,
    [LengthUnit.feet]: 0.3048,
    [LengthUnit.yard]: 0.9144,
    [LengthUnit.mile]: 1609.34,
  };

  protected override performConversion(
    value: number,
    fromUnit: LengthUnit,
    toUnit: LengthUnit,
  ): number {
    const valueInBase = value * this.unitMap[fromUnit];
    return valueInBase / this.unitMap[toUnit];
  }
}
