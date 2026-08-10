const WeatherButton = ({ onClick, loading }) => {
    return (
        <button type="button" className="btn" onClick={onClick} disabled={loading}>
            {loading ? '불러오는 중...' : '현재 위치 새로고침'}
        </button>
    );
};

export default WeatherButton;
