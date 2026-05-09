# Datenmodell

PflegeSafe trennt den Pflichtnachweis `exam_documents` strikt von frei definierbaren `documents`.

- `documents.document_type` ist `text not null` und kein Enum.
- `document_tags.tag` ist freier Text.
- `profiles.profile_status` wird aus dem Examensstatus synchronisiert.
- `share_links` und `share_link_documents` bereiten zeitlich begrenzte Freigaben vor.
- `verification_logs` speichert nachvollziehbare Prüfschritte.
