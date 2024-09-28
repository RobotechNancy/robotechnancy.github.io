[order]:       # (1)
[title]:       # (Présentation Odométrie)
[description]: # (Documentation sur l'odométrie)

L'odométrie est une technique utilisée pour pouvoir estimer la position d'un objet en mouvement dans l'espace.
L'objet bouge dans une zone et l'odométrie permet d'obtenir sa position le plus précisément possible selon la situation et l'équpement.
  
Dans notre cas, nous voulons estimer la position du robot dans l'air de jeu avec l'odométrie.
![Robot sur le plateau de jeu](/static/images/aruco/robotplateau.webp){:loading="lazy"}
  
Il existe deux types d'odométrie : l'odométrie relative et l'odométrie absolue.
  
  
### L'odométrie relative :
Elle consiste à obtenir la position actuelle de l'objet par rapport à la position précédente.
On obtient cette position par exemple au moyen de capteurs installés sur l'objet lui-même.
  
Dans notre cas, nous utilisons actuellement un capteur optique avec des lumières pour mesurer le mouvement, et un gyroscope pour la mesure de l'orientation, étant tout deux sur le robot.
  
  
### L'odométrie absolue :
Elle consiste à obtenir la position du robot par rapport à un ou des repères extérieur.
On utilise en particulier des capteurs externes et des marqueurs visuels pour estimer les distances entre ces deriners, permettant d'obtenir la position par rapport à un repère défini.

Dans notre cas, nous utilisons 3 caméras mis sur des poteaux qui sont placés autour du plateau. Ces derniers fonctionnent en reconnaissant des codes ArUCO pour ensuite estimer les distances et finalement communiquer les coordonnées de chaque code dans le repère du plateau au robot, par le biais d'Xbee.
  
![Schéma localisation robot par caméras](/static/images/aruco/odometrieabsoluecam.webp){:loading="lazy"}
  