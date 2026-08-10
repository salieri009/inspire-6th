import { useCallback, useEffect, useState } from 'react';
import useOpenWeather from '../../../hooks/useOpenWeather';
import KakaoMap from '../ui/KakaoMap';
import WeatherBox from '../ui/WeatherBox';
import WeatherButton from '../ui/WeatherButton';
import '../weather.css';

// 위치 정보를 가져오지 못했을 때 기본으로 보여줄 위치 (서울시청)
const DEFAULT_POSITION = { lat: 37.5665, lng: 126.978 };

// 날씨 데이터(weather/loading/error)는 useOpenWeather 훅이 들고 있고,
// 이 페이지는 "지도에 찍을 좌표(position)"만 자기 상태로 따로 관리한다.
// 좌표는 지도 마커 위치를 그리는 데도 쓰이므로 훅 안으로 넣지 않았다.
const MapWeatherPage = () => {
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const { weather, loading, error, locate } = useOpenWeather();

    const locateAndFetch = useCallback(() => {
        locate({ fallback: DEFAULT_POSITION, onPosition: setPosition });
    }, [locate]);

    useEffect(() => {
        locateAndFetch();
    }, [locateAndFetch]);

    return (
        <div className="container">
            <h2>내 위치 지도 &amp; 날씨</h2>
            <WeatherButton onClick={locateAndFetch} loading={loading} />
            {error && <p className="weather-error">{error}</p>}
            <KakaoMap lat={position.lat} lng={position.lng} markerTitle={weather?.name ?? '현재 위치'} />
            <WeatherBox weather={weather} />
        </div>
    );
};

export default MapWeatherPage;
