[order]:       # (1)
[title]:       # (Configuration)
[description]: # (Documentation sur la configuration)

Doc sur la configuration
  
Nous avons tout d’abord en premier lieu la configuration, c’est-à-dire la définition de et données et paramètres qui seront utilisés par les programmes, qui se trouvent dans le fichier "config.yml".
Ce fichier contient les informations suivantes :
-des chemins pour accéder à des fichiers de paramètres ou pour enregistrer la grille ArUCO de calibration
  
-le port et l’adresse Xbee utilisés pour la communication Xbee (l’adresse change en fonction de la caméra et du robot)
  
-les dimensions des codes ArUCO utilisés (en pixels et en m) ainsi que dictionnaire utilisé (4x4 et 100 mm)
  
-les ids et positions des codes de références se trouvant sur le plateau
  
  
Ce fichier est utilisé pour récupérer les données utilisées dans le code, où certaines données sont choisies spécifiquement en fonction de la situation, notamment en ce qui concerne le code de référence utilisé par la caméra qui est défini selon la caméra et l’équipe.
Ces données sont récupérées et enregistrées dans des objets d’estimation et de tests (des structures organisant les données qui seront manipulées), en particulier les informations concernant l’ID du marqueur de référence, sa position sur l’aire de jeu, et les paramètres de la caméra.
  
