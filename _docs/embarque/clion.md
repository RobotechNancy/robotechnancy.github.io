---
title: CLion
order: 4
category: Programmation embarquée
category_order: 1
---

[CLion](https://www.jetbrains.com/clion/download/){:target="_blank"} est normalement payant mais il est gratuit pour les [étudiants](https://www.jetbrains.com/shop/eform/students){:target="_blank"}.

Une fois l'IDE installé, il faut installer la toolchain ARM :
```bash
# Debian/Ubuntu
sudo apt install gcc-arm-none-eabi \
                 g++-arm-none-eabi

# Fedora/CentOS/RHEL
sudo dnf install arm-none-eabi-gcc-cs \
                 arm-none-eabi-gcc-cs-c++

# En cas de problème d'installation, tout est disponible ici :
# https://developer.arm.com/downloads/-/gnu-rm
```

Puis pour pouvoir débug les cartes, il faut installer OpenOCD :
```bash
# Debian/Ubuntu
sudo apt install openocd

# Fedora/CentOS/RHEL
sudo dnf install openocd
```

Deux options pour créer un projet CLion :
- Ouvrir un projet STM32 existant, la configuration se fait automatiquement
- Créer un nouveau projet (`File > New Project > STM32CubeMX`)

La sélection et la configuration de la carte (`.ioc`) se fait avec [STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html){:target="_blank"} et se passe de la même manière que pour STM32CubeIDE (cf. section `STM32CubeIDE`).

Voila à quoi ressemble un projet CLion (avec l'ioc ouvert à droite) :
![Projet CLion](/images/IDEs/CLion.webp){: loading="lazy"}
