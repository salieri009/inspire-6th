# run-msa.ps1 로 띄운 서비스를 종료합니다.
Get-ChildItem (Join-Path $PSScriptRoot 'run-logs') -Filter *.pid -ErrorAction SilentlyContinue | ForEach-Object {
    $id = [int](Get-Content $_.FullName)
    if (Get-Process -Id $id -ErrorAction SilentlyContinue) { Stop-Process -Id $id -Force; "{0,-20} 종료 (PID {1})" -f $_.BaseName, $id }
    Remove-Item $_.FullName
}
