[order]:       # (1)
[title]:       # (STM32)
[description]: # (Comment générer un signal PWM sur un microcontrôleur STM32)

Le PWM (Pulse Width Modulation) consiste à moduler la largeur d'une impulsion pour contrôler la puissance moyenne délivrée à un composant.
C'est un signal carré dont le rapport cyclique (temps haut / temps total) est variable :
![PWM](/static/images/PWM/signals.webp)

Deux paramètres sont à prendre en compte :

- La fréquence du signal : elle est fixe et dépend du composant (ex : 50Hz pour un servo-moteur analogique)
- Le temps haut du signal : il est variable et fixe le rapport pour chaque cycle

### Paramétrage de la carte

Avant de régler le timer, il faut configurer la clock que va utiliser le timer (menu `Clock Configuration`).
Ici, on utilise le timer `TIM1` qui est sur le bus `APB2` et qui a une fréquence de 4MHz :
![Prescaler clock](/static/images/PWM/clock_config.webp){:loading="lazy"}

> Pour trouver quelle clock le timer utilise, il faut regarder la [datasheet](https://www.st.com/resource/en/datasheet/stm32l432kc.pdf) du microcontrôleur, dans la section  `Memory mapping` (ici, page 60).
> [!TIP]

Ensuite, on peut régler le timer TIM1 qu'on utilisera pour générer le signal PWM.
Ici, l'objectif était d'avoir trois signaux, d'où le mode PWM sur 3 channels :
![TIM1](/static/images/PWM/timer_config.webp){:loading="lazy"}

Il est aussi nécessaire de calculer la valeur du prescaler à partir de la clock (4MHz), 
du compteur utilisé (4096) et de la fréquence voulue (50Hz) : `4MHz ÷ (4096*50Hz) - 1 = 18`.

### Génération du signal

Pour commencer la génération du signal, il faut utiliser la fonction `HAL_TIM_PWM_Start` :
```c
// htim1 et TIM_CHANNEL_X sont automatiquement générés par CubeMX
HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);
HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_2);
HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_3);
```

Maintenant que le signal est généré, il est possible de modifier le compte de chaque channel :
```c
htim1.Instance->CCR1 = 205; // Channel 1
htim1.Instance->CCR2 = 410; // Channel 2
htim1.Instance->CCR3 = 615; // Channel 3
```

Enfin, pour arrêter la génération du signal, il faut utiliser la fonction `HAL_TIM_PWM_Stop` :
```c
HAL_TIM_PWM_Stop(&htim1, TIM_CHANNEL_1);
HAL_TIM_PWM_Stop(&htim1, TIM_CHANNEL_2);
HAL_TIM_PWM_Stop(&htim1, TIM_CHANNEL_3);
```
