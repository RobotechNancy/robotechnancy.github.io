---
category: Outils
category_order: 1

title: STM32
order: 2
---

Pour contrôler la base roulante, les actionneurs et les différents capteurs, des cartes STM32 sont utilisées.
Ce sont des microcontrôleurs sans OS et programmables en C/C++.

Jusque là, seules des [L432KC](https://os.mbed.com/platforms/ST-Nucleo-L432KC/){:target="_blank"} ont été utilisées :
![L432KC](/images/tools/L432KC.webp){: loading="lazy"}

Quelques options sont disponibles pour faciliter le développement :
- [STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html){:target="_blank"} : IDE développé par STMicroelectronics
- [CLion](/tools/clion){:target="_blank"} : IDE développé par JetBrains (gratuit pour les étudiants)
- [Arduino](https://github.com/stm32duino/Arduino_Core_STM32#readme){:target="_blank"} : non couvert ici

CubeIDE intègre directement tous les outils nécessaires au développement STM32 mais personnellement, je préfère CLion (plus simple et spécialisé dans le C/C++).

### Création d'un projet CubeIDE

La création d'un projet passe par `ST-MCU-Finder` (`File` → `New` → `STM32 Project`) :
![Création d'un nouveau projet](/images/tools/board_selection.webp){:loading="lazy"}

### Configuration d'une carte

Il suffit d'ouvrir le fichier `.ioc` et [STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html){:target="_blank"} s'ouvrira :
![Configuration de la carte](/images/tools/CubeMX.webp){:loading="lazy"}

Les L432KC offrent de nombreuses fonctionnalités, leur configuration sera détaillée dans un autre article.