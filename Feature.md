# Rec'n'Sort

## Features

| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten |
|---------|--------------|-----------|--------------------|---------------------|
| **Aufnahme von Interviews** | Über ein entsprechendes UI können Audio-Dateien aufgenommen und gespeichert werden. Den Interviews können wichtige Informationen hinzugefügt werden. Datum und Uhrzeit werden automatisch gespeichert.| mittel (kritisch) | 1 Tag | UI, Datenbank, Javascript |
| **Upload von Interviews** | Über eine entsprechende UI können Audio-Dateien in Ordner hochgeladen und gespeichert werden. Den Interviews können wichtige Informationen hinzugefügt werden. Datum und Uhrzeit können hier manuell hinzugefügt werden.| mittel (kritisch) | 1 Tag | UI, Datenbank, Javascript |
| **Wiedergabe von Interviews** | Über ein entsprechendes UI können Audio-Dateien wiedergegeben werden.  | mittel (kritisch) | 1 Tag | UI, Datenbank, Javascript |
| **Annotation der Interviews** | Über ein entsprechendes UI können den Audio-Dateien Informationen zu Inteview-Partner, Interview-Leiter, Raumangabe, Schlagwörtern und einer kurzen Beschreibung beigefügt werden. Diese können außerdem im Nachhinein editiert werden.| mittel (unkritisch) | 1 Tag | UI, Datenbank, Javascript |
| **Suchfunktion** | Über eine Suchleiste(Freie Suche) kann der Nutzer anhand von Keywords nach Interviews suchen. | mittel (unkritisch) | 1 Tag | UI, Datenbank, Javascript |
| **Filterfunktion** | Über ein entsprechendes UI kann der Nutzer seine Suchanfrage weiter einschränken, indem er Filter setzt. Die Filter beziehen sich auf die zuvor gespeicherten Informationen. | gering (unkritisch) | 0.5 Tag | UI, Datenbank, Javascript |
| **Profil anlegen und speichern** | Nutzer können beim initialen Start der Anwendung ein Nutzerprofil erstellen, in dem ein eindeutiger Name und eine selbst wählbares Passwort gespeichert werden. Die Daten werden benötigt um die Interviews einem eindeutigen Nutzer zuordnen zu können. Die Profildaten werden dabei über eine entsprechende Maske erfasst und vor dem Speichern validiert. Das erstellte Profil wird dauerhaft gespeichert und steht anderen Anwendungskomponenten zur Verfügung. Zusammen mit den Daten wird eine eindeutige, für die Nutzer nicht sichtbare ID generiert und gespeichert. | hoch (unkritisch) | 2 Tage | UI, Datenbank, Javascript |
| **Orderstruktur für alle Nutzer** | Es existiert eine Odnersturktur, in welcher Interviews persistiert werden. Ornder können vom Nutzer erstellt, benannt und gelöscht werden. Nutzer haben ein Speicherlimit.  | hoch (unkritisch) | 2 Tage | UI, Datenbank, Javascript |
| **Sortierfunktion** | Über ein Drop-Down-Menü kann der Nutzer seine Ordner- und Dateistruktur chronologisch oder alphabetisch sortieren. | gering (unkritisch) | 0.5 Tag | UI, Datenbank, Javascript |
