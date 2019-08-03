import moment from 'moment';
import 'moment-precise-range-plugin';
import Chart from 'chart.js';
import facts from './facts';


const relativeAgeId = '#realtiveAge';
const birthdateId = '#birthdate';

const setRelativeAge = age => $(relativeAgeId).text(age);

const setBirthdate = birthdate => $(birthdateId).text(`Born on ${birthdate.format('MMMM Do YYYY')}`);

const relativeAgeText = (birthdate) => {
  const today = moment().startOf('day');
  const weeks = today.diff(birthdate, 'week');

  let age = `${birthdate.preciseDiff(today)} old`;
  if (weeks < 24) {
    age = `${age} (${weeks} weeks)`;
  }
  return age;
};

const buildWeighChartConfig = (weightArray) => {
  const dataValues = [];
  weightArray.forEach((weight) => {
    dataValues.push({ x: weight.day, y: weight.value });
  });
  const config = {
    type: 'line',
    data: {
      datasets: [{
        label: 'Weight (lbs)',
        fill: false,
        data: dataValues,
      }],
    },
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      title: {
        display: true,
        text: 'Sasha\'s Weight',
      },
      scales: {
        xAxes: [{
          type: 'time',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date',
          },
          ticks: {},
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Weight (lbs)',
          },
        }],
      },
    },
  };
  return config;
};

const buildWeightChart = (weightArray) => {
  const ctx = $('#weightChart');
  const config = buildWeighChartConfig(weightArray);
  const weightChart = new Chart(ctx, config); // eslint-disable-line no-unused-vars
};

const birthdate = moment(facts.birthdate);
setBirthdate(birthdate);
setRelativeAge(relativeAgeText(birthdate));
buildWeightChart(facts.weight);
