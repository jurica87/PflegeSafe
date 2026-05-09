# Löschkonzept

- Nutzer kann Löschung beantragen.
- Auth-User-Löschung cascaded Profile, Examen, Dokumente, Tags und Freigaben.
- Storage-Dateien werden durch Cleanup-Job anhand `file_path` gelöscht.
- Audit-Logs werden nach rechtlich definierter Aufbewahrungsfrist anonymisiert oder gelöscht.
