---
category: Odométrie
category_order: 3

title: Caméra ArUCO
order: 1
---

Des tags ArUCO (en rouge) sont placés sur le plateau et les éléments de jeu. Pour situer ces tags, des modules sont placés sur des balises (en bleu) :
![Terrain de jeu](/images/aruco/playground.webp){:loading="lazy"}

Chaque balise est montée d'un module contenant :
- Une caméra
- Un module [XBee](/communication/XBee/principe){:target="_blank"} (S1 Pro)
- Une batterie LiFePO4
- Un [Raspberry Pi 3B+](/communication/XBee/raspberry){:target="_blank"} ([OpenCV](https://opencv.org/){:target="_blank"} et [OpenCV contrib](https://github.com/opencv/opencv_contrib){:target="_blank"})

### Installation

Pour utiliser la [librairie ArUCO](https://github.com/RobotechNancy/Odometrie/tree/master/ArUCO), il faut installer :
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

Pour avoir une meilleure détection, il est nécessaire de calibrer la caméra :
![Grille ArUCO](/images/aruco/board.webp){:loading="lazy" .left-img}
- Définir les paramètres dans `data/config.yml`
- Générer une grille ArUCO avec `./ArUCO board`
- Démarrer la calibration avec `./ArUCO calibrate`
- Prendre plusieurs point de vue avec `c`
- Calculer les paramètres en appuyant `ECHAP`

Si tout s'est bien passé, un fichier `data/camera_params.yml` a été créé contenant les paramètres de la caméra (matrice de projection, distorsion, etc...).

### Utilisation

Pour lancer il suffit d'exécuter `./ArUCO estimate`, les paramètres sont repris de `data/camera_params.yml` et `data/config.yml`.
Toutes les positions sont données par rapport à un tag de référence (`ref_marker_id`) :

{: style="text-align: center" }
![ArUCO Estimation](/images/aruco/estimation.webp){:loading="lazy" .inline-img}
![ArUCO AR](/images/aruco/AR.webp){:loading="lazy" .inline-img}