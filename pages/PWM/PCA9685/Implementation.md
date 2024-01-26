[order]:       # (2)
[title]:       # (Implémentation)
[description]: # (Documentation sur l'implémentation de la librairie custom)

La librairie communique en I2C avec le PCA9685 pour générer les signaux PWM.
Souvent, seuls deux octets sont envoyés à la carte, le registre à écrire et la valeur à écrire dans ce registre :
```c
uint8_t data[2] = {0x00, 0b00110000};

HAL_I2C_Master_Transmit(
    &hi2c1,           // Interface I2C
    PCA_I2C_ADDR,     // Adresse de la carte (ici 0x80)
    data,             // Registre puis valeur à écrire
    2,                // Taille des données          
    PCA_I2C_TIMEOUT   // Timeout
);
```

La carte PCA9685 permet aussi d'écrire sur plusieurs registres en une seule fois :
```c
uint8_t data[3] = {0x00, 0b00110000, 0b00100101};
HAL_I2C_Master_Transmit(&hi2c1, PCA_I2C_ADDR, data, 3, PCA_I2C_TIMEOUT);
```

Dans ce cas, la valeur `0b00110000` est écrite dans le registre `0x00` et la valeur `0b00100101` est écrite dans le registre suivant (et ainsi de suite).

### Initialisation

Trois registres sont dédiés à la configuration du PCA9685 :

|    Nom    | Registre |   Valeur   |
| :-------- | :------: | :--------: |
| MODE1     | 0x00     | 0b00100000 |
| MODE2     | 0x01     | 0b00000000 |
| PRE_SCALE | 0xFE     | 0x79       |

> Le prescaler est défini pour une fréquence de 50Hz avec la formule suivante :<br>
> D = 25MHz ÷ (4096*50Hz) - 1 = 121 = 0x79

Les registres `MODE1` et `MODE2` sont définis comme suit :

| Bit | Symbole | Description                                            | Valeur |
| :-: | :-----: | :----------------------------------------------------- | :----: |
| 7   | RESTART | Redémarrage activé                                     | 0      |
| 6   | EXTCLK  | Utilisation d'un clock externe                         | 0      |
| 5   | AI      | Ecriture des registres avec incrémentation automatique | 1      |
| 4   | SLEEP   | Mode veille, activé pour définir le prescaler          | 0      |
| 3   | SUB1    | La carte ne réagit pas à la sous-adresse 1             | 0      |
| 2   | SUB2    | La carte ne réagit pas à la sous-adresse 2             | 0      |
| 1   | SUB3    | La carte ne réagit pas à la sous-adresse 3             | 0      |
| 0   | ALLCALL | La carte ne réagit pas aux appels All Call             | 0      |

| Bit   | Symbole | Description                                                                          | Valeur |
| :---: | :-----: | :----------------------------------------------------------------------------------- | :----: |
| 7 - 5 | -       | Réservés                                                                             | 000    |
| 4     | INVRT   | L'état logique des sorties n'est pas inversé                                         | 0      |
| 3     | OCH     | Voir page 16 de la [datasheet](https://cdn-shop.adafruit.com/datasheets/PCA9685.pdf) | 0      |
| 2     | OUTDRV  | Les sorties sont en mode open-drain                                                  | 0      |
| 1 - 0 | OUTNE0  | Voir page 16 de la [datasheet](https://cdn-shop.adafruit.com/datasheets/PCA9685.pdf) | 00     |

On utilise `AI` pour désactiver toutes les sorties puis on définit la valeur du prescaler :

- Écrire `0b00110000` dans le registre `MODE1` pour activer le bit `SLEEP` et le bit `AI`
- Écrire `0x79` dans le registre `0xFE` pour définir le prescaler
- Écrire `0b00100000` dans le registre `MODE1` pour désactiver le bit `SLEEP`

### Contrôle des sorties

Toutes les fonctions liées au contrôle des sorties renvoient un code d'erreur si la sortie demandée n'existe pas ou si la valeur demandée est en dehors des limites.

Pour définir un compte, une règle de trois est utilisée :
```c
uint16_t on_count = map(
    points,         // Valeur à convertir
    0,              // Minimum en entrée
    PCA_PWM_RANGE,  // Maximum en entrée
    PCA_PWM_MIN,    // Minimum en sortie
    PCA_PWM_MAX     // Maximum en sortie
);
```

Similairement pour un cycle de travail :
```c
uint16_t points = (uint16_t) (duty_cycle*PCA_PWM_RANGE);

uint16_t on_count = map(
    points,         // Valeur à convertir
    0,              // Minimum en entrée
    PCA_PWM_RANGE,  // Maximum en entrée
    PCA_PWM_MIN,    // Minimum en sortie
    PCA_PWM_MAX     // Maximum en sortie
);
```

Une fois le compte `ON` calculé, on le sépare en deux octets et on les écrit dans les registres `LEDn_ON_L` et `LEDn_ON_H` :
```c
uint8_t data[2] = {0x??, 0x??};
PCA9685_write_data(i2c, PCA_REG_CHAN0_OFF_L + channel*4, data, 2);
```

Il y a quatre registres par canal, deux pour le compte `ON` et deux pour le compte `OFF` donc on part du registre `LEDn_ON_L` et on ajoute `channel*4` pour obtenir le registre `LEDn_ON_L` du canal demandé.

Similairement pour éteindre une sortie :
```c
// Ces valeurs correspondent à LEDn full OFF
uint8_t data[2] = {0x00, 0x10};
PCA9685_write_data(i2c, PCA_REG_CHAN0_OFF_L + channel*4, data, 2);
```
