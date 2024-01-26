[order]:       # (1)
[title]:       # (Format des trames)
[description]: # (Documentation sur le format de trames)

On utilise le protocole `2.0b` est utilisé pour avoir une trame applicative sur 29 bits (au lieu de 11) et jusqu'à 8 octets de données :

| Champ          |       EMIT_ADDR       |       RECV_ADDR       |      FCT_CODE       |           MSG_ID           |    IS_RESP     |
| :------------- | :-------------------: | :-------------------: | :-----------------: | :------------------------: | :------------: |
| Nombre de bits |       8 (0-255)       |       8 (0-255)       |      8 (0-255)      |          4 (0-15)          |    1 (0-1)     |
| Description    | Adresse de l'emetteur | Adresseur du receveur | Fonction à réaliser | ID de la trame applicative | Réponse ou non |

Les controlleurs CAN (MCP2515 ou celui intégré aux L432KC) ne supportent que les protocoles CAN 2.0 et CAN 2.0b avec 8 octets de données.
Seuls les messages valides activent les interruptions, les autres sont ignorés.

Tous les masques, décalages et autres constantes sont définies dans `define_can.h`.
Le filtrage des adresses est fait par la librairie et utilise ces constantes :

- Dans `CAN::readBuffer` côté Raspberry :
```cpp
frame.receiverAddress = (buffer.can_id & CAN_MASK_RECEIVER_ADDR) >> CAN_OFFSET_RECEIVER_ADDR;

if (address != frame.receiverAddress && frame.receiverAddress != CAN_ADDR_BROADCAST) {
    return -1;
}
```
- Dans `CAN_RECEIVE` côté STM32 :
```c
rep->receiverAddress = (RxHeader.ExtId & CAN_MASK_RECEIVER_ADDR) >> CAN_OFFSET_RECEIVER_ADDR;

if (rep->receiverAddress != NODE_ADDRESS && rep->receiverAddress != CAN_ADDR_BROADCAST) {
    return HAL_ERROR;
}
```

Pour mieux comprendre les masques et décalages, voici un schéma : 
```cpp
// Initialement, on a une séquence de 29 bits
0b11001111000110001000001100001

// Si on veut récupérer l'adresse de l'émetteur, on applique un masque
   0b11001111000110001000001100001 
&  0b11111111000000000000000000000
----------------------------------
=  0b11001111000000000000000000000

// Ensuite on veut se débarasser des 21 bits de poids faible
   0b11001111000000000000000000000
>> 21
----------------------------------
=  0b00000000000000000000011001111

// Enfin, on stocke le résultat dans une variable
// qui ne prend que 8 bits, ce qui revient à
uint8_t address = 0b11001111;
```
