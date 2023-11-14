---
category: Outils
category_order: 1

title: Raspberry
order: 1
---

Les Raspberry Pi sont les ordinateurs miniatures que nos robots utilisent pour coordiner toutes les cartes :

{: style="text-align: center" }
![Pins GPIO](/images/tools/GPIO.webp){:.inline-img loading="lazy"}
![Formats RPI](/images/tools/RPI.webp){:.inline-img loading="lazy"}

Quant au développement, les programmes sont écrits en C++ et il est possible de faire du prototypage en Python.
En terme d'IDE, il y a au choix :
- [CLion](https://www.jetbrains.com/clion/){:target="_blank"}, complet et  payant mais gratuit pour les étudiants
- [Visual Studio Code](https://code.visualstudio.com/){:target="_blank"}, gratuit mais nécessite configuration
- N'importe quel éditeur de texte (nano, vim, emacs, etc.) et un terminal

### Création d'un programme en C++

Pour compiler un projet, il faut d'abord installer la toolchain.
Ici [CMake](https://cmake.org/) est utilisé pour gérer plus facilement la configuration des projets :
```bash
# Debian, Ubuntu, ...
sudo apt install cmake make gcc g++

# Fedora, CentOS, ...
sudo dnf install cmake make gcc gcc-c++
```

Pour créer un projet, il suffit de créer un fichier `CMakeLists.txt` à sa racine :
```cmake
cmake_minimum_required(VERSION 3.24)      # Version de cmake
set(CMAKE_CXX_STANDARD 20)                # Version de C++ (11, 14, 17, 20, 23)
project(my_project)                       # Nom du projet

add_executable(${PROJECT_NAME} main.cpp)  # Créer un exécutable du même nom que le projet
```

{:.warning}
> Il faut mettre tous les fichiers `.cpp` du projet après `${PROJECT_NAME}`.

Pour compiler et exécuter le code du projet, il suffit d'exécuter ces commandes :
```bash
mkdir build && cd build
cmake ..
make
./my_project
```

### Création d'une librairie

Créer une librairie nécessite un `CMakeLists.txt` un peu plus complexe :
```cmake
# Même base que pour un projet
set(CMAKE_CXX_STANDARD 20)
cmake_minimum_required(VERSION 3.16)
project(LibName VERSION 0.1 DESCRIPTION "Description de la librairie") # Nom de la librairie (ici, "LibName")

# Inclure tous les fichiers source
add_library(${PROJECT_NAME} ...)

set_target_properties(${PROJECT_NAME} PROPERTIES VERSION ${PROJECT_VERSION}) # Version de la librairie
set_target_properties(${PROJECT_NAME} PROPERTIES PUBLIC_HEADER "...")        # Inclure tous les headers publics séparés par des ";"

# Inclure les sous-dossiers de votre projet (ex: "include" et "src")
target_include_directories(${PROJECT_NAME} PRIVATE include src)

# Configuration d'où et quoi est installé
include(GNUInstallDirs)
install(TARGETS ${PROJECT_NAME}
        LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}/robotech
        PUBLIC_HEADER DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/robotech)

# Création automatique d'un fichier "LibNameConfig.cmake" à partir de "Config.cmake.in"
configure_file(Config.cmake.in ${PROJECT_NAME}Config.cmake @ONLY)
install(FILES ${CMAKE_BINARY_DIR}/${PROJECT_NAME}Config.cmake DESTINATION ${CMAKE_INSTALL_DATAROOTDIR}/${PROJECT_NAME}/cmake)
```

Pour que la libairie soit facilement trouvable par un autre projet, il faut créer un fichier `Config.cmake.in` (aucune modification à faire) :
```cmake
set(@PROJECT_NAME@_FOUND TRUE)
set(@PROJECT_NAME@_VERSION @PROJECT_VERSION@)

set(@PROJECT_NAME@_INCLUDE_DIRS "@CMAKE_INSTALL_PREFIX@/@CMAKE_INSTALL_INCLUDEDIR@/robotech")
set(@PROJECT_NAME@_LIBRARIES "@CMAKE_INSTALL_PREFIX@/@CMAKE_INSTALL_LIBDIR@/lib@PROJECT_NAME@.a")
```

Maintenant, pour installer la librairie, il suffit d'exécuter les commandes suivantes :
```bash
mkdir build && cd build
cmake ..
sudo make install
```

### Lier une librairie à un projet

Pour lier une librairie à un projet, il suffit de modifier le fichier `CMakeLists.txt`, par exemple :
```cmake
# Avant "add_executable"
find_package(LibName REQUIRED) # Trouver la librairie "LibName"

# Après "add_executable"
target_link_libraries(my_project ${LibName_LIBRARIES}) # Lier "LibName" à l'exécutable
```

Pour utiliser la librairie dans le code, il suffit d'inclure le header :
```c
#include <robotech/LibName.h>

int main() {
    // ...
}
```
