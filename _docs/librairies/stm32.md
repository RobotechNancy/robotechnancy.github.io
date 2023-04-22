---
title: Développement STM32
order: 3
category: Librairies
category_order: 1
---

Quelques options sont disponibles pour développer sur des microcontrôleurs STM32 :
- [CLion](https://www.jetbrains.com/clion/) : IDE développé par JetBrains
- [Arduino IDE](https://www.arduino.cc/en/Main/Software) : IDE développé par Arduino
- [STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html) : IDE développé par STMicroelectronics

Bien que CubeIDE offre une expérience clé en main (compilation, téléversement, debug) :
- CLion est plus personnalisable et plus performant
- Arduino IDE est plus simple d'utilisation et contient de nombreuses librairies

{:.warning}
> **Attention :** Les librairies Arduino offrent une grande abstraction mais peuvent freiner l'apprentissage de la programmation embarquée
(protocoles de communication, gestion de la mémoire, etc.)

### Arduino IDE

L'IDE Arduino est gratuit est téléchargeable [ici](https://www.arduino.cc/en/software) pour toutes les plateformes.
Ce tutoriel s'appuie sur la V2 du logiciel mais les étapes sont identiques à la V1.

D'abord, il faut installer le Boards Manager STM32 :
- Aller dans `File > Preferences` et spécifiez [ce lien](https://github.com/stm32duino/BoardManagerFiles/raw/main/package_stmicroelectronics_index.json) (Image 1)
- Aller dans `Tools > Board > Boards Manager` et installez`STM32 MCU based boards` (Image 2)

![Ajout Boards Manager](/images/IDEs/AIDE%20BM1.webp){:.inline-img}
![Installation Boards Manager STM32](/images/IDEs/AIDE%20BM2.webp){:.inline-img}

Maintenant, on sélectionne notre carte :
- Aller dans `Tools > Board > STM32 MCU based boards` et choisir le type (32 pins → Nucleo-32)
- Aller dans `Tools > Board Part Number` et choisir le modèle (Nucleo L432KC par exemple)

### CLion

[CLion](https://www.jetbrains.com/clion/download/) est normalement payant mais il est gratuit pour les [étudiants](https://www.jetbrains.com/shop/eform/students).

Une fois l'IDE installé, il faut installer quelques librairies :
```bash
# Debian/Ubuntu
sudo apt install gcc-arm-none-eabi
sudo apt install g++-arm-none-eabi
sudo apt install gdb-arm-none-eabi
sudo apt install openocd

# Fedora/CentOS/RHEL
sudo dnf install arm-none-eabi-gcc-cs
sudo dnf install arm-none-eabi-gcc-cs-c++
sudo dnf install arm-none-eabi-gdb
sudo dnf install openocd

# Pour windows ou mac, bonne chance (de toute façon, qui utilise ça pour du dev ?)
```

Deux options pour créer un projet CLion :
- Ouvrir un projet STM32 existant, la configuration se fait automatiquement
- Créer un nouveau projet (`File > New Project > STM32CubeMX`)

La sélection et la configuration de la carte (`.ioc`) se fait avec [STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html) et se passe de la même manière que pour STM32CubeIDE (cf. section `STM32CubeIDE`).

### STM32CubeIDE

[STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html) est l'IDE officiel de STMicroelectronics.
Il est gratuit mais nécessite un compte STM ou de fournir un nom, prénom et adresse mail.

Pour créer un nouveau projet :

- Aller dans `File > New > STM32 Project` et sélectionner une carte :
![Création d'un nouveau projet](/images/IDEs/CubeIDE%20BS.webp)
- Ecrire le nom du projet puis `Finish`

Il est aussi possible d'ouvrir un projet existant :
- Aller dans `File > Open Projects from File System...`
- Sélectionner le dossier du projet puis `Finish`

Avec CubeIDE, la confuguration de la carte est directement intégrée dans l'IDE, mais passe quand même par [STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html) :
![Configuration de la carte](/images/IDEs/CubeMX.webp)