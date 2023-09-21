---
category: Outils
category_order: 1

title: CLion
order: 3
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

### Création d'un projet

Vous pouvez :
- Ouvrir un projet STM32 existant, la configuration est automatique
- Créer un nouveau projet (`File > New Project > STM32CubeMX`)

Dans le cas d'un nouveau projet, CLion demande de sélectioner un `discovery file`.
C'est un fichier utilisé par OpenOCD pour envoyer du code sur la carte correspondante.
Ici, on utilise des cartes `L432KC` donc il faut sélectionner `stm32l4discovery.cfg`.

Voila à quoi ressemble un projet CLion (avec l'ioc ouvert à droite) :
![Projet CLion](/images/IDEs/CLion.webp){: loading="lazy"}

La configuration de la carte utilise, comme pour CubeIDE, l'interface de [CubeMX](../stm32#configuration-dune-carte){:target="_blank"}.