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
- Lancer la commande `./lib_manager Logs Xbee`

Ensuite, il faut ajouter la librairie dans le fichier `CMakeLists.txt` du projet :
```cmake
# Cette section à modifier selon votre projet
project(my_project)
set(CMAKE_CXX_STANDARD 20)
cmake_minimum_required(VERSION 3.24)

# La librairie CAN nécessite aussi la librairie Logs
find_package(PkgConfig REQUIRED)
pkg_check_modules(LOGS REQUIRED Logs)
pkg_check_modules(XBEE REQUIRED Xbee)

# Ajouter tous les fichiers source dans "add_executable"
add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} ${LOGS_LIBRARIES} ${XBEE_LIBRARIES})
```

### Initialisation

Le module XBee s'initialise de la manière suivante :
```cpp
#include "robotech/xbee.h"

int main() {
    XBee xbee;
    int status = xbee.openSerialConnection();

    if (status != XB_SER_E_SUCCESS) {
        cout << "Erreur à l'établissement de la connection série : " << status << endl;
        return status;
    }

    // ...
}
```

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
xbee.subscribe(XBEE_FCT_CODE, callback);
```

Pour envoyer un message, il faut utiliser la fonction [`XBee::sendFrame`](https://github.com/RobotechNancy/Communication/blob/master/Xbee/src/xbee.cpp#L454){:target="_blank"} :
```cpp
/*!
 *  @brief  Envoyer une trame structurée via UART au XBee
 *  @param  dest L'adresse du destinataire du message
 *  @param  fct_code Le code de la fonction concernée par le message
 *  @param  data Les valeurs des paramètres demandées par le code fonction
 *  @return 200 Succès
 *  @return -205 La taille des données est trop grande
 */
int XBee::sendFrame(uint8_t dest, uint8_t fct_code, const vector<int>& data, int data_len)
```
