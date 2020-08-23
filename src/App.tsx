import React from 'react';
import './App.scss';
import moment from 'moment';
import "moment-precise-range-plugin";
import Iframe from 'react-iframe';
import * as _ from 'lodash';
import {Line} from 'react-chartjs-2';

class Weight {
  constructor(readonly date: moment.Moment, readonly weight: number) { }

  public asChartData() {
    return { x: this.date.format("YYYY-MM-DD"), y: this.weight };
  }
}

type AppState = {
  dob: string,
  weights: Weight[]
}


class App extends React.Component<{}, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      dob: "2019-05-01",
      weights: [new Weight(moment("2019-06-27"), 2.3),
      new Weight(moment("2019-07-12"), 3.06),
      new Weight(moment("2019-08-03"), 4.3),
      new Weight(moment("2019-08-23"), 6.13),
      new Weight(moment("2019-11-18"), 8.4),
      new Weight(moment("2019-12-13"), 9.6),
      new Weight(moment("2020-01-03"), 9.3),
      new Weight(moment("2020-06-09"), 10.10),
      new Weight(moment("2020-07-03"), 11),
      new Weight(moment("2020-08-21"), 11.3),],
    }
  }

  birthdate() {
    return moment(this.state.dob)
  }

  relativeAgeDate() {
    const today = moment().startOf("day");

    const diffBreakdown = this.birthdate().preciseDiff(today, true) as any;
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
  }

  weightData() {
    const weightChartData = _.map(this.state.weights, w => w.asChartData());
    return weightChartData;
  }

  chartData() {
    const data = {
      datasets: [{
        data: _.map(this.state.weights, (weight) => weight.asChartData()),
        fill: false,
        label: "Weight (lbs)",
      }],
    };
    return data;
  }

  chartOptions() {
    const mostRecentMeasure = _.maxBy(this.state.weights, (measure) => measure.date);
    if (_.isUndefined(mostRecentMeasure)) {
      throw new Error('problem figuring out most recent measure');
    }
    return {
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
            text: `Sasha's Weight (Last: ${mostRecentMeasure.weight} on ${mostRecentMeasure.date.format("YYYY-MM-DD")})`,
          },
        }
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <div className="hero-image">
          <img src={`${window.location.origin}/sasha.png`} alt="Sasha"/>
        </div>
        <h1>Sasha Angel Johnsey</h1>
      </header>
      <main>
          <p>Born on {this.state.dob}</p>
          <p>{this.relativeAgeDate()}</p>
          <p>Food: <a href="https://smile.amazon.com/alimento-perros-adultos-HEALTH-NUTRITION/dp/B007PPTJLE/ref">Royal Canin Adult Small Breed</a></p>
            <Line data={this.chartData()} options={{...this.chartOptions(), ...{ maintainAspectRatio: true }}}/>
          <p>Sasha's Vet: <a href="https://thepethospitals.com/vets/lee-ann-newman">Lee Ann Newman, DVM</a></p>
          <div className="iframe">
            <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13059.689735583437!2d-89.75178085424798!3d35.08367076131394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x54b0ac735fed867e!2sThe+Pet+Hospitals!5e0!3m2!1sen!2sus!4v1564891889806!5m2!1sen!2sus" 
                    width="400px"
                    height="300px"
                    title="Vet Google Maps"
                    className="iframe"
                    display="block"
            />
          </div>
      </main>
      <hr />
      <footer>
      © {moment().format('YYYY')} Michael Johnsey
      </footer>
    </div>
    )
  }
}

export default App;
