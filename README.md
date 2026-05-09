# PflegeSafe

PflegeSafe ist ein skalierbares, produktionsnahes SaaS-Fundament für Pflegekräfte: ein sicherer Qualifikations- und Zertifikatsspeicher mit Pflichtnachweis Examen/Berufsurkunde, flexiblen Nachweisen, QualiPass-Link, QR-Code, Admin-Prüfung und DSGVO-orientierter Architektur.

## Architektur

- Frontend: React + Vite + TypeScript
- Styling: Tailwind CSS, keine externen Fonts
- Backend: Supabase self-hosted
- Datenbank: PostgreSQL mit Row Level Security
- Auth: Supabase Auth mit E-Mail/Passwort, E-Mail-Verifikation und Password Reset
- Storage: Supabase Storage mit privaten Buckets und Signed URLs
- Deployment: Docker Compose + Caddy
- PWA: Manifest und installierbare Basis vorhanden
- Keine Firebase-/Firestore-Abhängigkeit

## Kernprinzipien

- Normale Nachweise haben freie `document_type`-Textfelder und freie Tags.
- Es gibt keine harte Zertifikatsliste und kein Enum für normale Zertifikatstypen.
- Nur das Examen / die Berufsurkunde ist ein eigenes Pflichtmodul.
- Ohne verifiziertes Examen wird der QualiPass mit „Examen noch nicht verifiziert“ gekennzeichnet.
- Öffentliche Profile zeigen ausschließlich explizit freigegebene, minimierte Daten.

## Projektstruktur

```text
src/components    UI-, Layout-, Dokument-, Examen-, Profil-, Sharing- und Admin-Komponenten
src/pages         Auth, Dashboard, Uploads, QualiPass, Admin, Datenschutz, Account
src/lib           Supabase-Kapselung und Datenzugriff
src/services      Businesslogik für Profilstatus, Prüfung, Suche, Audit und Export
src/types         Zentrale TypeScript-Domänentypen
src/utils         QR-, Datums-, Validierungs-, Datei- und Public-ID-Helfer
supabase/migrations PostgreSQL Schema, RLS, Storage Policies, Indexe und Funktionen
docker            Docker Compose und Caddy-Konfiguration
docs              DSGVO-, Sicherheits- und Betriebsdokumentation
```

## Lokale Entwicklung

```bash
npm install
cp .env.example .env.local
npm run dev
```

Erforderliche Variablen:

```bash
VITE_SUPABASE_URL=https://supabase.example.local
VITE_SUPABASE_ANON_KEY=replace-with-anon-key
```

## Datenbank einrichten

Die Migrationen liegen in `supabase/migrations`:

1. `001_init.sql` Tabellen und freie Dokumenttypen
2. `002_rls_policies.sql` Rollen- und RLS-Grundschutz
3. `003_storage_policies.sql` private Storage-Buckets und Pfadregeln
4. `004_indexes.sql` Indexe für häufige Abfragen
5. `005_functions.sql` Profilstatus, Public RPC, Trigger und Prüfprotokolle

## Deployment

```bash
cp .env.example .env
docker compose -f docker/docker-compose.yml up -d --build
```

Für Produktion sollte Supabase self-hosted separat betrieben, Backups aktiviert, SMTP korrekt konfiguriert und die Domain in `DOMAIN` gesetzt werden.

## DSGVO-Hinweise

PflegeSafe ist vorbereitet für:

- Selbsthosting in der EU/Deutschland
- Datenminimierung
- private Dokumente
- sichere Signed URLs
- Rollenmodell und Auditierbarkeit
- Datenexport
- Löschkonzept
- TOM, Rollen-/Rechtekonzept und Verzeichnis der Verarbeitungstätigkeiten

Rechtstexte und Prozesse sind Platzhalter und müssen vor Produktivbetrieb juristisch geprüft werden.
