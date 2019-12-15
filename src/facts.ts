import moment = require("moment");
import WeightMeasurement from "./model/weight";

const Birthday: moment.Moment = moment("2019-05-01");

const WeightMeasures: WeightMeasurement[] = [];
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-06-27", 2.3));
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-07-12", 3.06));
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-08-03", 4.3));
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-08-23", 6.13));
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-11-18", 8.4));
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-12-13", 9.6));

export {Birthday, WeightMeasures};
