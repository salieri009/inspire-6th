# 빌드된 jar 로 MSA 서비스를 백그라운드 실행합니다. (Eureka 먼저 뜬 뒤 나머지)
# 빌드: mvn -DskipTests package -pl service-discovery,apigateway-service,user-service,order-service,catalog-service
# 사용법: .\monitoring\run-msa.ps1          / 종료: .\monitoring\stop-msa.ps1
$repo = Split-Path $PSScriptRoot -Parent
$logs = Join-Path $PSScriptRoot 'run-logs'
New-Item -ItemType Directory -Force $logs | Out-Null

# 저장소 루트의 .env (비밀값) 를 환경변수로 로드. 없으면 .env.example 참고
$envFile = Join-Path $repo '.env'
if (Test-Path $envFile) {
    Get-Content $envFile | Where-Object { $_ -match '^\s*[^#\s][^=]*=' } | ForEach-Object {
        $k, $v = $_ -split '=', 2
        [Environment]::SetEnvironmentVariable($k.Trim(), $v.Trim())
    }
} else { Write-Warning '.env 가 없습니다. .env.example 을 복사해 값을 채우세요.' }

function Start-Svc($name) {
    $jar = Get-ChildItem (Join-Path $repo "$name\target") -Filter *.jar | Where-Object Name -notlike '*plain*' | Select-Object -First 1
    if (-not $jar) { "{0,-20} jar 없음 (먼저 빌드하세요)" -f $name; return }
    $p = Start-Process java -ArgumentList '-jar', "`"$($jar.FullName)`"" -WorkingDirectory (Join-Path $repo $name) -WindowStyle Hidden -PassThru `
        -RedirectStandardOutput (Join-Path $logs "$name.out.log") -RedirectStandardError (Join-Path $logs "$name.err.log")
    Set-Content (Join-Path $logs "$name.pid") $p.Id
    "{0,-20} 시작 (PID {1})" -f $name, $p.Id
}

Start-Svc service-discovery
Write-Host 'Eureka(8761) 기동 대기...'
for ($i = 0; $i -lt 60; $i++) {
    try { Invoke-WebRequest http://localhost:8761/actuator/health -TimeoutSec 2 | Out-Null; break } catch {
        try { Invoke-WebRequest http://localhost:8761 -TimeoutSec 2 | Out-Null; break } catch { Start-Sleep 2 } }
}
'apigateway-service', 'user-service', 'order-service', 'catalog-service' | ForEach-Object { Start-Svc $_ }
"`n콘솔 로그: $logs"
