---
title: Ajouter des pages
order: 3
category: Wiki
category_order: 6
---

Pour ajouter une page, il suffit de créer un fichier Markdown avec la base suivante dans un dossier corresponddant à sa catégorie :
```markdown
---
title: Titre de la page                                   (obligatoire)
order: Ordre d'affichage dans la catégorie                (obligatoire)
category: Titre de la catégorie                           (obligatoire)
category_order: Ordre d'affichage de la catégorie         (obligatoire)
subcategory: Nom de la sous-catégorie                     (optionnel)
subcategory_order: Ordre d'affichage de la sous-catégorie (optionnel)
---

> Contenu de la page <
```

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

> Contenu de la page <
```

La template de base est configurée pour afficher les catégories et sous-catégories dans le menu de gauche, il n'est donc pas nécessaire de les ajouter manuellement.
L'ordre des catégories et sous-catégories doivent être identiques dans tous les fichiers d'une même catégorie ou sous-catégorie.