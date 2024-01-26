[order]:       # (3)
[title]:       # (Configurer une carte)
[description]: # (Comment configurer une carte avec CubeMX)

Pour configurer une carte avec CubeMX, il suffit d'ouvrir le fichier `.ioc` :
![CubeMX](/static/images/STM32/cubemx.webp)

Chaque sauvegarde du fichier génère le code nécessaire à la bonne configuration de la carte (retrouvable dans `Core/Src/main.c` et `Core/Inc/main.h`).

Cette génération peut écraser votre code s'il n'est pas entre des sections spécifiques.
Ces sections commencent pas `/* USER CODE BEGIN */` et finissent par `/* USER CODE END */`.

CubeMX permet de configurer :

- Les horloges (`Clock Configuration`)
- Les timers (génération de PWM par exemple)
- Les connectivités (UART, SPI, I2C, CAN, USB, ...)
- Les fonctionnalités (interrupts, DMA, ...)
