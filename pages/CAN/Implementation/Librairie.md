[order]:       # (2)
[title]:       # (Initialisation)
[description]: # (Implémentation de l'initialisation du bus CAN)

### Côté STM32

Côté STM32, l'initialisation est très simple :
```cpp
// Démarrer le périphérique CAN
HAL_CAN_Start(hcan);

// Activer le mode interruption
HAL_CAN_ActivateNotification(hcan, CAN_IT_RX_FIFO0_MSG_PENDING);
```

Grâce à la seconde fonction, on indique quelle interruption doit être utilisée lorsqu'un message est reçu.
Ici on utilise `CAN_IT_RX_FIFO0_MSG_PENDING` qui permet d'exécuter `HAL_CAN_RxFifo0MsgPendingCallback` lorsque le `FIFO0` (queue) reçoit un message.

### Côté Raspberry

Les librairies standard Linux sont utilisées pour communiquer avec le bus CAN. D'abord, on ouvre un socket :
```cpp
// PF = Protocol Family
socket = ::socket(PF_CAN, SOCK_RAW, CAN_RAW);

// Ouverture du socket en mode non-bloquant
fcntl(socket, F_SETFL, O_NONBLOCK);
```

Ensuite, on vérifie que l'interface est prête à être utilisée :

- On crée une structure `ifreq` et on lui attribue le nom de l'interface
```cpp
ifreq ifr{};                          // ifreq = interface request
strcpy(ifr.ifr_name, CAN_INTERFACE);  // CAN_INTERFACE = "can0" ou "vcan0"
```
- On vérifie que l'interface est up
```cpp
if (::ioctl(socket, SIOCGIFFLAGS, &ifr) < 0) {
    // Impossible de récupérer les flags de l'interface
    // donc l'interface est introuvable
}

if ((ifr.ifr_flags & IFF_UP) == 0) {
    // L'interface n'est pas up
}
```
- Pour lier l'interface au bus CAN, il faut retrouver l'index de l'interface
```cpp
if (::ioctl(socket, SIOCGIFINDEX, &ifr) < 0) {
    // Impossible de récupérer l'index de l'interface
}
```

Maintenant que l'interface est prête, on peut la lier au socket :
```cpp
sockaddr_can addr{};
addr.can_family = AF_CAN;
addr.can_ifindex = ifr.ifr_ifindex;

if (::bind(socket, (sockaddr*) &addr, sizeof(addr)) < 0) {
    // Impossible de lier l'interface au socket
}
```