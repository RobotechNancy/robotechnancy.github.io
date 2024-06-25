[order]:       # (2)
[title]:       # (Calibration)
[description]: # (Documentation sur la calibration)

Doc sur les fonctions de calibration
  
Le premier programme est la calibration. C’est ce qui permet de modéliser la caméra pour récupérer données permettant de lier l’espace réel et les points images.
  
Ce programme contient deux fonctions exécutables :
  
#### “board” 
qui permet de générer une grille ArUCO en utilisant les informations issues de la configuration (dictionnaire ArUCO choisi et les infos marqueurs : taille et espacement), qui est ensuite imprimé et utilisé pour calibrer la caméra avec l’autre fonction.
  
  
- Cette grille est donc utilisée avec la fonction “calibrate” 
#### “calibrate”
qui permet de prendre des captures de la grille sous différents angles, orientations et éloignements. 
Elle fonctionne comme suit :
  
-La grille de calibration est détecté
-On appuie sur « c » pour prendre des captures de l’image
-Une fois les nombreuses captures prises, la fonction compare des données issues de la reconnaissance de la grille physique à la même grille d’origine reconstruite numériquement (utilisation des informations de configuration)
-Cette comparaison permet de calculer des paramètres de la caméra
-Ces paramètres sont ensuite enregistrés dans le fichier "camera_params.yml"
  