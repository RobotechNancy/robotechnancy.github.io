[order]:       # (2)
[title]:       # (Créer un projet)
[description]: # (Comment créer un projet avec STM32CubeIDE)

Il y a plusieurs options pour créer un nouveau projet :

- Si aucun projet n'est ouvert, appuyer sur `Create a new STM32 project` dans la fenêtre `Project Explorer` (à gauche).
- Si un projet est ouvert, cliquer sur `File` puis `New` puis `STM32 Project` (en haut).

Dans les deux cas, une fenêtre s'ouvre pour choisir le microcontrôleur (des téléchargements peuvent se lancer automatiquement).
Pour trouver le bon microcontrôleur, un champ de recherche est disponible en haut à droite (`Commercial Part Number`) :
![Sélecteur de microcontrôleur](/static/images/STM32/board_selector.webp)

Une fois le microcontrôleur sélectionné (ici une L432KC), appuyer sur `Next` en bas à droite, il faut maintenant choisir les paramètres du projet.
A Robotech Nancy, les projets sont des projets STM32Cube en C pour des microcontrôleurs NUCLEO-L432KC :
![Nouveau projet](/static/images/STM32/stm32_project.webp)
