---
title: "IT-sikkerhed er fundamentet – ikke et add-on"
date: "2025-08-13"
tags: ["Security", "Web", "DevOps", "Best Practices"]
lang: "da"
---

For mange virksomheder bliver IT-sikkerhed først tænkt på, **når skaden allerede er sket**.  
Men den holdning er både dyr, risikabel og kortsigtet.

At tilføje sikkerhed *bagefter* er som at montere lås på døren **efter** indbruddet.  
**Sikkerhed skal designes ind fra starten** — i arkitekturen, koden, processerne og kulturen.

## Hvorfor sikkerhed skal med fra start
1. **Billigere på lang sigt** – Det koster langt mindre at forebygge end at udbedre et sikkerhedsbrud.
2. **Mindre angrebsflade** – God arkitektur fjerner unødvendige adgangspunkter.
3. **Compliance & tillid** – GDPR, ISO27001 m.m. kræver dokumenterede sikkerhedsforanstaltninger.
4. **Brandbeskyttelse** – Ét datalæk kan ødelægge omdømmet permanent.

## Min sikkerhedstjekliste
- **Threat modeling** på API’er og auth-flow, inden første linje kode.
- **Least privilege** – alle nøgler, secrets og brugere får kun *det absolut nødvendige*.
- **Automatiserede sikkerhedstests** mod OWASP Top 10 og konfigurationsfejl.
- **Observability** – audit logs, rate limits og real-time alarmer.
- **Security by design** – alle features vurderes på sikkerhedskonsekvenser.

## Bottom line
IT-sikkerhed er **ikke** et add-on.  
Det er et grundlæggende lag i al software, som skal tænkes ind *fra idé til deployment*.  
Jo før vi gør det, jo sikrere — og billigere — bliver det.

> “Security is not a product, but a process.” – Bruce Schneier
