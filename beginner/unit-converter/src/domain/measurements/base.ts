export abstract class Base<T extends string> {
  constructor(
    protected value: number,
    protected fromUnit: T,
  ) {}

  protected abstract readonly unitMap: Record<T, number>;

  public convertTo(toUnit: T): number {
    if (this.fromUnit === toUnit) return this.value;
    return this.performConversion(this.value, this.fromUnit, toUnit);
  }

  protected abstract performConversion(
    value: number,
    fromUnit: T,
    toUnit: T,
  ): number;
}
