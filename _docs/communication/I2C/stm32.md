---
category: Communication
category_order: 2

subcategory: I2C
subcategory_order: 2

title: STM32
order: 3
---

Sur les micro-controlleurs compatibles, l'I2C s'active sur CubeMX, où les pins à utiliser sont indiqués après activation :
![STM32 I2C](/images/STM32%20I2C.webp){: loading="lazy" }

{: .warning }
> **Attention :** Il faut faire attention au timeout.
En effet, si il est trop court, la séquence envoyée ou reçue sera incomplète.

### Lecture et écriture

Par défaut, la fonction de lecture utilise du polling pour récupérer les séquences.
Dans ce cas, il faut utiliser `HAL_I2C_Master_Transmit` et `HAL_I2C_Master_Receive` :
```c
/* USER CODE BEGIN 2 */

// (Les valeurs sont des exemples)
uint8_t RX_buffer[1];
uint8_t TX_buffer[2] = {0x80, 0x23};

HAL_I2C_Master_Transmit(
    &hi2c1,                // hi2c1 est généré automatiquement
    20,                    // Adresse de l'esclave
    (uint8_t *) TX_buffer, // Données à envoyer
    2,                     // Taille des données à envoyer
    HAL_MAX_DELAY          // Délai d'attente maximal
);

HAL_Delay(100);
HAL_I2C_Master_Receive(&hi2c1, 21, (uint8_t *) RX_buffer, 1, HAL_MAX_DELAY);

/* USER CODE END 2 */
```

> **Note :** pour le mode esclave, l'utilisation des interruptions ou le DMA (Direct Memory Access),
se référer au [wiki ST](https://wiki.st.com/stm32mcu/wiki/Getting_started_with_I2C){:target="_blank"}.
