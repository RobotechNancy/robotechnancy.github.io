---
category: Wiki
category_order: 6

title: Markdown
order: 4
---

Les articles sont écrits en [Markdown](https://www.markdownguide.org/){:target="_blank"} mais il existe quelques astuces pour contourner ses limitations.

### Titres

Pour faciliter le partage, le comportement des titres de section (ex. `### Titre`) a été modifié :
- Ils sont automatiquement ancrés (ex. [{{ site.url }}/#titres](#titres))
- Cliquer sur le titre pour copie le lien dans le presse-papier
- La vue est automatiquement déplacée vers le titre cliqué

Pour désactiver ce comportement, il suffit d'ajouter une classe :
```md
{:.no-anchor}
### Titre
```

### Images

Par défaut, les images sont centrées et s'affichent en bloc.
Pour afficher plusieurs images sur la même ligne, il suffit d'ajouter une classe :
```md
![Image 1](/chemin/vers/image1.png){:.inline-img}
![Image 2](/chemin/vers/image2.png){:.inline-img}
```

Il est aussi préférable de charger les images uniquement lorsqu'elles sont visibles :
```md
![Image 1](/chemin/vers/image1.png){:.inline-img loading="lazy"}
![Image 2](/chemin/vers/image2.png){:.inline-img loading="lazy"}
```

Enfin, si vous voulez centrer les images sur une même ligne :
```md
{: style="text-align: center" }
![Image 1](/chemin/vers/image1.png){:.inline-img loading="lazy"}
![Image 2](/chemin/vers/image2.png){:.inline-img loading="lazy"}
```

### Liens

Pour ouvrir un lien dans un nouvel onglet, il suffit d'ajouter `{:target="_blank"}` :
```md
[Texte du lien](https://www.lien.com){:target="_blank"}
```
