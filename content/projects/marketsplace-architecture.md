

## 🎯 Formål
En skalerbar marketplace app, hvor sælgere kan oprette produkter og købere kan søge, lægge i kurv og gennemføre betaling. Orkestreret med kubernetes, rabbit MQ til kommunikation mellem brugere og graphQL til database håntering. 
Arkitekturen prioriterer **resiliens, skalerbarhed og hurtige releases**.

## 🧩 Overblik (komponenter)
1. **Web (Next.js)** – SSR/ISR, produkt-/kategori-sider, checkout UI.
2. **BFF / API-Gateway** – enkel edge-API til klienter, aggregerer kald til services.
3. **Auth** – GoogleAuth
4. **Catalog Service** – CRUD for produkter, kategorier, lager.
6. **Cart Service** – session/bruker-kurv (Redis for hurtighed).
7. **Order Service** – ordreoprettelse, status, idempotent opførsel.
10. **Notification Service** – e-mail/push (async via event bus/queue).
11. **Event Bus** – RabbitMQ for asynkrone beskeder mellem brugere til markedspladsen.
13. **Infra** – Kubernetes, Grafana + OpenTelemetry, R

## 🔁 Request- og event-flow
**Søg/vis produkt**

