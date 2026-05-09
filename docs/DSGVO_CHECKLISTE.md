# DSGVO-Checkliste

- Selbsthosting auf deutschem oder europäischem VPS planen.
- Keine externen Analytics, Tracking-Skripte, Fonts oder CDN-Abhängigkeiten für Kernfunktionen.
- Supabase Storage Buckets für Examens- und Nutzerdokumente privat halten.
- Öffentliche QualiPass-Ansicht nur über freigegebene, minimierte Daten aus `get_public_profile`.
- RLS auf allen nutzerbezogenen Tabellen aktivieren.
- Account-Export, Löschung, Audit-Logs und Prüfprotokolle produktiv finalisieren.
