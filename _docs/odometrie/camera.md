---
title: Caméra ArUCO
order: 1
category: Odométrie
category_order: 3
---

Des tags ArUCO sont placés sur le plateau et les éléments de jeu. Pour situer ces tags, deux modules sont placés sur des balises :
![Terrain de jeu](/images/diagrams/Playground.webp){:loading="lazy"}

Chaque balise est montée d'un module contenant :
- Une caméra
- Un module [XBee](/communication/XBee/principe){:target="_blank"} (S1 Pro)
- Une batterie LiFePO4
- Un [Raspberry Pi 3B+](/communication/XBee/raspberry){:target="_blank"} ([OpenCV](https://opencv.org/){:target="_blank"} et [OpenCV contrib](https://github.com/opencv/opencv_contrib){:target="_blank"})

### Installation

Pour utiliser la [librairie ArUCO](https://github.com/RobotechNancy/Odometrie/tree/master/camera_aruco), il faut installer :
- La librairie custom [XBee](/communication/XBee/raspberry/#installation-de-la-librairie){:target="_blank"}
- La librairie OpenCV avec OpenCV contrib :

  ```bash
  git clone https://github.com/opencv/opencv.git
  mkdir opencv/build && cd opencv/build && mkdir modules

  sudo apt-get install subversion
  sudo apt-get install libapache2-mod-svn 
  # ou sudo dnf install svn
  svn export https://github.com/opencv/opencv_contrib/trunk/modules/aruco
  mv aruco modules
  
  sudo apt install cmake
  cmake -DOPENCV_EXTRA_MODULES_PATH=./modules ..
  sudo make install -j$(nproc)
  ```

### Calibration

Pour avoir une meilleure détection, il est nécessaire de déterminer plusieurs paramètres :
- Définir les paramètres de la librairie dans `data/lib_params.yml`
- Générer une grille ArUCO avec `./ArUCO board`
- Lancer le script de calibration avec `./ArUCO calibrate`
- Capturer une image avec la caméra en appuyant sur `c`
- Une fois plusieurs points de vue capturés, appuyer sur `ECHAP`

Si tout s'est bien passé, un fichier `data/camera_params.yml` a été créé contenant les paramètres de la caméra (matrice de projection, distorsion, etc...).

### Utilisation

Pour lancer il suffit d'exécuter `./ArUCO estimate`, les paramètres sont repris de `data/camera_params.yml` et `data/lib_params.yml`.
Pour plus de détails, voir le code source de la [librairie ArUCO](https://github.com/RobotechNancy/Odometrie/tree/master/camera_aruco){:target="_blank"}