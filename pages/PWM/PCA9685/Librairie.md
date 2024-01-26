[order]:       # (1)
[title]:       # (Utiliser la librairie)
[description]: # (Comment utiliser la librairie custom pour générer jusqu'à 16 signaux PWM)

La carte PCA9685 permet de contrôler jusqu'à 16 sorties [PWM](/PWM/STM32) par I2C :
![PCA965](/static/images/PWM/PCA9685.webp){:loading="lazy"}

### Initialisation

L'initialisation de la carte se fait automatiquement avec `PCA9685_init()`. Quelques détails importants sur la carte :

- Clock interne de 25MHz
- Compteur 12 bits (0 à 4095)
- Fréquence du bus I2C : 100kHz
- Résistances de pull-up externes : 1 kΩ
- Output Enable (OE) à 0 pour activer les sorties

### Contrôle des sorties

Pour contrôler une sortie, il faut d'abord modifier certaines valeurs dans `PCA9685.h` :

| Servo-moteur | PCA_PRESCALER_FREQ (Hz) | PCA_PWM_MIN_TIME (ms) | PCA_PWM_MAX_TIME (ms) |
| :----------- | :---------------------: | :-------------------: | :-------------------: |
| Analogique   | 50Hz                    | 1.0                   | 2.0                   |
| Numérique    | 125Hz                   | 0.5                   | 2.5                   |
| Numérique    | 250Hz                   | 0.266                 | 0.533                 |

Les comptes sont alors automatiquement calculés et stockés dans `PCA9685.h` :

| Servo-moteur      | PCA_PWM_RANGE | PCA_PWM_MIN | PCA_PWM_MAX |
| :---------------- | :-----------: | :---------: | :---------: |
| Analogique        | 204           | 205         | 409         |
| Numérique (125Hz) | 1024          | 256         | 1280        |
| Numérique (250Hz) | 273           | 272         | 545         |

Après avoir initialisé la carte avec `PCA9685_init()`, on peut contrôler les sorties :

```c
// Directement définir la valeur du PWM (0 à PCA_PWM_RANGE)
int PCA9685_set_pwm(I2C_HandleTypeDef *i2c, uint8_t channel, uint16_t points)

// Définir un cycle (entre 0 et 1)
int PCA9685_set_cycle(I2C_HandleTypeDef *i2c, uint8_t channel, float duty_cycle)

// Désactiver un channel (0 à 15)
int PCA9685_turn_off(I2C_HandleTypeDef *i2c, uint8_t channel)
```
