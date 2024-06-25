[order]:       # (4)
[title]:       # (Estimation)
[description]: # (Documentation sur l'estimation)

Doc sur le programme d'estimation
  
  
Le programme principal de la caméra c’est l’estimation.
C’est le programme qui a pour but de reconnaître les codes (repères et robots) puis de récupérer les informations sur ces codes pour en estimer la position réelle sur le plateau.
Pour ce faire, le programme récupère une image sur laquelle va être fait la détection des codes par OpenCV, qui va ensuite obtenir des vecteurs de translation (tVecs) et des vecteurs de rotation (rVecs) par le biais de la fonction estimatePoseSingleMarker(), qui donnent des données positions de chaque code par rapport au repère de la caméra.
Ces vecteurs vont alors être transformés afin d’obtenir l’orientation et la position de chaque code sur le plateau.
En premier lieu, on récupère la position par rapport au code repère utilisé par la caméra, puis on obtient la position par rapport à la base origine du plateau par un changement de base (décalage de coordonnées en utilisant la position connue du code de référence utilisé)
  
&nbsp;
La fonction affiche donc les valeurs obtenues par l’estimation d’OpenCV puis les données transformées par rapport au code de référence.
Une fois les coordonnées sur l’aire de jeu obtenu, la caméra va envoyer ces données au robot dans une trame où chaque valeur est mis en 16 bits (ce qui permet d’aller de 0 à 65 535).
Cette fonction peut être lancée sans envoie d’une trame Xbee avec "estimateTest".
  
&nbsp;
Lors d’une partie, il y aura donc le robot qui fait des demandes d’informations à chacune des caméras (les unes après les autres). La caméra va lancer l’estimation et renvoyer les données : coordonnées, orientation et id de chaque code repéré ; au robot. La trame est reçue par robot qui va remettre en forme les valeurs transmises en 16 bit, récupérant les coordonnées en entier, puis choisi les données utiles, en l’occurrence dans notre cas la position du robot par son code qui est défini : l’id du code du robot est donnée lors de la partie (en fonction de l’équipe).
  
