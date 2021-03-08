import {FieldStyle} from "./field-style";

/**
 * Data class for a field
 * Fields are data inside a line
 *
 * @author Liscare
 */
export class Field {
  public id: number = 0
  public data: any = ""
  public style: FieldStyle | undefined | null
}
