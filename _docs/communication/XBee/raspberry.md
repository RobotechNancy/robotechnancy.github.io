---
title: Raspberry
order: 2
category: Communication
category_order: 2
subcategory: XBee
subcategory_order: 3
---

Les modules XBee se connectent de la manière suivante :

![Connexion XBee](/images/diagrams/XBee.webp){:.inline-img}
![Pins XBee](/images/diagrams/XBee%20Pins.webp){:.inline-img}

Un problème de communication peut avoir plusieures causes :
- Une sous-tension (tension nominale : 3.3V)
- Un mauvais paramétrage (utiliser [XCTU](https://www.digi.com/products/embedded-systems/digi-xbee/digi-xbee-tools/xctu){:target="_blank"})
- Un mauvais branchement ou module défectueux
- Les modules sont configurés différemment ou ne sont pas du même type

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
    XBee xbee("/dev/ttyS0", XB_ADR_ROBOT_1);

    int status = xbee.openSerialConnection();

    if (status != XB_SER_E_SUCCESS) {
        cout << "Erreur à l'établissement de la connection série : " << status << endl;
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

Les codes fonctions se trouvent dans le fichier [`include/xbee_vars.h`](https://github.com/RobotechNancy/Communication/blob/master/Xbee/include/xbee_vars.h#L33){:target="_blank"} et se gèrent avec la méthode `XBee::subscribe` :
```cpp
// Lier une fonction à un code fonction
void my_function(const frame_t& frame) {
    // ...
}

xbee.subscribe(XB_FCT_CODE, my_function);


// Lier une fonction lambda à un code fonction
xbee.subscribe(XB_FCT_CODE, [](const frame_t& frame) {
    // ...
});
```

{:.warning}
> Il faut déclarer tous les `xbee.subscribe(..)` avant d'appeler `xbee.start_listen()`

> **Note :** Le type `message_callback` correspond au type d'une fonction qui prend en paramètre un `frame_t` et ne retourne rien.
> Cela permet de passer une fonction ou un [lambda](https://www.geeksforgeeks.org/lambda-expression-in-c/){:target="_blank"} en paramètre.

Pour envoyer un message, il faut utiliser la fonction [`XBee::sendFrame`](https://github.com/RobotechNancy/Communication/blob/master/Xbee/src/xbee.cpp#L454){:target="_blank"} :
```cpp
std::vector<uint8_t> data = {1, 2, 3};

xbee.sendFrame(
    XB_ADR_ROBOT_1, // Destinataire
    XB_FCT_CODE,    // Code fonction
    data,           // Données
    3               // Nombre de données
)
```
