import React, { useEffect, useState } from 'react';
import axios from '../../axios-covid';
import { Line, Bar } from 'react-chartjs-2';
import classes from './Chart.module.css';

const Chart = ({
  data: { confirmed, recovered, deaths, lastUpdate },
  country,
}) => {
  let lineChart;
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    axios
      .get('/daily')
      .then((res) => {
        const modifiedData = res.data.map((Data) => ({
          confirmed: Data.confirmed.total,
          deaths: Data.deaths.total,
          date: Data.reportDate,
        }));
        setDailyData(modifiedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (dailyData) {
    lineChart = dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: 'rgba(0, 255, 0, 0.5)',
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.5)',
              fill: true,
            },
          ],
        }}
      />
    ) : null;
  }
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            hoverBackgroundColor: [
              'rgba(0, 77, 153)',
              'rgba(30, 102, 49)',
              'rgba(255, 51, 51)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={classes.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
