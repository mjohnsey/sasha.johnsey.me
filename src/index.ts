import Chart from "chart.js";
import moment from "moment";
import "moment-precise-range-plugin";
import {Birthday, WeightMeasures} from "./facts";

const relativeAgeId = "#realtiveAge";
const birthdateId = "#birthdate";

const setRelativeAge = (age) => $(relativeAgeId).text(age);

const setBirthdate = (birthdate: moment.Moment) => $(birthdateId).text(`Born on ${birthdate.format("MMMM Do YYYY")}`);

const relativeAgeText = (birthdate) => {
  const today = moment().startOf("day");
  const weeks = today.diff(birthdate, "week");

  let age = `${birthdate.preciseDiff(today)} old`;
  if (weeks < 24) {
    age = `${age} (${weeks} weeks)`;
  }
  return age;
};

const buildWeighChartConfig = (weightArray) => {
  const dataValues = [];
  weightArray.forEach((weight) => {
    dataValues.push({ x: weight.Date.format("YYYY-MM-DD"), y: weight.Weight });
  });
  const config = {
    data: {
      datasets: [{
        data: dataValues,
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
        text: "Sasha's Weight",
      },
    },
    type: "line",
  };
  return config;
};

const buildWeightChart = (weightArray) => {
  const ctx = $("#weightChart");
  const config = buildWeighChartConfig(weightArray);
  // https://www.chartjs.org/docs/latest
  const weightChart = new Chart(ctx, config); // eslint-disable-line no-unused-vars
};

setBirthdate(Birthday);
setRelativeAge(relativeAgeText(Birthday));
buildWeightChart(WeightMeasures);
