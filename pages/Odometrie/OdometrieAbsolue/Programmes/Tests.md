[order]:       # (3)
[title]:       # (Tests)
[description]: # (Documentation sur les Tests)

Doc sur les fonctions de tests
  
Nous avons réalisé des fonctions de tests qui nous permettent de pouvoir vérifier le bon fonctionnement de la reconnaissance ArUCO et aussi pouvoir faire des mesures et tests.
Ces fonctions pourront aussi être utiles pour les prochaines personnes de l’équipe afin de pouvoir découvrir et prendre en main rapidement la détection.
  
Il y a 4 fonctions différentes :
  
&nbsp;
#### "testDetection"
  
Cette fonction permet de tester la détection des codes ArUCO.
Lors de son exécution, il montre la sortie image de la caméra en affichant les ids, le coin 1 (haut-gauche) et les axes de chaque code ArUCO détecté par la caméra.
Cela permet de voir quels sont les codes qui sont détectés et voir leur orientation par rapport à la caméra.
  
  
Nous avons souvent utilisé cette fonction pour vérifier que la caméra fonctionnait bien et aussi avant de lancer l’estimation pour s’assurer des codes détectés.
  
&nbsp;
#### "testPosition"
  
Cette fonction permet de tester la position image de codes détectés par leur coin 1.
Lors de l’exécution, on affiche les ids et les coordonnées sur l’image en pixels du coin 1 (haut-gauche). Il y a une attente de 2 secondes pour éviter trop de données d’un coup.
La fonction nous donne donc la position des codes par leurs coins 1 dans l’image, où le repère (0;0) est placé en haut à gauche de l’image.
  
  
Cela a est utile pour comprendre et vérifier le positionnement image issue de la reconnaissance par OpenCV.
  
&nbsp;
#### "testCoherence"
  
Cette fonction permet de tester la cohérence des codes détectés, c’est-à-dire savoir si le code détecté est bien conforme aux dimensions, avec les 4 coins bien corrects par les coordonnées images (pixels).
Lors de l’exécution, on affiche les ids et les coordonnées sur l’image en pixels des 4 coins, ainsi que le résultat du calcul de cohérence. Il y a une attente de 2 secondes pour éviter trop de données d’un coup.
La fonction nous donne donc la position des 4 coins 1 dans l’image, où le repère (0;0) est placé en haut à gauche de l’image..
  
&nbsp;
#### "cameraPosition"
  
Cette fonction permet de tester la position du poteau-caméra.
En fonction de la caméra et de l’équipe actuelle, cela permet de savoir si caméra est bien placé au bon endroit sur le plateau.
Elle affiche le résultat sur le terminal si c’est « Position correcte » ou « Position incorrecte »
  
