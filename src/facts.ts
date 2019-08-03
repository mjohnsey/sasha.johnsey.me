import moment = require("moment");
import WeightMeasurement from "./model/weight";

const Birthday: moment.Moment = moment("2019-05-01");

const WeightMeasures: WeightMeasurement[] = [];
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-06-27", 2.3));
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-07-12", 3.06));
WeightMeasures.push(WeightMeasurement.BuildWeightMeasurement("2019-08-03", 4.3));

export {Birthday, WeightMeasures};
