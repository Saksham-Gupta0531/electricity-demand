import './Home.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [forecastData, setForecastData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [predictedValue, setPredictedValue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForecastData();
  }, []);

  const fetchForecastData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/details/');
      const data = await response.json();
      setForecastData(data[0].forecast_data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch forecast data: " + error.message);
    }
  };

  const handleValueChange = (event) => {
    setSelectedIndex(Number(event.target.value));
    setPredictedValue(null); // Reset prediction when new point is selected
  };

  const handlePredict = () => {
    if (selectedIndex !== '') {
      setPredictedValue(forecastData[selectedIndex]);
    } else {
      setError("Please select a forecast point before predicting.");
    }
  };

  return (
    <div>
      <div className='title'>Forecast Energy Consumption in Delhi Region</div>
      <div className='ForcastBtn'>
        <select class = "select"
          value={selectedIndex} 
          onChange={handleValueChange}
        >
          <option class="select" value="" disabled>Select a forecast Day</option>
          {forecastData.map((_, index) => (
            <option key={index} value={index}>Day {index + 1}</option>
          ))}
        </select>
        <button type="button" class="btn btn-primary" onClick = {handlePredict}>Predict</button>
        {predictedValue !== null && (
          <div class = "predict">
            <h2>Predicted Energy Consumption:</h2>
            <p>{predictedValue.toFixed(2)}</p>
          </div>
        )}
        {error && (
          <div>
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;