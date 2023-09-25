---
category: Communication
category_order: 2

subcategory: CAN
subcategory_order: 1

title: STM32
order: 1
---

D'abord, il faut activer `CAN1` (ou `CAN`) dans l'onglet `Connectivity` de votre `ioc`.

{:.warning}
> Il faut tout cocher dans `NVIC Settings` pour activer les interruptions.

Pour obtenir le baudrate voulu, trois réglages sont modifiables :
- Prescaler (t<sub>PCLK</sub>)
- Time Quanta in Bit Segment 1 (t<sub>BS1</sub>)
- Time Quanta in Bit Segment 2 (t<sub>BS2</sub>)

Le calcul du baudrate et les différents paramètres sont expliqués ci-dessous :
![CAN timing](/images/CAN/timing.webp){:loading="lazy"}

Puis, il faut importer les fichiers `can.c` et `can.h` respectivement dans les dossiers `Core/Src` et `Core/Inc` de votre projet. Vous pouvez aussi cloner le projet STM32 du [repo Github](https://github.com/RobotechNancy/Communication/tree/master/CAN/L432){:target="_blank"} où se trouvent `can.c` et `can.h`.

Enfin, les fichiers utilisent le header [`can_vars.h`](https://github.com/RobotechNancy/Communication/blob/master/CAN/Raspberry/include/can_vars.h#L72){:target="_blank"} de la librairie Raspberry.
Avec STM32CubeIDE, il faut modifier le linker (en cas d'erreur de compilation) :
- Aller dans `Project > Properties > C/C++ Build > Settings > MCU GCC Linker > Include Paths`
- Ajouter le chemin où se trouve le fichier `can_vars.h` dans `Include paths (-l)` puis `Apply and Close`

Si vous avez toujours des erreurs de compilation, vous pouvez copier coller le fichier dans le dossier `Core/Inc` de votre projet.
(Attention à bien le garder à jour avec la librairie Raspberry).

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
