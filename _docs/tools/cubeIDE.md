---
title: CubeIDE
order: 3
category: Outils
category_order: 1
---

[STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html){:target="_blank"} est l'IDE officiel de STMicroelectronics.

Pour créer un nouveau projet :
- Aller dans `File > New > STM32 Project` et sélectionner une carte :
![Création d'un nouveau projet](/images/IDEs/CubeIDE%20BS.webp){:loading="lazy"}
- Ecrire le nom du projet puis `Finish`

Il est aussi possible d'ouvrir un projet existant :
- Aller dans `File > Open Projects from File System...`
- Sélectionner le dossier du projet puis `Finish`

Avec CubeIDE, la confuguration de la carte est directement intégrée dans l'IDE, mais passe quand même par [STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html){:target="_blank"}, par exemple :
![Configuration de la carte](/images/IDEs/CubeMX.webp){:loading="lazy"}

Une fois la configuration terminée, il suffit d'appuyer sur `Generate Code` pour générer le code de base du projet.
La plupart du temps, vous serez en train de programmer :
![IDE](/images/IDEs/CubeIDE.webp){:loading="lazy"}
