import React from 'react';
import RadarChart from '../components/chart.js';

class ChartPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Radar Chart</h1>
        <RadarChart />
      </div>
    );
  }
}

export default ChartPage;