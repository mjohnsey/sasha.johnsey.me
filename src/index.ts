import Chart, { ChartConfiguration } from "chart.js";
import _ from "lodash";
import moment from "moment";
import "moment-precise-range-plugin";
import {Birthday, WeightMeasures} from "./facts";
import WeightMeasurement from "./model/weight";

const relativeAgeId = "#realtiveAge";
const birthdateId = "#birthdate";

const setRelativeAge = (age): JQuery<HTMLElement> => $(relativeAgeId).text(age);

const setBirthdate = (birthdate: moment.Moment) => $(birthdateId).text(`Born on ${birthdate.format("MMMM Do YYYY")}`);

const relativeAgeText = (birthdate: moment.Moment): string => {
  const today = moment().startOf("day");
  const weeks = today.diff(birthdate, "week");

  const diffBreakdown = birthdate.preciseDiff(today, true) as any;
  const years = diffBreakdown.years;
  const months = diffBreakdown.months;
  const days = diffBreakdown.days;
  let age = "";
  age += `${months} months`;
  age += ` ${days} days`;
  age += " old";
  if (years > 0) {
    let yearsString = `${years} year`;
    if (years > 1) {
      yearsString += "s";
    }
    age = `${yearsString} ${age}`;
  }
  return age;
};

const buildWeighChartConfig = (weightArray: WeightMeasurement[]): ChartConfiguration => {
  const mostRecentMeasure = _.maxBy(weightArray, (measure) => measure.Date);
  const config = {
    data: {
      datasets: [{
        data: _.map(weightArray, (weight) => weight.asChartData()),
        fill: false,
        label: "Weight (lbs)",
      }],
    },
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
          ticks: {},
          type: "time",
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Weight (lbs)",
          },
        }],
      },
      title: {
        display: true,
        text: `Sasha's Weight (Last: ${mostRecentMeasure.Weight} on ${mostRecentMeasure.Date.format("YYYY-MM-DD")})`,
      },
    },
    type: "line",
  };
  return config;
};

const buildWeightChart = (weightArray: WeightMeasurement[]): void => {
  const ctx = document.getElementById("weightChart") as HTMLCanvasElement;
  const config = buildWeighChartConfig(weightArray);
  // https://www.chartjs.org/docs/latest
  const weightChart = new Chart(ctx, config); // eslint-disable-line no-unused-vars
};

setBirthdate(Birthday);
setRelativeAge(relativeAgeText(Birthday));
buildWeightChart(WeightMeasures);
