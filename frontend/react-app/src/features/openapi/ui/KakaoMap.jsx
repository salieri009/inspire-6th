import { useEffect, useRef, useState } from 'react';

// 카카오맵 JS SDK 앱키. https://developers.kakao.com 에서 발급받아
// .env.development.local 의 REACT_APP_KAKAO_MAP_KEY 에 채운다.
// (플랫폼 설정에 사용 중인 도메인/포트를 등록해야 지도가 뜬다.)
const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;
const SCRIPT_ID = 'kakao-map-sdk';

let kakaoLoadPromise = null;

const loadKakaoMapScript = () => {
    if (window.kakao && window.kakao.maps) {
        return Promise.resolve(window.kakao);
    }

    if (kakaoLoadPromise) {
        return kakaoLoadPromise;
    }

    kakaoLoadPromise = new Promise((resolve, reject) => {
        const existingScript = document.getElementById(SCRIPT_ID);

        const handleLoad = () => {
            window.kakao.maps.load(() => resolve(window.kakao));
        };

        if (existingScript) {
            existingScript.addEventListener('load', handleLoad);
            existingScript.addEventListener('error', reject);
            return;
        }

        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
        script.addEventListener('load', handleLoad);
        script.addEventListener('error', reject);
        document.head.appendChild(script);
    });

    return kakaoLoadPromise;
};

const KakaoMap = ({ lat, lng, level = 4, markerTitle = '현재 위치' }) => {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!KAKAO_MAP_KEY) {
            setError('REACT_APP_KAKAO_MAP_KEY 가 설정되어 있지 않습니다.');
            return;
        }

        if (lat == null || lng == null) {
            return;
        }

        let cancelled = false;

        loadKakaoMapScript()
            .then((kakao) => {
                if (cancelled || !containerRef.current) {
                    return;
                }

                const center = new kakao.maps.LatLng(lat, lng);

                if (!mapRef.current) {
                    mapRef.current = new kakao.maps.Map(containerRef.current, {
                        center,
                        level,
                    });
                    markerRef.current = new kakao.maps.Marker({ position: center });
                    markerRef.current.setMap(mapRef.current);
                } else {
                    mapRef.current.setCenter(center);
                    markerRef.current.setPosition(center);
                }

                markerRef.current.setTitle(markerTitle);
            })
            .catch((loadError) => {
                console.error(loadError);
                setError('카카오맵을 불러오지 못했습니다.');
            });

        return () => {
            cancelled = true;
        };
    }, [lat, lng, level, markerTitle]);

    if (error) {
        return <p className="map-error">{error}</p>;
    }

    return <div ref={containerRef} className="kakao-map" />;
};

export default KakaoMap;
