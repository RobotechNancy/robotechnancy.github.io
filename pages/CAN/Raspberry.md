[order]:       # (2)
[title]:       # (Librairie Raspberry)
[description]: # (Utiliser la librairie CAN pour Raspberry)

Pour installer la librairie CAN sur Linux, il faut :

- Cloner le dépôt GitHub : `git clone https://github.com/RobotechNancy/Communication.git`
- Se placer dans le dossier cloné : `cd Communication`
- Utiliser le script d'installation : `sudo ./lib_manager install Logs CAN`

> Pour mettre à jour la librairie, `git pull` puis `sudo ./lib_manager install CAN`

### Configuration du bus

Avant d'utiliser la librairie CAN, il est important de créer l'interface CAN :

- Bus CAN virtuel :
```bash
# Ajouter le module vcan
sudo modprobe vcan
# Créer l'interface vcan0
sudo ip link add dev vcan0 type vcan
```
- Bus CAN réel :
```bash
# Ajouter le module mcp2515
echo "dtoverlay=mcp2515-can0,oscillator=8000000,interrupt=25,spimaxfrequency=2000000" > /boot/config.txt
# Redémarrer la Raspberry
sudo reboot
```

### Initialisation

Pour initialiser un module CAN, il faut créer une instance de la classe `CAN` et lui attribuer une adresse :
```cpp
CAN can;

if (can.init(CAN_ADDR_RASPBERRY) < 0) {
    // Une erreur s'est produite lors de l'initialisation
    // Toutes les erreurs sont définies dans define_can.h
}
```

Important, il faut démarrer l'interface CAN avant de pouvoir l'utiliser :
```bash
# Démarrer l'interface vcan0
sudo ip link set up vcan0

# Démarrer l'interface can0
sudo ip link set can0 up type can bitrate 500000 loopback off
```

### Envoyer des données

Pour envoyer une données, il suffit d'utiliser `CAN::send` :
```cpp
can.send(
    CANBUS_PRIO_STD,        // Priorité
    CANBUS_BASE_ROULANTE,   // Receveur
    MODE_DEBUG,             // Mode de fonctionnement
    FCT_DPL_AVANCE,         // Fonction
    {0x01},                 // Données
    1,                      // ID de la demande (arbitraire)
    false                   // Demande => false
);
```

Ici, on envoie un message de priorité standard à la base roulante en mode debug qui lui demande d'avancer sans attendre de réponse.

### Recevoir des données

Il existe deux manières de recevoir des données :

- De manière synchrone (bloque le programme), avec `CAN::send` :
```cpp
can_result_t res = can2.send(CANBUS_PRIO_STD, CANBUS_RASPBERRY, FCT_ACCUSER_RECEPTION, {0x01}, 1, false, 2);

switch (res.status) {
    case CAN_OK:
        // Trame accessible dans res.frame
        std::cout << "CAN_OK" << std::endl;
    break;
    case CAN_ERROR:
        std::cout << "CAN_ERROR" << std::endl;
    break;
    case CAN_TIMEOUT:
        std::cout << "CAN_TIMEOUT" << std::endl;
        break;
}
```
- De manière asynchrone (ne bloque pas le programme), avec `CAN::bind` :
```cpp
void handleAcknowledge(CAN &can, const can_frame_t &frame) {
    if (frame.data[0] == 0x01)
        std::cout << "ACK" << std::endl;
    else
        std::cout << "NACK" << std::endl;
}

can.bind(FCT_ACCUSER_RECEPTION, handleAcknowledge);
```

Dans les deux cas, il est nécessaire d'appeler `CAN::startListening` pour démarrer l'écoute :
```cpp
#include <robotech/xbee.h>

int main() {
    CAN can;
    if (can.init(CAN_ADDR_RASPBERRY) < 0)
        return 1;

    // Utilisation d'un lambda au lieu d'une fonction classique
    can.bind(FCT_ACCUSER_RECEPTION, [](CAN &can, const can_frame_t &frame) {
        std::cout << "Code fonction ACCUSER_RECEPTION reçu" << std::endl;
        can.send(frame.senderAddress, FCT_ACCUSER_RECEPTION, frame.data);
    });

    // On bloque le thread principal pour laisser le 
    // temps au programme de recevoir des meesages
    can.startListening();
    std::this_thread::sleep_for(std::chrono::seconds(10));

    return 0;
}
```