---
title: STM32
order: 1
category: Communication
category_order: 2
subcategory: CAN
subcategory_order: 1
---

Cette section explique comment utiliser le [bus CAN](/communication/CAN/principe) avec une STM32.

### Configuration

D'abord, il faut activer `CAN1` (ou `CAN`) dans l'onglet `Connectivity` de votre `ioc`. Pour obtenir le baudrate voulu, trois réglages sont modifiables :
- Prescaler ($$t_{PCLK}$$)
- Time Quanta in Bit Segment 1 ($$t_{BS1}$$)
- Time Quanta in Bit Segment 2 ($$t_{BS2}$$)

Vous pouvez utiliser ce schéma pour vous aider à comprendre les différents paramètres :
![CAN timing](/images/diagrams/CAN%20Timing.webp)

Enfin, il faut tout cocher dans `NVIC Settings` pour activer les interruptions.

### Utilisation

Avant de pouvoir envoyer ou recevoir des messages, il faut configurer l'adresse du filtre :
```c
int main(void) {
    // ...
    configure_CAN(hcan1, CAN_ADDR_CARTE);
    // ...
}
```

Pour envoyer un message :
```c
int send(CAN_ADDR addr, CAN_FCT_CODE fct_code, uint8_t data[], uint data_len, bool is_rep, uint rep_len, uint msg_id)
```

Pour gérer la réception des messages, referrez-vous cette [section](/communication/CAN/codes).