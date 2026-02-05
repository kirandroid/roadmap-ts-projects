import { Base } from "./base";

export enum TempUnit {
  Celsius = "C",
  Fahrenheit = "F",
  Kelvin = "K",
}

export class Temperature extends Base<TempUnit> {
  protected override unitMap: Record<TempUnit, number> = {
    [TempUnit.Celsius]: 1,
    [TempUnit.Fahrenheit]: 1,
    [TempUnit.Kelvin]: 1,
  };

  public override performConversion(
    value: number,
    fromUnit: TempUnit,
    toUnit: TempUnit,
  ): number {
    const celsius = this.toCelsius(value, fromUnit);
    return this.fromCelsius(celsius, toUnit);
  }

  private toCelsius(value: number, fromUnit: TempUnit): number {
    switch (fromUnit) {
      case TempUnit.Fahrenheit:
        return ((value - 32) * 5) / 9;
      case TempUnit.Kelvin:
        return value - 273.15;
      default:
        return value;
    }
  }

  private fromCelsius(celsius: number, toUnit: TempUnit): number {
    switch (toUnit) {
      case TempUnit.Fahrenheit:
        return (celsius * 9) / 5 + 32;
      case TempUnit.Kelvin:
        return celsius + 273.15;
      default:
        return celsius;
    }
  }
}
