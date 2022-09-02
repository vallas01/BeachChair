import { useEffect, useState } from "react";
import './Weather.css'


function Weather() {
    const [apiData, setApiData] = useState({});
    
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=29.9012&lon=-81.3124&appid=${apiKey}`;

    useEffect(() => {
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => setApiData(data));
      }, [apiUrl]);
 
    
    const kelvinToFarenheit = (k) => {
    return ((k - 273.15)*1.8+32).toFixed(0);
    };
    console.log(apiData)

    return (
        <>{apiData.main ? (

          <div className="scroll-left">
          <p>
          Today's forecast calls for a high of <strong>{kelvinToFarenheit(apiData.main.temp_max)}</strong>&deg;F
          and a low of <strong>{kelvinToFarenheit(apiData.main.temp_min)}</strong>&deg;F . . . 
          Currently it is <strong>{kelvinToFarenheit(apiData.main.temp)}</strong>&deg;F
          </p>
          <div className="toggleButton">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          </div>
          
        ) : (
            <h1>Loading</h1>
        )}
        </>        
    
        
    )
}

export default Weather;