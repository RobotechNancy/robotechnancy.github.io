---
title: STM32
order: 2
category: Programmation embarquée
category_order: 1
---

Pour contrôler la base roulante, les actionneurs et les différents capteurs, des cartes STM32 sont utilisées.
Ce sont des microcontrôleurs sans OS et programmables en C/C++.

Jusque là, seules des [L432KC](https://os.mbed.com/platforms/ST-Nucleo-L432KC/){:target="_blank"} ont été utilisées :
![L432KC](/images/components/L432KC.webp){: loading="lazy"}

Quelques options sont disponibles pour faciliter le développement :
- [STM32CubeIDE](../cubeIDE) : IDE développé par STMicroelectronics
- [CLion](../clion) : IDE développé par JetBrains (gratuit pour les étudiants)
- [Arduino](https://github.com/stm32duino/Arduino_Core_STM32#readme){:target="_blank"} : non couvert ici

CubeIDE intègre directement tous les outils nécessaires au développement STM32 mais personnellement, je préfère CLion (plus simple et spécialisé dans le C/C++).