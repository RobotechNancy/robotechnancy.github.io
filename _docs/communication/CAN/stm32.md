---
title: STM32
order: 1
category: Communication
category_order: 2
subcategory: CAN
subcategory_order: 1
---

Cette section explique comment utiliser le [bus CAN](/communication/CAN/principe){:target="_blank"} avec une STM32.

### Configuration

D'abord, il faut activer `CAN1` (ou `CAN`) dans l'onglet `Connectivity` de votre `ioc`. Pour obtenir le baudrate voulu, trois réglages sont modifiables :
- Prescaler ($$t_{PCLK}$$)
- Time Quanta in Bit Segment 1 ($$t_{BS1}$$)
- Time Quanta in Bit Segment 2 ($$t_{BS2}$$)

Le calcul du baudrate et les différents paramètres sont expliqués ci-dessous :
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

Pour envoyer un message, il faut utiliser la fonction suivante :
```c
int send(CAN_ADDR addr, CAN_FCT_CODE fct_code, uint8_t data[], uint data_len, bool is_rep, uint rep_len, uint msg_id)
```

La librairie STM32 utilise le fichier [`can_vars.h`](https://github.com/RobotechNancy/Communication/blob/master/CAN/Raspberry/include/can_vars.h#L72){:target="_blank"} de la librairie Raspberry.
Avec STM32CubeIDE, il faut modifier le linker (en cas d'erreur de compilation) :
- Aller dans `Project > Properties > C/C++ Build > Settings > MCU GCC Linker > Include Paths`
- Ajouter le chemin `/usr/local/include` dans `Include paths (-l)` puis `Apply and Close` :
![STM32CubeIDE linker](/images/IDEs/CubeIDE%20linker.webp)

Il devient alors possible de gérer les messages reçus avec dans la fonction suivante :
```c
void HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *hcan) {
    // ...

    switch (msg.fct_code) {
        VOTRE_CODE_FCT:
            // ...
            break;
    }
```

<script type="text/javascript" id="MathJax-script" async
	src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>