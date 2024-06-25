[order]:       # (2)
[title]:       # (Présentation ArUCO)
[description]: # (Documentation sur les codes ArUCO)

Présentation codes ArUCO
  
Un code ArUCO est un marqueur visuel utilisé en vision par ordinateur pour la détection et la position d’objet.
C’est un code carré constitué d’un cadre noir avec à l’intérieur une matrice binaire (noir/blanc) qui permet de
déterminer l’identifiant et l’orientation du code en question.
Afin de pouvoir utiliser les codes ArUCO, on définit les dimensions, le type de codage et la taille utilisé par le choix d’un dictionnaire qui contient les informations permettant de reconnaître correctement les codes.
Dans notre cas, nous utilisons des codes de taille 100x100 mm avec un codage interne 4x4.
Ces codes sont placés sur le robot et sur le plateau.
  
&nbsp;
Pour pouvoir analyser un flux d’images, reconnaître les codes et estimer des positions nous avons besoin d’utiliser une bibliothèque de traitement d’image et de données appelé OpenCV.
  
&nbsp;
Pour détecter et lire les codes ArUCO :
- l’image est analysée pour trouver des formes carrées qui seraient des marqueurs.
- la codification interne est ensuite lu (matrice de carrés) et les dimensions sont analysé sur l’image transformée pour déterminer s’il y a bien un code appartement au dictionnaire utilisé
- on obtient et enregistre données de positions des coins et orientation du code
  
&nbsp;
Les codes ArUCO de références sont positionnés sur le plateau dont leurs coordonnées et leurs identifiants sont connus, ce qui permet de les utiliser par caméras afin de récupérer les autres codes par rapport à un de ces codes de référence.
