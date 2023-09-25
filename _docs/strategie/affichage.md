---
category: Stratégie
category_order: 5

title: Affichage
order: 2
---

Par manque de temps, l'[écran tactile](https://github.com/RobotechNancy/Ecrans){:target="_blank"} a été remplacé par un écran LCD 2x16 :
![Ecran LCD](/images/strategy/LCD.webp){: loading="lazy"}

> **Note :** L'objectif est de pleinement utiliser l'écran tactile pour afficher plus d'informations et facilement intéragir avec le robot.

### Librairie LCD

L'écran LCD permet d'afficher deux lignes de 16 caractères en utilisant le protocole I2C :
- Adresse I2C : `0x3E`
- Registre de données : `0x40`
- Registre de commande : `0x80`

Toute l'initialisation est automatique avec la fonction `LCD::init` :

| Registre | Commande                       | Valeur                                          | Description                           |
| :------- | :----------------------------- | :---------------------------------------------- | :------------------------------------ |
| `0x80`   | `LCD_FUNCTION_SET` (`0x20`)    | `LCD_2LINE` (`0x08`) et `LCD_5x10DOTS` (`0x04`) | 2 lignes et caractères de 5x10 pixels |
| `0x80`   | `LCD_DISPLAY_CONTROL` (`0x08`) | `LCD_DISPLAY_ON` (`0x04`)                       | Ecran allumé                          |

Pour faciliter l'écriture sur l'écran, trois fonctions sont disponibles :
- `lcd.print("Hello World!")` : afficher une chaîne de caractères
- `lcd.clear()` : effacer l'écran
- `lcd.setCursor(0, 0)` : déplacer le curseur à la position (0, 0)

> **Note :** il peut y avoir une différence entre la commande envoyée et le texte affiché,
cela peut venir à un délai trop court entre deux commandes.
