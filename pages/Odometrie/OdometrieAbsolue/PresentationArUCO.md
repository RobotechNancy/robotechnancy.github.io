[order]:       # (2)
[title]:       # (Présentation ArUCO)
[description]: # (Documentation sur la reconaissance d'ArUCO)

Présentation  ArUCO
  
### Codes ArUCO
Un code ArUCO est un marqueur visuel utilisé en vision par ordinateur pour la détection et la position d’objet.

C’est un code carré constitué d’un cadre noir avec à l’intérieur une matrice binaire (noir/blanc) qui permet de déterminer l’identifiant et l’orientation du code en question.

![Image code exemple id 53](/static/images/aruco/codeexemple53.webp){:loading="lazy"}
*Exemple de code ArUCO (ici code 53 en taille 4x4)*

Pour utiliser les codes ArUCO, on définit les dimensions, le type de codage et la taille utilisé par le choix d’un dictionnaire qui contient les informations permettant de reconnaître correctement les codes.

Dans notre cas, nous utilisons des codes de taille 100x100 mm avec un codage interne 4x4.

Ces codes sont placés sur les robots et sur l'aire de jeu du plateau.
  
&nbsp;
### OpenCV
Pour pouvoir analyser le flux image d'une caméra, y reconnaître les codes et estimer les positions de ces dernoers, nous avons besoin d’utiliser une bibliothèque de traitement d’image et de données : OpenCV.

OpenCV (Open Source Computer Vision Library) est une bibliothèque logicielle de vision par ordinateur et d'apprentissage automatique à code source ouvert. 

OpenCV a été conçu pour fournir une infrastructure commune pour les applications de vision par ordinateur et pour accélérer l'utilisation de la perception automatique dans les produits commerciaux.

La bibliothèque comprend plus de 2500 algorithmes optimisés, dont un ensemble complet d'algorithmes de vision artificielle et d'apprentissage automatique classiques et de pointe. 

Ces algorithmes peuvent être utilisés pour détecter et reconnaître des visages, identifier des objets, suivre les mouvements de caméra, suivre des objets en mouvement, extraire des modèles 3D d'objets, produire des nuages de points 3D à partir de caméras stéréo, assembler des images pour produire une image haute résolution d'une scène entière, trouver des images similaires dans une base de données d'images, reconnaître des paysages et établir des marqueurs pour les superposer à la réalité augmentée, etc. 

  
&nbsp;
On l'utilise pour détecter et lire les codes ArUCO :

- l’image est analysée pour trouver des formes carrées qui seraient des marqueurs.
Dans cette étape, l'image est analysée afin de trouver des formes carrées susceptibles d'être des marqueurs. Elle commence par un seuillage adaptatif pour segmenter les marqueurs, puis les contours sont extraits de l'image seuillée et ceux qui ne sont pas convexes ou qui ne se rapprochent pas d'une forme carrée sont éliminés. Un filtrage supplémentaire est également appliqué (suppression des contours trop petits ou trop grands, suppression des contours trop proches les uns des autres, etc.)

- la codification interne est ensuite lu (matrice de carrés) et les dimensions sont analysé sur l’image transformée pour déterminer s’il y a bien un code appartement au dictionnaire utilisé
Ici, on détermine s'il s'agit bien de marqueurs en analysant leur codification interne. Cette étape commence par l'extraction des bits de chaque marqueur. Pour ce faire, une transformation de perspective est d'abord appliquée pour obtenir le marqueur sous sa forme canonique. Ensuite, l'image canonique est seuillée à l'aide d'Otsu pour séparer les bits blancs et noirs. L'image est divisée en différentes cellules en fonction de la taille du marqueur et de la taille de la bordure. Le nombre de pixels noirs ou blancs dans chaque cellule est ensuite compté pour déterminer s'il s'agit d'un bit blanc ou noir. Enfin, les bits sont analysés pour déterminer si le marqueur appartient au dictionnaire spécifique.

- on obtient et enregistre données de positions des coins et orientation du code

  
&nbsp;
Les codes ArUCO de références sont positionnés sur le plateau dont leurs coordonnées et leurs identifiants sont connus, ce qui permet de les utiliser par caméras afin de récupérer les autres codes par rapport à un de ces codes de référence.

![Terrain de jeu plateau avec codes](/static/images/aruco/playground.webp){:loading="lazy"}
*Plateau de jeu 2024*

Ici, il y a (encadrés orange-rouge) :

-le code 20 en haut à gauche (701 ; 1551)

-le code 21 en haut à droite (2201 ; 1551)

-le code 22 en bas à gauche (701 ; 551)

-le code 23 en bas à droite (2201 ; 551)
