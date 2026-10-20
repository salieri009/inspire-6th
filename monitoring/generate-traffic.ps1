# API Gateway(8080)로 요청을 반복 전송해 Grafana 대시보드에 데이터가 쌓이게 합니다.
# 사용법: .\monitoring\generate-traffic.ps1 -Seconds 120
param([int]$Seconds = 60)

$gw = 'http://localhost:8080'
$paths = @(
    '/user-service/health-check',
    '/user-service/welcome',
    '/catalog-service/health-check',
    '/catalog-service/catalogs',
    '/order-service/health-check',
    '/catalog-service/not-found'          # 일부러 404
)
# order-service 의 주문 조회는 실습용 장애 API (약 10초 지연 후 500) → 5회에 1번만, 응답은 기다리지 않음
$slow = '/order-service/no-such-user/orders'
$end = (Get-Date).AddSeconds($Seconds)
$stats = @{}
$n = 0
while ((Get-Date) -lt $end) {
    foreach ($p in $paths) {
        try { $code = (Invoke-WebRequest "$gw$p" -TimeoutSec 5 -SkipHttpErrorCheck).StatusCode } catch { $code = 'ERR' }
        $stats["$p $code"]++
    }
    if ($n++ % 5 -eq 0) {
        Start-ThreadJob { try { Invoke-WebRequest $using:gw$using:slow -TimeoutSec 30 -SkipHttpErrorCheck | Out-Null } catch {} } | Out-Null
        $stats["$slow (장애 API, 비동기)"]++
    }
    Start-Sleep -Milliseconds (Get-Random -Minimum 100 -Maximum 400)
}
$stats.GetEnumerator() | Sort-Object Name | ForEach-Object { "{0,-50} {1,5}회" -f $_.Name, $_.Value }
