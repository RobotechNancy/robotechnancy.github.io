---
title: Codes Fonction
order: 4
category: Communication
category_order: 2
subcategory: CAN
subcategory_order: 1
---

Les codes fonction sont définis dans `include/can_vars.h` ou dans `Core/Inc/can_vars.h` :
```cpp
// Format : 0xXX000 où XX est votre code fonction
typedef enum {
    VOTRE_CODE_FONCTION   = 0x11000,
    FCT_ACCUSER_RECPETION = 0xff000,
} CAN_FCT_CODE;
```

{:.warning}
> **Attention :** il faut absolument que les fichiers `can_vars.h` soient identiques pour les deux librairies.

Le traitement des messages se fait dans :
- `Can::process_resp` pour la [librairie Raspberry](https://github.com/RobotechNancy/Communication/blob/master/CAN/Raspberry/src/can.cpp#L121)
- `HAL_CAN_RxFifo0MsgPendingCallback` pour la [librairie STM32](https://github.com/RobotechNancy/Communication/blob/master/CAN/L432/Core/Src/can.c#L53)

Dans les deux cas, il faut ajouter un `case` pour chaque code fonction :
```c
switch (response.fct_code) {
    case VOTRE_CODE_FONCTION:
        // Traitement du message
    case FCT_ACCUSER_RECPETION:
        // Traitement du message
    break;
    default:
        // Code fonction inconnu
}
```
