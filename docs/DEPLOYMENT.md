# Deployment

1. Supabase self-hosted auf EU/deutschem VPS installieren.
2. Migrationen aus `supabase/migrations` einspielen.
3. `.env` aus `.env.example` erstellen.
4. DNS auf VPS setzen.
5. `docker compose -f docker/docker-compose.yml up -d --build` ausführen.
6. Caddy stellt TLS automatisch bereit.
