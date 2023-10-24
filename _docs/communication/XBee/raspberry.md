---
category: Communication
category_order: 2

subcategory: XBee
subcategory_order: 3

title: Raspberry
order: 2
---

Les modules XBee se connectent de la manière suivante :

{: style="text-align: center" }
![Connexion XBee](/images/XBee/schema.webp){:.inline-img loading="lazy"}
![Pins XBee](/images/XBee/pins.webp){:.inline-img loading="lazy"}

Un problème de communication peut avoir plusieures causes :
- Une sous-tension (tension nominale : 3.3V)
- Un mauvais paramétrage (utiliser [XCTU](https://www.digi.com/products/embedded-systems/digi-xbee/digi-xbee-tools/xctu){:target="_blank"})
- Un mauvais branchement ou module défectueux
- Les modules sont configurés différemment ou ne sont pas du même type

> Les modules XBee doivent être paramtrés de la même manière : pas de parité, baudrate à 9600, databits à 8 et stopbit à 1.

Les trames envoyées sont de la forme suivante :

| Champ                | Taille (octets) | Description                       |
|----------------------|-----------------|-----------------------------------|
| startDelimiter       | 1               | Début de trame, toujours 0x7E     |
| length               | 1               | Nombre d'octets de la trame       |
| emitterAddress       | 1               | Adresse de l'émetteur de la trame |
| receiverAddress      | 1               | Adresse du destinataire           |
| frameID              | 1               | Identifiant de la trame           |
| functionCode         | 1               | Code fonction                     |
| data                 | 0 à 247         | Données                           |
| checksum             | 2               | CRC16 de la trame                 |


### Installation de la librairie

Pour utiliser la librairie dans un projet, il faut d’abord l’installer :
- Cloner le [dépôt](https://github.com/RobotechNancy/Communication){:target="_blank"}
- Lancer la commande `./lib_manager Logs XBee`

> Si la librairie est nécessaire dans un nouveau projet, il faudra alors la [lier avec CMake](/tools/raspberry/#lier-une-librairie-à-un-projet){: target="_blank"}.

### Initialisation

Le module XBee s'initialise de la manière suivante :
```cpp
#include "robotech/xbee.h"

int main() {
    // On initialise le module XBee en spécifiant le port série et l'adresse du module
    XBee xbee(XB_ADDR_ROBOT_1);
    int status = xbee.openSerialConnection("/dev/ttyS0");

    if (status != XB_SER_E_SUCCESS) {
        return status;
    }

    // ...
}
```

> Le port série `/dev/ttyS0` est le port UART du Raspberry Pi. Il est possible que le port soit différent sur votre ordinateur (`/dev/ttyUSB0` par exemple).

Le module est configuré de la manière suivante :

|     Paramètre       | Symbole |  Description  | Valeur AT  |
|---------------------|---------|---------------|------------|
| Baud rate           | ATBD    | 9600          | 3          |
| Parité              | ATNB    | Aucune        | 0          |
| Chiffrement         | ATEE    | Activé        | 1          |
| Clé AES             | ATKY    | Commun à tous | (cf. repo) |
| Channel             | ATCH    | Commun à tous | (cf. repo) |
| PAN ID              | ATID    | Commun à tous | (cf. repo) |
| Coordinateur        | ATCE    | Oui/Non       | 1/0        |
| Destinataire (LOW)  | ATDL    | Broadcast     | FFFF       |
| Destinataire (HIGH) | ATDH    | Broadcast     | 0          |
| Envoyeur            | ATMY    | Unique        | (cf. repo) |
| Mode API            | ATAP    | Désactivé     | 0          |

### Utilisation

Les codes fonctions se trouvent dans le fichier [`include/define_xbee.h`](https://github.com/RobotechNancy/Communication/blob/master/XBee/include/define_xbee.h#L29){:target="_blank"} et se gèrent avec la méthode `XBee::bind` :
```cpp
// Lier une fonction à un code fonction
void my_function(XBee &xbee, const frame_t& frame) {
    // ...
}

xbee.bind(XB_FCT_CODE, my_function);
```

Une fois toutes les fonctions liées, il faut démarrer l'écoute du bus CAN :
```cpp
xbee.bind(...);
xbee.bind(...);

xbee.startListening(); // L'écoute ne bloque pas le main
```

> Pour éviter que le programme se termine instantanément, il est possible d'utiliser un `while(true)`
> ou `std::this_thread::sleep_for(std::chrono::seconds(...));`

Pour attendre une réponse à une demande, il suffit d'ajouter un timeout à la méthode `XBee::sendFrame` :
```cpp
// Data est déclaré implicitement, 5 secondes de timeout
xbee_result_t res = xbee.sendFrame(XB_ADDR_CAMERA_01, XB_FCT_TEST_ALIVE, {0x01}, 5);

switch (res.status) {
    case XB_E_FRAME_DATA_LENGTH:
        // Vous avez dépassé la taille maximale des données
    break;
    case XB_E_FRAME_TIMEOUT:
        // Le timeout est dépassé
    break;
    case XB_E_SUCCESS:
        // Une trame a été reçue, récupérable dans res.frame
    break;
}
```
