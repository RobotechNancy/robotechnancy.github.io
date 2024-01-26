[order]:       # (2)
[title]:       # (Modifier ce wiki)
[description]: # (Comment apporter des modifications au wiki)

Ce wiki utilise [`markdown_spa`](https://github.com/MrSpaar/markdown_spa) pour générer des pages statiques à partir de fichiers markdown :

- Installer `markdown_spa` : `pip install markdown_spa`
- Cloner le wiki : `git clone https://github.com/RobotechNancy/Wiki.git`

Ce wiki suit la structure suivante :
```bash
.
├── config.ini            # Configuration markdown_spa
├── generated/            # Site final généré
├── pages/                # Pages du wiki
├── scss/
│   ├── _layout.scss      # Layout du site
│   ├── _normalize.scss   # Reset CSS
│   ├── _tables.scss      # Style des tableaux
│   ├── _typography.scss  # Style du texte
│   ├── code_dark.css     # Thème sombre pour les blocs de code
│   ├── code_light.css    # Thème clair pour les blocs de code
│   └── main.scss         # Fichier principal
├── static/
│   ├── images/           # Dossier contenant les images
│   └── script.js         # Navigation et intéractions
└── templates/
    ├── base.html         # Base de toutes les pages
    └── nav.html          # Barre de navigation
```

Pour modifier le contenu du wiki, il suffit de modifier les fichiers markdown dans le dossier `pages`.
Si vous voulez ajouter une page, il faut obligatoirement spécifier trois métadonnées en haut du fichier :
```markdown
[order]:       # (un nombre, ordre d'affichage dans la catégorie)
[title]:       # (Titre de la page)
[description]: # (Description de la page)
```

Pendant le développement, deux commandes sont utiles :

- `markdown_spa watch` : serveur avec auto-reload à chaque modification
- `markdown_spa build` : génère le site (en cas d'erreur avec `watch` par exemple)

Pour plus d'informations, voir la [documentation de `markdown_spa`](https://mrspaar.github.io/markdown_spa/).
