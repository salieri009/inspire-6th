import '../weather.css';

const WeatherBox = ({ weather }) => {
    if (!weather) {
        return null;
    }

    const { name, main, weather: weatherDetails, wind } = weather;
    const description = weatherDetails?.[0]?.description ?? '';
    const icon = weatherDetails?.[0]?.icon;

    return (
        <div className="weather-box">
            <div className="weather-info">
                <span className="weather-city">{name}</span>
                {icon && (
                    <img
                        className="weather-icon"
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                    />
                )}
                <span className="weather-temperature">{Math.round(main?.temp)}&deg;C</span>
                <span className="weather-description">{description}</span>
                <span className="weather-detail">
                    체감 {Math.round(main?.feels_like)}&deg;C · 습도 {main?.humidity}% · 풍속 {wind?.speed}m/s
                </span>
            </div>
        </div>
    );
};

export default WeatherBox;
