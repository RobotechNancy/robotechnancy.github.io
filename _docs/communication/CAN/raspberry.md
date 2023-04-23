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
- Lancer la commande `./lib_manager install Logs CAN`

Ensuite, il faut ajouter la librairie dans le fichier `CMakeLists.txt` du projet :
```cmake
# Cette section à modifier selon votre projet
project(my_project)
set(CMAKE_CXX_STANDARD 20)
cmake_minimum_required(VERSION 3.24)

# La librairie CAN nécessite aussi la librairie Logs
find_package(PkgConfig REQUIRED)
pkg_check_modules(LOGS REQUIRED Logs)
pkg_check_modules(CAN REQUIRED CAN)

# Ajouter tous les fichiers source dans "add_executable"
add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} ${LOGS_LIBRARIES} ${CAN_LIBRARIES})
```

### Utilisation

Pour commencer à écouter et envoyer des messages sur le bus CAN, il faut d'abord créer un objet `Can` et l'initialiser :
```cpp
#include <robotech/can.h>

int main() {
    Can can;
    int status = can.init(CAN_ADDR_RASPBERRY_E);

    if(status < 0){
      can.logger << "Erreur dans l'initialisation du CAN (n°" << dec << status << ")" << mendl;
      return err;
    }

    // Démarrer la gestion des messages reçus
    can.start_listen();
}
```

Pour envoyer un message, il faut utiliser la méthode `Can::send` :
```cpp
/*!
 * @brief  Envoyer un message sur le bus CAN
 * @param  addr L'adresse du récepteur
 * @param  fct_code Le code fonction
 * @param  data Les données à envoyer
 * @param  data_len La taille des données
 * @param  is_rep Si le message est une réponse
 * @param  rep_len Le nombre de réponses attendues
 * @param  msg_id L'identifiant du message
 * @return 0 ou un code d'erreur
 */
int Can::send(CAN_ADDR addr, CAN_FCT_CODE fct_code, uint8_t *data, uint8_t data_len, bool is_rep, uint8_t rep_len, uint8_t msg_id)
```

Pour gérer la réception des messages, se referrer à cette [section](/communication/CAN/codes){:target="_blank"}.

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

Ensuite, il faut ajouter la configuration du bus CAN dans `/boot/firmware/config.txt` :
```
dtoverlay=mcp2515-can0,oscillator=12000000,interrupt=25,spimaxfrequency=2000000
# 12000000 dépend du quartz utilisé (souvent 12000000 ou 8000000)
```

Enfin, il faut démarrer le bus CAN :
```bash
sudo ip link set can0 up type can bitrate 181818 loopback off
```