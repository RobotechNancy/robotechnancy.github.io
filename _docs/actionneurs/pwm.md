---
title: PWM sur STM32
order: 3
category: Actionneurs
category_order: 4
---

Les turbines EDF30 et les servos-moteurs sont contrôlées par [PWM](/actionneurs/pwm){:target="_blank"} avec une [librairie custom](https://github.com/RobotechNancy/Actionneurs/tree/master/EDF30){:target="_blank"} :
![EDF30](/images/diagrams/EDF30.webp){:loading="lazy"}

Paramétrage de la clock sur STM32CubeMX :
- Clock utilisée : TIM1 (APB2)
- Channels : CH1N, CH2 et CH3 (PA7, PA9, PA10)
- Fréquence : 4MHz
- Prescaler : 16
- Counter Period : 4096

On obtient un signal d'environ 50Hz avec des cycles divisés en 4096 comptes. 

### Utilisation de la librairie

La librairie est configurable avec les paramètres suivants :
- `PWM_MAX ...` : Nombre de comptes maximum

La librairie contient les fonctions suivantes :
```c
/*!
 *  @brief Démarrer le timer pour générer le PWM sur un channel
 *  @param i2c Généralement &htim1 (structure d'STM du timer configuré)
 *  @param channel Channel du timer (TIM_CHANNEL_1, TIM_CHANNEL_2 ou TIM_CHANNEL_3)
 *  @return Code d'erreur
 */
int PWM_start(TIM_HandleTypeDef *timer, uint32_t channel);


/*!
 *  @brief Arrêter le timer qui génère le PWM sur un channel
 *  @param i2c Généralement &htim1 (structure d'STM du timer configuré)
 *  @param channel Channel du timer (TIM_CHANNEL_1, TIM_CHANNEL_2 ou TIM_CHANNEL_3)
 *  @return Code d'erreur
 */
int PWM_stop(TIM_HandleTypeDef *timer, uint32_t channel);


/*!
 *  @brief Définir directement le cycle de travail du PWM
 *  @param timer Généralement &htim1 (structure d'STM du timer configuré)
 *  @param channel Channel du timer (TIM_CHANNEL_1, TIM_CHANNEL_2 ou TIM_CHANNEL_3)
 *  @param count Valeur du compteur (0 à EDF30_PWM_MAX)
 *  @return Code d'erreur
 */
int PWM_set_count(TIM_HandleTypeDef *timer, uint32_t channel, uint16_t count);


/*!
 *  @brief Définir le cycle de travail du PWM en pourcentage
 *  @param timer Généralement &htim1 (structure d'STM du timer configuré)
 *  @param channel Channel du timer (TIM_CHANNEL_1, TIM_CHANNEL_2 ou TIM_CHANNEL_3)
 *  @param duty_cycle Cycle de travail (0 à 1)
 *  @return Code d'erreur
 */
int PWM_set_cycle(TIM_HandleTypeDef *timer, uint32_t channel, float duty_cycle);
```
