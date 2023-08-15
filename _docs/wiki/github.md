---
title: Github Pages
order: 1
category: Wiki
category_order: 6
---

Ce wiki utilise [Jekyll](https://jekyllrb.com/){:target="_blank"} pour générer les pages et est hébergé sur [Github Pages](https://pages.github.com/){:target="_blank"} :

![Github Pages](/images/Github%20Pages.webp){:loading="lazy"}

Sur cette [page](https://github.com/RobotechNancy/robotechnancy.github.io/settings/pages){:target="_blank"}, il est possible de choisir :
- La brance de déploiement du site (ici `master`)
- Le dossier contenant le site (ici `/`, la racine du repo)
- Un nom de domaine personnalisé (non utilisé ici)

Le site est accessible à l'adresse `https://<username>.github.io/<repo>/`.
Ici, le repo porte un nom spécial permettant d'accéder au site à l'adresse `https://robotechnancy.github.io/`.

Pour définir un nom de domaine personnalisé, il faut :
- Ajouter une entrée DNS de type `CNAME` pointant vers `robotechnancy.github.io`
- Spécifier le nom de domaine dans les paramètres de Github Pages
- Ajouter un fichier `CNAME` au repo contenant le nom de domaine (automatique)