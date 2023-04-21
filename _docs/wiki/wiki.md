---
title: Gestion du wiki
order: 1
category: Wiki
category_order: 6
---

Ce wiki utilise [Jekyll](https://jekyllrb.com/) et [Github Pages](https://pages.github.com/) :
- La configuration de l'hébergement se fait [ici](https://github.com/RobotechNancy/robotechnancy.github.io/settings/pages)
- Toutes les pages sont rendues côté serveur avec [Liquid](https://shopify.github.io/liquid/)
- Chaque page est correspond à un fichier Markdown dans le dossier [`_docs`](https://github.com/RobotechNancy/robotechnancy.github.io/tree/master/_docs)
- Le site est reconstruit automatiquement à chaque commit sur la branche [`master`](https://github.com/RobotechNancy/robotechnancy.github.io)
- La base commune à chaque page est contenue dans le fichier [`_layouts/default.html`](https://github.com/RobotechNancy/robotechnancy.github.io/blob/master/_layouts/default.html)

### Ajouter une page

Pour ajouter une page, il suffit de créer un fichier Markdown avec cette base :
```markdown
---
title: Titre de la page
order: Ordre d'affichage dans la catégorie
category: Titre de la catégorie
category_order: Ordre d'affichage de la catégorie
subcategory: Nom de la sous-catégorie
subcategory_order: Ordre d'affichage de la sous-catégorie
---
```

Le fichier doit être placé dans un dossier correspondant à sa catégorie et, si nécessaire, à sa sous-catégorie.
Par exemple, pour ajouter une page dans la sous-catégorie `CAN`, il faut créer un fichier dans `_docs/communication/CAN` :
```markdown
---
title: Ma page dans Communication/CAN
order: 1
category: Communication
category_order: 2
subcategory: CAN
subcategory_order: 1
---
```
