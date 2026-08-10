import { useEffect, useState } from 'react';
import useOpenWeather from '../../../hooks/useOpenWeather';

// 도시 목록에서 고르면 도시명으로, 처음 들어오면 geolocation 으로 조회한다.
// 실제 API 호출/로딩/에러 상태는 useOpenWeather 훅이 관리하므로 이 페이지는
// "무엇을 보여줄지"만 신경 쓰면 된다.
const WeatherPage = () => {
    const cities = ['Seoul, KR', 'Busan, KR', 'Daejeon, KR', 'Incheon, KR'];

    const [city, setCity] = useState('');
    const { weather, loading, error, fetchByCity, locate } = useOpenWeather();

    useEffect(() => {
        locate();
    }, [locate]);

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setCity(selectedCity);
        if (selectedCity) {
            fetchByCity(selectedCity);
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
            {/* 원본 API 응답을 그대로 확인하기 위한 디버그용 출력 (features/openapi/ui/WeatherBox 는
                같은 데이터를 사람이 보기 좋은 카드 형태로 가공해서 보여준다) */}
            {weather && <pre>{JSON.stringify(weather, null, 2)}</pre>}
        </div>
    );
};

export default WeatherPage;
