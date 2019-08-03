import moment from "moment";

export default class WeightMeasurement {
  public static BuildWeightMeasurement(date: string, weight: number): WeightMeasurement {
    return new WeightMeasurement(moment(date).startOf("day"), weight);
  }

  public Date: moment.Moment;
  public Weight: number;
  constructor(date: moment.Moment, weight: number) {
    this.Date = date;
    this.Weight = weight;
  }
}
