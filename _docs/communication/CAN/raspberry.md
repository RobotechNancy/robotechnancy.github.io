---
title: Raspberry
order: 1
category: Communication
category_order: 2
subcategory: CAN
subcategory_order: 1
---

Pour utiliser la librairie dans un projet, il faut d'abord l'installer :
- Cloner le dépôt [Communication](https://github.com/RobotechNancy/Communication){:target="_blank"}
- Lancer la commande `./lib_manager install Logs CAN/Raspberry`

> Si la librairie est nécessaire dans un nouveau projet, il faudra alors la [lier avec CMake](/tools/raspberry/#lier-une-librairie-à-un-projet){: target="_blank"}.

### Utilisation

Pour commencer à écouter et envoyer des messages sur le bus CAN, il faut d'abord créer un objet `Can` et l'initialiser :
```cpp
#include <robotech/can.h>

int main() {
    Can can;
    
    if(can.init(CAN_ADDR_RASPBERRY) < 0){
        return 1;
    }

    // ...
}
```

Pour envoyer un message, il faut utiliser la méthode `Can::send` :
```cpp
uint8_t data[1] = {0x10};

// CAN_ADDR_BROADCAST    : Adresse de destination
// FCT_ACCUSER_RECPETION : Code fonction
// data                  : Données à envoyer
// 1                     : Taille des données
// 0                     : Identifiant du message
// false                 : Si une réponse est attendue
can.send(CAN_ADDR_BROADCAST, FCT_ACCUSER_RECPETION, data, 1, 0, false);
```

Pour gérer la réception d'un [code fonction](https://github.com/RobotechNancy/Communication/blob/master/CAN/Raspberry/include/define_can.h#L61){:target="_blank"}, il faut utiliser la méthode `Can::bind` :
```cpp
// Lier une fonction à un code fonction
void my_function(const can_mess_t& message) {
    // ..
}

can.bind(FCT_ACCUSER_RECEPTION, my_function);
```

{:.warning}
> Il faut déclarer tous les `can.bind(..)` avant d'appeler `can.startListening()` sinon les messages ne seront pas traités.

Si vous attendez une réponse à un message, il faut utiliser la méthode `Can::waitFor` :
```cpp
can.send(CAN_ADDR_ODOMETRIE, FCT_GET_OPTIQUE, nullptr, 0, 1, false);


can_mess_t response;

// messageID = 1 et 5 secondes d'attente max
if (can.waitFor(response, 1, 5000) < 0) {
    // Gérer l'erreur
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
candump vcan0 -t
```

Pour envoyer un message sur le bus CAN virtuel, il y a la commande `cansend` :
```bash
# Format : cansend <interface> <id>#<data>
cansend vcan0 123#DEADBEEF
```

### Bus CAN réel

Pour utiliser le bus CAN réel, il faut d'abord connecter le Raspberry Pi au shield :
![Circuit](/images/diagrams/CAN%20Raspberry.webp){:loading="lazy"}

Ensuite, il faut ajouter la configuration du bus CAN dans `/boot/config.txt` :
```
# S'assurer que l'interface SPI est activée (dtparam=spi=on)    
dtoverlay=mcp2515-can0,oscillator=8000000,interrupt=25,spimaxfrequency=2000000
```

Enfin, il faut démarrer le bus CAN :
```bash
sudo ip link set can0 up type can bitrate <BITRATE> loopback off
```

{:.warning}
> Le driver CAN utilisé dans cet article est un MCP2515 venant du CAN HAT RS485.
> Il est nécessaire d'adapter la configuration de l'interface à votre driver.
