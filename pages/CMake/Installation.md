[order]:       # (1)
[title]:       # (Installer CMake)
[description]: # (Comment installer la toolchain CMake)

CMake permet de facilement créer, compiler et installer des projets avec des dépendances.

### Sous Linux

- Basé sur Debian : `sudo apt install cmake make g++`
- Basé sur RedHat : `sudo dnf install cmake make gcc-c++`
- Basé sur Arch : `sudo pacman -S cmake make gcc`

### Sous macOS

Installer CMake est très simple avec [Homebrew](https://brew.sh/) :
```bash
# Installer Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer CMake
brew install cmake make gcc
```

### Sous Windows

- Télécharger et installer [CMake](https://cmake.org/download/)
- Télécharger et installer [MinGW](https://sourceforge.net/projects/mingw-w64/files/)
- Ajouter le chemin vers MinGW dans `PATH` (par exemple `C:\MinGW\bin`)
- Ajouter le chemin vers CMake dans `PATH` (par exemple `C:\Program Files\CMake\bin`)
- Redémarrer le PC

Alternativement, il est possible d'utiliser un IDE avec des outils intégrés ou des extensions :

- [Visual Studio](https://learn.microsoft.com/fr-fr/cpp/build/cmake-projects-in-visual-studio?view=msvc-170) (payant, directement intégré)
- [Visual Studio Code](https://code.visualstudio.com/docs/cpp/introvideos-cpp) (gratuit, installer + extension à installer)
- [CLion](https://www.jetbrains.com/help/clion/quick-cmake-tutorial.html) (payant, directement intégré)
