import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// features/forcast/pages/WeatherPage 와 features/openapi/page/MapWeatherPage 가
// 둘 다 "현재 위치 날씨 가져오기"(geolocation → axios 호출 → loading/error 상태)를
// 각자 구현하고 있어서 하나로 뺐다. 두 페이지는 이 훅으로 데이터만 받아오고,
// 지도 마커 위치처럼 페이지 고유의 UI 상태는 각 컴포넌트에 그대로 둔다.
const useOpenWeather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 요청이 끝나기 전에 컴포넌트가 언마운트되면(페이지 이동 등) setState 를
    // 호출하지 않기 위한 가드. AbortController 대신 플래그만으로 충분한 이유는
    // 이 훅이 화면에 붙어있는 동안만 값을 보여주면 되고, 실제 취소가 필요한
    // 요청(결제 등)이 아니기 때문이다.
    const cancelledRef = useRef(false);
    useEffect(() => {
        return () => {
            cancelledRef.current = true;
        };
    }, []);

    const fetchWeather = useCallback(async (params) => {
        if (!WEATHER_API_KEY) {
            setError('REACT_APP_OPENWEATHER_API_KEY 가 설정되어 있지 않습니다.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(WEATHER_API_URL, {
                params: { ...params, appid: WEATHER_API_KEY, units: 'metric', lang: 'kr' },
            });
            if (!cancelledRef.current) {
                setWeather(response.data);
            }
        } catch (requestError) {
            if (!cancelledRef.current) {
                setError('날씨 정보를 불러오지 못했습니다.');
                console.error(requestError);
            }
        } finally {
            if (!cancelledRef.current) {
                setLoading(false);
            }
        }
    }, []);

    const fetchByCoords = useCallback((lat, lon) => fetchWeather({ lat, lon }), [fetchWeather]);
    const fetchByCity = useCallback((city) => fetchWeather({ q: city }), [fetchWeather]);

    // 브라우저 위치 정보로 날씨를 가져온다.
    // fallback 을 넘기면(예: 서울시청 좌표) 위치 조회 자체가 실패했을 때도
    // 화면이 비어있지 않도록 그 좌표로 대신 조회한다. onPosition 은 지도 마커처럼
    // 좌표 자체가 필요한 화면(MapWeatherPage)을 위한 선택적 콜백이다.
    const locate = useCallback(
        ({ fallback, onPosition } = {}) => {
            if (!navigator.geolocation) {
                setError('이 브라우저는 위치 정보를 지원하지 않습니다.');
                if (fallback) {
                    onPosition?.(fallback);
                    fetchByCoords(fallback.lat, fallback.lng);
                }
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    onPosition?.({ lat, lng });
                    fetchByCoords(lat, lng);
                },
                (geoError) => {
                    console.error('Failed to get location', geoError);
                    setError(
                        fallback
                            ? '현재 위치를 가져오지 못해 기본 위치 기준으로 표시합니다.'
                            : '현재 위치를 가져오지 못했습니다.'
                    );
                    if (fallback) {
                        onPosition?.(fallback);
                        fetchByCoords(fallback.lat, fallback.lng);
                    }
                }
            );
        },
        [fetchByCoords]
    );

    return { weather, loading, error, fetchByCoords, fetchByCity, locate };
};

export default useOpenWeather;
