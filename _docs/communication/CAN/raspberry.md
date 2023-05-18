---
title: Raspberry
order: 1
category: Communication
category_order: 2
subcategory: CAN
subcategory_order: 1
---

Cette section explique comment utiliser le [bus CAN](/communication/CAN/principe){:target="_blank"} avec un Raspberry Pi.

### Installation

Pour utiliser la librairie dans un projet, il faut d'abord l'installer :
- Cloner le dépôt [Communication](https://github.com/RobotechNancy/Communication){:target="_blank"}
- Lancer la commande `./lib_manager install Logs CAN/Raspberry`

Ensuite, il faut ajouter la librairie dans le fichier [`CMakeLists.txt` du projet](/librairies/raspberry/#création-dun-software){:target="_blank"} :
```cmake
# Cette section à modifier selon votre projet
project(my_project)
set(CMAKE_CXX_STANDARD 20)
cmake_minimum_required(VERSION 3.16)

# Ajout des dépendances avec pkg-config
find_package(PkgConfig REQUIRED)
pkg_check_modules(CAN REQUIRED CAN)

# Ajouter tous les fichiers source dans "add_executable"
add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} ${CAN_LIBRARIES})
```

### Utilisation

Pour commencer à écouter et envoyer des messages sur le bus CAN, il faut d'abord créer un objet `Can` et l'initialiser :
```cpp
#include <robotech/can.h>

int main() {
    Can can;
    int err = can.init(CAN_ADDR_RASPBERRY_E);
    
    if(err < 0){
      can.logger << "Erreur dans l'initialisation du CAN (n°" << dec << err << ")" << mendl;
      return err;
    }

    // ...
}
```

Pour envoyer un message, il faut utiliser la méthode `Can::send` :
```cpp
uint8_t data[1] = {0x10};

// CAN_ADDR_BROADCAST    : adresse de destination
// FCT_ACCUSER_RECPETION : code fonction
// data                  : données à envoyer
// 1                     : taille des données
// false                 : Si le message est divisé en plusieurs paquets
// 0                     : Si le message est divisé, le nombre de paquets
// 0                     : Identifiant du message
can.send(CAN_ADDR_BROADCAST, FCT_ACCUSER_RECPETION, data, 1, false, 0, 0);
```

Pour gérer la réception d'un [code fonction](https://github.com/RobotechNancy/Communication/blob/master/CAN/Raspberry/include/can_vars.h#L72){:target="_blank"}, il faut utiliser la méthode `Can::subscribe` :
```cpp
// Lier une fonction à un code fonction
void my_function(const can_mess_t& message) {
    // ..
}

can.subscribe(VOTRE_CODE_FONCTION, my_function);


// Lier un lambda à un code fonctino
can.subscribe(VOTRE_CODE_FONCTION, [](const can_mess_t& message) {
    // ..
});
```

{:.warning}
> Il faut déclarer tous les `can.subscribe(..)` avant d'appeler `can.start_listen()` sinon les messages ne seront pas traités.

> **Note :** Le type `message_callback` correspond au type d'une fonction qui prend en paramètre un `can_mess_t` et ne retourne rien.
> Cela permet de passer une fonction ou un [lambda](https://www.geeksforgeeks.org/lambda-expression-in-c/){:target="_blank"} en paramètre.

Si vous attendez une réponse à un message, il faut utiliser la méthode `Can::wait_for_response` :
```cpp
can.send(CAN_ADDR_ODOMETRIE, FCT_GET_OPTIQUE, nullptr, 0, false, 1, 0);

// Attente de 5 secondes max
can_mess_t response = can.wait_for_response(FCT_TEST_COMM, 5000);

if (response.fct_code == 0) {
    // Aucune réponse reçue
} else {
    // Réponse reçue
}
```

### Bus CAN virtuel

Le package `can-utils` peut être utilisé pour créer un bus CAN virtuel et tester votre code :
```bash
# Installation
sudo apt install can-utils

# Création d'un bus CAN virtuel
sudo modprobe vcan
sudo ip link add dev vcan0 type vcan
sudo ip link set up vcan0

# Ecouter le bus CAN
candump vcan0
```

Pour envoyer un message sur le bus CAN virtuel, il faut utiliser la commande `cansend` :
```bash
# Format : cansend <interface> <id>#<data>
cansend vcan0 0x110#1122334455667788
```

### Bus CAN réel

Pour utiliser le bus CAN réel, il faut d'abord connecter le Raspberry Pi au shield :
![Circuit](/images/diagrams/CAN%20Raspberry.webp)

Ensuite, il faut ajouter la configuration du bus CAN dans `/boot/config.txt` (à la fin) :
```
# S'assurer que l'interface SPI est activée (dtparam=spi=on)    
dtoverlay=mcp2515-can0,oscillator=8000000,interrupt=25,spimaxfrequency=2000000
```

Enfin, il faut démarrer le bus CAN :
```bash
sudo ip link set can0 up type can bitrate 181818 loopback off
```
