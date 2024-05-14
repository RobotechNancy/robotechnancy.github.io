[order]:       # (1)
[title]:       # (Marqueurs ArUCO)
[description]: # (Documentation sur les marqueurs ArUCO)

Des tags ArUCO (en rouge) sont placés sur le plateau et les éléments de jeu. Pour situer ces tags, des modules sont placés sur des balises (en bleu ou jaune) :
![Terrain de jeu](/static/images/aruco/playground.webp){:loading="lazy"}

Chaque balise est montée d'un module contenant :

- Une caméra
- Un module [XBee](/communication/XBee/principe) (S1 Pro)
- Une batterie LiFePO4
- Un Raspberry Pi Zero ([OpenCV](https://opencv.org/) et [OpenCV contrib](https://github.com/opencv/opencv_contrib))

### Installation

Pour utiliser la [librairie ArUCO](https://github.com/RobotechNancy/Odometrie/tree/master/ArUCO), il faut installer :

- La librairie custom [XBee](/XBee/Librairie)
- La librairie OpenCV avec OpenCV contrib :
```bash
# Installe Cmake
sudo apt install cmake libgtk2.0-dev

git clone https://github.com/opencv/opencv.git
mkdir opencv/build && cd opencv/build && mkdir modules

git clone https://github.com/opencv/opencv_contrib.git
mv opencv_contrib/modules/aruco modules

cmake -DOPENCV_EXTRA_MODULES_PATH=./modules ..
sudo make install # Ajouter -j3 accélère la compilation mais peut faire crasher la Raspberry Pi
```

> [!WARNING]
> Le processus d'installation peut prendre plusieures heures sur une Raspberry Pi.
> Il est aussi possible de cross-compiler OpenCV (non testé).

### Calibration

Pour avoir une meilleure détection, il est nécessaire de calibrer la caméra :

- Définir les paramètres dans `data/config.yml`
- Générer une grille ArUCO avec `./ArUCO board`
- Démarrer la calibration avec `./ArUCO calibrate`
- Prendre plusieurs point de vue avec `c`
- Calculer les paramètres en appuyant `ECHAP`

Si tout s'est bien passé, un fichier `data/camera_params.yml` a été créé contenant les paramètres de la caméra (matrice de projection, distorsion, etc...).

### Utilisation

`./ArUCO estimate` permet de lancer le script de détection et d'estimation de la position des tags ArUCO.
Les paramètres sont repris de `data/camera_params.yml` et `data/config.yml` et les positions sont données par rapport à un tag de référence (`ref_marker_id`).

![ArUCO Estimation](/static/images/aruco/estimation.webp){:loading="lazy" style="display: inline-block;" }
![ArUCO AR](/static/images/aruco/AR.webp){:loading="lazy" style="display: inline-block;" }
{: style="text-align: center" }
