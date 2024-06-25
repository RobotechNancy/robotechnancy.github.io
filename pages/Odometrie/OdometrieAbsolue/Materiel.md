[order]:       # (3)
[title]:       # (Matériel)
[description]: # (Documentation sur le matériel)

Matériel utilisé pour l'odométrie absolue
  
### Les Poteaux-Caméras
  
Nous utilisons donc des caméras afin de pouvoir voir le plateau et faire la reconnaissance et l’estimation.
Nous avons à notre disposition 3 poteaux fabriqués sur lesquels nous avons travaillé avec le pôle mécanique et le pôle électronique. On retrouve dans ces poteaux une caméra qui se compose de différents éléments :
  
- une mini caméra
- un câble caméra-raspi qui relie les deux
- une carte Raspberry (faisant office de mini ordinateur)
- un Shield Xbee (carte supérieure qui gère la communication interne entre des composants et la Raspberry)
- une carte Xbee, pour communiquer avec d’autres cartes Xbee
- un branchement HDMI pour voir les résultats sur un écran
- un branchement pour l’alimentation par batterie
  
Un poteau-caméra est placée à un endroit du plateau et voit une partie de l’aire de jeu en fonction sa position.
  
Les 3 plateau-caméras sont positionnés à des endroits précis sur le plateau en fonction de l’équipe défini (jaune ou bleu). On a les caméras 1 et 2 qui sont placées du même côté et orientées vers l’intérieur du plateau, et la caméra 3 en face.
