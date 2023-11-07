# Playwright testid 
Testitav projekt: [Google](https://www.google.ee)

## Testid
1. Tavalise otsingu sooritamine
    * Küpsistega nõustumine - küpsistega nõustudes peaks veebilehe uuesti laadimisel aken mitte ilmuma
      1. Külastame Google.com lehte ja veendume, et see on korrektselt laaditud
      2. Leiame üles "Nõustu kõigiga" nupu ja klõpsame seda
      4. Veendume, et küpsiste aken pole enam nähtaval
      5. Laadime lehe uuesti
      6. Veendume, et küpsiste aken pole enam nähtaval
    * Märksõnaga otsimine - sisestades mingisuguse märksõna, peaksid ilmuma sellele vastavad otsingutulemused
      1. Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
      2. Leiame üles otsinguvälja
      3. Sisestame märksõna "Playwright" ja vajutame sisestusklahvi
      4. Kontrollime, et märksõna oleks veebilehe pealkirjas ja otsinguväljal
    * Otsingu tulemuse avamine - klõpsates mingisugusel otsingutulemusel peaksime väljuma Google veebirakendusest
      1. Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
      2. Leiame üles otsinguvälja
      3. Sisestame märksõna "Playwright" ja vajutame sisestusklahvi
      4. Kontrollime, et märksõna oleks veebilehe pealkirjas ja otsinguväljal
      5. Klõpsame esimesel tulemusel
      6. Veendume, et märksõnaga otsinguvälja poleks veebilehel ja Google poleks mainitud lehe pealkirjas
2. Pildiotsing
   * Pildiotsingusse sisenemine - klõpsates "Pildid" siselingil peaksime jõudma "Google pildid" lehele
     1. Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
     2. Leiame üles "Pildid" siselingi ja klõpsame seda
     3. Veendume, et lehekülje pealkirjas oleks "Google pildid" ja "Otsige pildi järgi" nupp oleks nähtav
   * Märksõnaga otsimine - sisestades mingisuguse märksõna, peaksid ilmuma sellele vastavad pildid
     1. Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
     2. Leiame üles "Pildid" siselingi ja klõpsame seda
     3. Leiame üles otsinguvälja
     4. Sisestame märksõna "Playwright" ja vajutame sisestusklahvi
     5. Kontrollime, et lehekülje pealkirjas oleks märksõna ja otsinguväljal oleks sisestatud märksõna
     6. Veendume, et leheküljel oleks nähtaval vähemalt 10 pilti
3. Otsing filtritega
   * Välistava filtri kasutamine - sisestades mingi märksõna ning jättes teatud märksõnad välja lisades neile "-" prefiksi, ei tohiks otsingulehele jääda tulemusi, mis sisaldavad välistatud märksõnu
     1. Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
     2. Leiame üles otsinguvälja
     3. Sisestame märksõnad "windows -os -microsoft" ja vajutame sisestusklahvi
     4. Veendume, et leheküljel ei ole märksõnu "os" ja "microsoft" v.a. pealkirjas ja otsinguväljal
   * Tsitaatfiltri kasutamine - sisestades märksõnad jutumärkide vahele, peaksid otsingulehel olevad tulemused sisaldama sisestatud tsitaati
     1. Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
     2. Leiame üles otsinguvälja
     3. Sisestame jutumärkidega "The quick brown fox jumps over the lazy dog." ja vajutame sisestusklahvi
     4. Kontrollime, et fraas oleks tulemuste lehel lisaks pealkirjale ja otsinguväljale ka tulemuste loetelus

## Tulemused

### Probleemid
* Testimisel esines probleeme WebKit-iga, sest "Nõustu kõigiga" nupp polnud seal nähtav. Probleem oli selles, et WebKit-is oli leht inglise keeles, mujal aga eesti keeles. Selle lahendamiseks kasutasin lisasin ühe GET parameetri urli lõppu, seega sait, mida tegelikult külastasin oli `https://www.google.ee/?hl=et`.

### Testide kokkuvõta
* TBD