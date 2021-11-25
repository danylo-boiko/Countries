import { Guid } from "guid-typescript";
import { Continent } from "../enums/continent.enum";

export interface Country {
  id: Guid,
  name: string,
  area: number,
  continent: Continent,
  description: string
}
