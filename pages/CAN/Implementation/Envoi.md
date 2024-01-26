[order]: # (4)
[title]: # (Envoi de données)
[description]: # (Implémentation de l'envoi de données)

### Côté STM

L'envoi de données utilise la fonction `HAL_CAN_AddTxMessage`:
```c
// Données à envoyer
uint8_t data[8] = {...};

// Structure de la trame
CAN_TxHeaderTypeDef txHeader;

txHeader.DLC = length;                  // Longueur des données
txHeader.IDE = CAN_ID_EXT;              // Trame étendue
txHeader.RTR = CAN_RTR_DATA;            // La trame contient des données
txHeader.TransmitGlobalTime = DISABLE;  // Pas de timestamp

// On remplit la trame étendue avec notre trame applicative
txHeader.ExtId = canAddress << CAN_OFFSET_EMIT_ADDR |
                    address << CAN_OFFSET_RECEIVER_ADDR |
                    functionCode << CAN_OFFSET_FUNCTION_CODE |
                    messageID << CAN_OFFSET_MESSAGE_ID |
                    isResponse;

// La mailbox permet d'envoyer plusieurs trames en même temps
// On ne s'en sert pas ici
uint32_t TxMailbox;

HAL_CAN_AddTxMessage(&hcan1, &txHeader, data, &TxMailbox);
```

### Côté Raspberry

Côté Raspberry, l'envoi est quasi identique à STM32 :
```cpp
std::vector<uint8_t> vec = {...};

can_frame buffer{};
buffer.len = vec.size();

// On copie les données dans le buffer
memcpy(buffer.data, vec.data(), vec.size());

buffer.can_id = address      << CAN_OFFSET_EMIT_ADDR     |
                dest         << CAN_OFFSET_RECEIVER_ADDR |
                functionCode << CAN_OFFSET_FUNCTION_CODE |
                messageID    << CAN_OFFSET_MESSAGE_ID    |
                isResponse                               |
                CAN_EFF_FLAG;

if (::write(socket, &buffer, sizeof(struct can_frame)) < 0) {
    // Erreur lors de l'envoi
}
```

Un détail important est que, pour utiliser la trame étendue, il faut utiliser le flag `CAN_EFF_FLAG` dans le champ `can_id`.
