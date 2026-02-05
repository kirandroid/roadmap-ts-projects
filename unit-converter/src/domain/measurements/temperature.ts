import { Base } from "./base";

export enum TempUnit {
  celsius = "C",
  fahrenheit = "F",
  kelvin = "K",
}

export class Temperature extends Base<TempUnit> {
  protected override unitMap: Record<TempUnit, number> = {
    [TempUnit.celsius]: 1,
    [TempUnit.fahrenheit]: 1,
    [TempUnit.kelvin]: 1,
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
      case TempUnit.fahrenheit:
        return ((value - 32) * 5) / 9;
      case TempUnit.kelvin:
        return value - 273.15;
      default:
        return value;
    }
  }

  private fromCelsius(celsius: number, toUnit: TempUnit): number {
    switch (toUnit) {
      case TempUnit.fahrenheit:
        return (celsius * 9) / 5 + 32;
      case TempUnit.kelvin:
        return celsius + 273.15;
      default:
        return celsius;
    }
  }
}
