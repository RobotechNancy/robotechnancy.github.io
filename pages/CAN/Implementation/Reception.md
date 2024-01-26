[order]:       # (3)
[title]:       # (Réception de données)
[description]: # (Implémentation de la réception de données)

### Côté STM32

Pour récupérer les données reçues et la formater en `can_frame_t`, on utilise `CAN_RECEIVE` :
```cpp
// Champ de données
uint8_t RxData[8];
// Structure de la trame
CAN_RxHeaderTypeDef RxHeader;

// Récupérer la trame, Rx = buffer de réception
HAL_CAN_GetRxMessage(hcan, CAN_RX_FIFO0, &RxHeader, RxData);
```

Pour récupérer les différents champs contenu dans l'identifiant étendu, on applique des masques et des décalages, par exemple, pour récupérer l'adresse du destinataire :
```cpp
can_frame_t frame;
frame.receiverAddress = (RxHeader.ExtId & CAN_MASK_RECEIVER_ADDR) >> CAN_OFFSET_RECEIVER_ADDR;
```

### Côté Raspberry

Pour récupérer les données de manière non bloquante, on utilise un thread séparé :
```cpp
isListening = true;
listenerThread = std::make_unique<std::thread>(&CAN::listen, this);
```

Ici `isListening` est atomique, c'est-à-dire que si plusieurs threads tentent de le modifier en même temps, il n'y aura pas de problème.
Similairement, `listenerThread` est un pointeur intelligent qui se détruira automatiquement à la fin du programme.

Pour savoir si des données sont disponibles, on fait du polling :
```cpp
// On est intéressé que par l'événement POLLIN
// qui indique que des données sont disponibles
pollfd fd{ socket, POLLIN, 0 };

while (isListening.load()) {
    int status = ::poll(&fd, 1, 0);

    if (status == 0) // timeout, aucune donnée disponible
        continue;
    if (status < 0) // erreur
        break;

    // Données disponibles
}
```

Dès que des données sont disponibles, on les récupère :
```cpp
can_frame buffer{};

if (::read(socket, &buffer, sizeof(can_frame)) < 0) {
    // Erreur lors de la lecture
}

// Puis même formatage que sur STM32 (seul la structure qui contient les données change)
```

Si la trame est une réponse `frame.isResponse`, on la stocke dans un tableau ce qui permet de débloquer la fonction qui attend cette réponse :
```cpp
if (frame.isResponse) {
    std::lock_guard<std::mutex> lock(mutex);
    responses[frame.messageID] = frame;
}
```

Ici on utilise un mutex et `std::lock_guard` pour éviter que deux threads tentent de modifier `responses` en même temps.
`std::lock_guard` est un pointeur intelligent qui bloque le mutex à sa création et le débloque à sa destruction.

Si la trame n'est pas une réponse, on cherche si son code fonction a un callback associé :
```cpp
auto callback = callbacks.find(frame.functionCode);

// callback.first = code fonction
// callback.second = fonction associée

if (callback != callbacks.end()) {
    callback->second(*this, frame);
}
```

Et si aucune fonction n'est associée, on l'ignore simplement.
