import {Field} from "./field";

/**
 * Data class for a line
 * Lines are data groups (fields) with an identifier
 *
 * @author Liscare
 */
export class Line {
  public id: number = 0
  public fields: Field[] = []
}
