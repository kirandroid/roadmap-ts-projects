import { Base } from "./base";

export enum WeightUnit {
  milligram = "mg",
  gram = "g",
  kilogram = "kg",
  ounce = "oz",
  pound = "lb",
}

export class Weight extends Base<WeightUnit> {
  protected override unitMap: Record<WeightUnit, number> = {
    [WeightUnit.milligram]: 0.001,
    [WeightUnit.gram]: 1,
    [WeightUnit.kilogram]: 1000,
    [WeightUnit.ounce]: 28.3495,
    [WeightUnit.pound]: 453.592,
  };

  protected override performConversion(
    value: number,
    fromUnit: WeightUnit,
    toUnit: WeightUnit,
  ): number {
    const valueInBase = value * this.unitMap[fromUnit];
    return valueInBase / this.unitMap[toUnit];
  }
}
