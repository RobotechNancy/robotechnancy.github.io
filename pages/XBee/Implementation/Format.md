[order]:       # (1)
[title]:       # (Format des trames)
[description]: # (Documentation sur le format des trames et leur validation)

Toutes les trames suivent un format bien spécifique :

| Champ      | Taille (octets) | Longueur totale (octets) | Description                 |
| ---------- | :-------------: | :----------------------: | --------------------------- |
| SOH        |        1        |             1            | Début de la trame (0x01)    |
| LEN        |        1        |             2            | Longueur de la trame        |
| ~LEN       |        1        |             3            | Négation de LEN             |
| ADDR_RECV  |        1        |             4            | Adresse du module receveur  |
| ADDR_EMIT  |        1        |             5            | Adresse du module emetteur  |
| FCT_CODE   |        1        |             6            | Code fonction               |
| ID         |        1        |             7            | Identifiant de la trame     |
| CRC_HEADER |        2        |             9            | Checksum des octets 0 à 6   |
| DATA       |        n        |            9+n           | Données                     |
| CRC_DATA   |        2        |            11+n          | Checksum des octets 9 à n+8 |

Plusieurs validation sont effectuées lors de la réception de données :

- Longueur de la trame (trop petite ou grande)
- Les premier et dernier octets doivent correspondre à `XB_FRAME_SOH` et `XB_FRAME_EOT` respectivement
- Le deuxième octet (longueur de la trame) doit être égual à la négation du troisième octet
- Le deuxième octet (longueur de l'octet) doit être égual à la longueur de la trame reçue
- Validation des checksum (XOR de chaque octet avec `0x0000` initialement)

Les checksum sont calculés de la même manière :
```cpp
uint16_t XBee::computeChecksum(const std::vector<uint8_t> &frame, uint8_t start, uint8_t length) {
    uint8_t checksum = 0x0000;

    // On applique un XOR pour chaque octet
    for (uint8_t i = start; i < length; i++)
        checksum ^= frame[i];

    // On ne peut transmettre que des octets donc on sépare le checksum en deux
    // 0x50 permet de faciliter l'échantillonnage du signal
    uint8_t checksumLSB = (checksum & 0x0F) | 0x50;
    uint8_t checksumMSB = (checksum & 0xF0) >> 4 | 0x50;

    return checksumMSB << 8 | checksumLSB;
}
```
