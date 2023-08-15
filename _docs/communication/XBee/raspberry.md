---
title: Raspberry
order: 2
category: Communication
category_order: 2
subcategory: XBee
subcategory_order: 3
---

Les modules XBee se connectent de la manière suivante :

![Connexion XBee](/images/diagrams/XBee.webp){:.inline-img, loading="lazy"}
![Pins XBee](/images/diagrams/XBee%20Pins.webp){:.inline-img, loading="lazy"}

Un problème de communication peut avoir plusieures causes :
- Une sous-tension (tension nominale : 3.3V)
- Un mauvais paramétrage (utiliser [XCTU](https://www.digi.com/products/embedded-systems/digi-xbee/digi-xbee-tools/xctu){:target="_blank"})
- Un mauvais branchement ou module défectueux
- Les modules sont configurés différemment ou ne sont pas du même type

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

Ensuite, il faut ajouter la librairie dans le fichier [`CMakeLists.txt` du projet](/librairies/raspberry/#création-dun-software){:target="_blank"} :
```cmake
# Cette section à modifier selon votre projet
project(my_project)
set(CMAKE_CXX_STANDARD 20)
cmake_minimum_required(VERSION 3.16)

# Ajout des dépendances avec pkg-config
find_package(PkgConfig REQUIRED)
pkg_check_modules(XBEE REQUIRED XBee)

# Ajouter tous les fichiers source dans "add_executable"
add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} ${XBEE_LIBRARIES})
```

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

> **Note :** Le port série `/dev/ttyS0` est le port UART du Raspberry Pi.
> Il est possible que le port soit différent sur votre ordinateur (`/dev/ttyUSB0` par exemple).

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
void my_function(const frame_t& frame) {
    // ...
}

xbee.bind(XB_FCT_CODE, my_function);
```

{:.warning}
> Il faut déclarer tous les `xbee.bind(..)` avant d'appeler `xbee.startListening()`

Pour attendre une réponse à une demande, il faut utiliter la fonction `XBee::wait_for_response` :
```cpp
uint8_t data[1] = {0x01}
xbee.sendFrame(XB_ADDR_CAMERA_01, XB_FCT_TEST_ALIVE, data, 1);

xbee_frame_t frame;

// 1ère trame envoyée, 5 secondes d'attente max
if (xbee.waitFor(frame, 1, 5000) < 0) {
    // Gérer l'erreur
};
```
