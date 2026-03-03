import {
  Length,
  LengthUnit,
  Temperature,
  TempUnit,
  Weight,
  WeightUnit,
} from "../domain/measurements";
import type { Measurement } from "../models/measurement";

export class UnitController {
  async lengthConverter(req: Bun.BunRequest): Promise<Response> {
    const body = (await req.json()) as Measurement;

    const unitFrom = LengthUnit[body.unitFrom as keyof typeof LengthUnit];
    const unitTo = LengthUnit[body.unitTo as keyof typeof LengthUnit];

    if (unitFrom == undefined || unitTo == undefined) {
      return Response.json("error");
    }
    const result = new Length(body.value, unitFrom).convertTo(unitTo);

    const response = <Measurement>{
      value: result,
      unitFrom: body.unitFrom,
      unitTo: body.unitTo,
    };
    return Response.json(response);
  }

  async tempConverter(req: Bun.BunRequest): Promise<Response> {
    const body = (await req.json()) as Measurement;

    const unitFrom = TempUnit[body.unitFrom as keyof typeof TempUnit];
    const unitTo = TempUnit[body.unitTo as keyof typeof TempUnit];

    if (unitFrom == undefined || unitTo == undefined) {
      return Response.json("error");
    }
    const result = new Temperature(body.value, unitFrom).convertTo(unitTo);

    const response = <Measurement>{
      value: result,
      unitFrom: body.unitFrom,
      unitTo: body.unitTo,
    };

    return Response.json(response);
  }

  async weightConverter(req: Bun.BunRequest): Promise<Response> {
    const body = (await req.json()) as Measurement;

    const unitFrom = WeightUnit[body.unitFrom as keyof typeof WeightUnit];
    const unitTo = WeightUnit[body.unitTo as keyof typeof WeightUnit];

    if (unitFrom == undefined || unitTo == undefined) {
      return Response.json("error");
    }
    const result = new Weight(body.value, unitFrom).convertTo(unitTo);

    const response = <Measurement>{
      value: result,
      unitFrom: body.unitFrom,
      unitTo: body.unitTo,
    };

    return Response.json(response);
  }
}
