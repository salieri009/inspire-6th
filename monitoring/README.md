# ch14-prometheus

ch13 위에 Prometheus 수집 + Grafana 대시보드 추가. (관측 스택: `C:\Users\user\tools\observability`)

- 서비스(apigateway, user, order, catalog): `micrometer-registry-prometheus` 추가, `/actuator/prometheus` 노출
- Prometheus: Eureka(8761) 로 인스턴스 자동 발견 (random port OK)
- Grafana: `grafana/dashboards` 자동 로드 (MSA Overview, JVM Micrometer)

```powershell
C:\Users\user\tools\observability\start-all.ps1
mvn -DskipTests package -pl service-discovery,apigateway-service,user-service,order-service,catalog-service
.\monitoring\run-msa.ps1
.\monitoring\generate-traffic.ps1 -Seconds 120
```

Grafana http://localhost:3000 · Prometheus http://localhost:9090/targets
