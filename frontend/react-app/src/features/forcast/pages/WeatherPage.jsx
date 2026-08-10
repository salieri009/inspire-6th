import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const WeatherPage = () => {
    // 나라 + 국가 가져오기
    const cities = ["Seoul, KR", "Busan, KR", "Daejeon, KR", "Incheon, KR"];

    const [city, setCity] = useState('');
    // 객체 담기
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async (params) => {
        if (!API_KEY) {
            setError('REACT_APP_OPENWEATHER_API_KEY 가 설정되어 있지 않습니다.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(WEATHER_API_URL, {
                params: { ...params, appid: API_KEY, units: 'metric', lang: 'kr' },
            });
            setWeather(response.data);
        } catch (requestError) {
            setError('날씨 정보를 불러오지 못했습니다.');
            console.error(requestError);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('이 브라우저는 위치 정보를 지원하지 않습니다.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather({ lat, lon });
            },
            (err) => {
                console.error('Failed to get location', err);
                setError('현재 위치를 가져오지 못했습니다.');
            }
        );
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setCity(selectedCity);
        if (selectedCity) {
            fetchWeather({ q: selectedCity });
        }
    };

    return (
        <div>
            <h2>Weather</h2>
            <select value={city} onChange={handleCityChange}>
                <option value="">현재 위치</option>
                {cities.map((cityOption) => (
                    <option key={cityOption} value={cityOption}>
                        {cityOption}
                    </option>
                ))}
            </select>
            <p>Selected city: {city || '현재 위치'}</p>
            {loading && <p>날씨 정보를 불러오는 중입니다...</p>}
            {error && <p>{error}</p>}
            {weather && <pre>{JSON.stringify(weather, null, 2)}</pre>}
        </div>
    );
};

export default WeatherPage;
// 내 위치 기반 , 위도 경도 latitude && longitude
//stringify() : 객체를 문자열로 변환
// 예시
// const obj = { name: 'John', age: 30 };
///
