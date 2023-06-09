---
title: Développement en local
order: 2
category: Wiki
category_order: 6
---

Pour développer le site en local, il faut installer plusieurs outils :
```bash
# Installer ou mettre à jour rbenv (gestionnaire de versions Ruby)
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

rbenv install -l         # Installer Ruby (dernière version stable)
rbenv global <version>   # Définir la version de Ruby à utiliser
gem install bundler      # Installer Bundler (gestionnaire de dépendances Ruby)

cd <chemin/vers/le/repo> # Se placer dans le dossier du repo
bundle install           # Installer les dépendances du site
```

{:.warning}
> **Attention :** Il ne faut surtout pas utiliser `sudo` pour installer les dépendances du site, sinon il y aura des problèmes de permissions.

Pour lancer le site en local, il suffit alors de lancer cette commande :
```bash
bundle exec jekyll serve --livereload --incremental --open-url
```

Une fois le site prêt, une fenêtre de navigateur s'ouvre automatiquement à l'adresse `http://localhost:4000/` et se met à jour automatiquement à chaque modification du site.

### Structure du projet

Par défaut, tous les fichiers commençant par un `_` sont ignorés par Jekyll.
Le projet se structure de la façon suivante :

- `_config.yml` : Fichier de configuration du site
- `Gemfile` : Fichier de configuration de Bundler
- `_plugins` : Dossier contenant les [plugins Jekyll](https://github.com/planetjekyll/awesome-jekyll-plugins){:target="_blank"}
- `_layouts` : Dossier contenant les [templates Liquid](https://shopify.github.io/liquid/){:target="_blank"}
- `_sass` : Dossier contenant des fichiers catégorisés de styles
- `css` : Dossier contenant le fichier CSS principal
- `scripts` : Dossier contenant les scripts JS
- `images` : Dossier contenant les images
- `_docs` : Dossier contenant les pages du wiki
- `website` : Dossier contenant les pages hors wiki (accueil, recherche, etc.)
