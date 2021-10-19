import {
  humidity as humidityIcon,
  pressure as pressureIcon,
  wind as windIcon,
  temp as sunsetIcon,
  tempDown,
  tempUp,
} from "../../assets/icons";

import "./weatherinfo.css";

const getTime = (timeStamp) => {
  return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
    timeStamp * 1000
  ).getMinutes()}`;
};

const getLocalTime = (timezone_offset) => {
  var currDate = new Date();
  var offsetHours = Math.floor(timezone_offset / 3600);
  var offsetMinutes = (timezone_offset / 60) - (offsetHours * 60);
  currDate.setHours(currDate.getUTCHours() + (offsetHours));
  currDate.setMinutes(currDate.getUTCMinutes() + (offsetMinutes));
  var hours = currDate.getHours();
  var AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = "0" + (hours % 12) || 12;
  var minutes = "0" + currDate.getMinutes() ;
  var finalTime = "Local Time: " + hours.substr(-2) + ":" + minutes.substr(-2) + " " + AmOrPm; 
  return finalTime;
};

const WeatherInfo = (props) => {
  const { data } = props;
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const { temp, temp_max, temp_min, pressure, humidity } = data.main;
  const isDay = data?.weather[0].icon?.includes("d");
  console.log(data);
  return (
    <div class="grid-container">
      <div class="top-row">
        <div class="grid-item item1">
          <b>{data.name}</b>, {data.sys.country}<br/>
          <div class="grid-item">
            {getLocalTime(data.timezone)}
          </div>
        </div>
        <div class="grid-item item2">
          <div className="temperature-info">
            <div className="temp-head">{`${temp} °C`}</div>
          </div>
        </div>
      </div>

      <div class="middle-row">
        <div class="grid-item item3">
          <div className="max-min-temp">
            <img src={tempUp} className="weather-icon" alt="temp-icon" />{" "}
            {temp_max}°C
            <img src={tempDown} className="weather-icon" alt="temp-icon" />{" "}
            {temp_min}°C
          </div>
        </div>
        <div class="grid-item item4">
          <div className="temp-status-icon">
            <img src={icon} alt="weather-icon" />
          </div>
          <div className="temp-status">{data.weather[0].main}</div>
        </div>
      </div>

      <div class="grid-item item5">
        <div class="other-information">
          <div class="grid-sub-item">
            <div class="item-icon">
              <img
                src={humidityIcon}
                className="weather-icon"
                alt="temp-icon"
              />
            </div>
            <div class="item-information">
              <div class="item-value">{humidity}%</div>
              <div class="item-name">Humidity</div>
            </div>
          </div>
          <div class="grid-sub-item">
            <div class="item-icon">
              <img
                src={pressureIcon}
                className="weather-icon"
                alt="temp-icon"
              />
            </div>
            <div class="item-information">
              <div class="item-value">{pressure}hPa</div>
              <div class="item-name">Pressure</div>
            </div>
          </div>
          <div class="grid-sub-item">
            <div class="item-icon">
              <img src={sunsetIcon} className="weather-icon" alt="temp-icon" />
            </div>
            <div class="item-information">
              <div class="item-value">
                {`${getTime(data?.sys[isDay ? "sunset" : "sunrise"])}`}{" "}
                {isDay ? "am" : "pm"}
              </div>
              <div class="item-name">{isDay ? "Sunrise" : "Sunset"}</div>
            </div>
          </div>
          <div class="grid-sub-item">
            <div class="item-icon">
              <img src={windIcon} className="weather-icon" alt="temp-icon" />
            </div>
            <div class="item-information">
              <div class="item-value">{data.wind.speed}m/s</div>
              <div class="item-name">Wind</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
