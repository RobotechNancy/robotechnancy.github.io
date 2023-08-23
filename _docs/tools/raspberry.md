---
title: Raspberry
order: 1
category: Outils
category_order: 1
---

Pour faciliter le développement sur Raspberry, il est nécessaire d'installer la toolchain :
```bash
# Debian, Ubuntu, ...
sudo apt install cmake make gcc g++

# Fedora, CentOS, ...
sudo dnf install cmake make gcc gcc-c++
```

Quant à l'IDE, plusieurs options sont disponibles :
- [CLion](https://www.jetbrains.com/clion/){:target="_blank"}, payant mais gratuit pour les étudiants
- [Visual Studio Code](https://code.visualstudio.com/){:target="_blank"}, gratuit et multi-plateformes
- N'importe quel éditeur de texte (nano, vim, emacs, etc.) et un terminal

### Création d'un software

Il suffit de créer un fichier `CMakelists.txt` à la racine du projet :
```cmake
project(my_project)                   # Nom du projet
set(CMAKE_CXX_STANDARD 20)            # Version de C++
cmake_minimum_required(VERSION 3.24)  # Version de cmake

add_executable(my_project main.cpp)                     # Créer un exécutable
target_link_libraries(my_project ${MY_LIB_LIBRARIES})   # Lier "LibName" à l'exécutable
```

Pour compiler et exécuter le code du projet, il suffit d'exécuter ces commandes :
```bash
mkdir build && cd build
cmake ..
make

# Un exécutable "my_project" sera créé
./my_project
```

### Création d'une librairie

Créer une librairie nécessite un `CMakeLists.txt` un peu plus complexe :
```cmake
set(CMAKE_CXX_STANDARD 20)
cmake_minimum_required(VERSION 3.16)
project(LibName VERSION 0.1 DESCRIPTION "Description de la librairie") # Nom de la librairie (ici, "LibName")

add_library(${PROJECT_NAME} ...) # Inclure tous les fichiers sources

set_target_properties(${PROJECT_NAME} PROPERTIES VERSION ${PROJECT_VERSION})
set_target_properties(${PROJECT_NAME} PROPERTIES SOVERSION 1)

# Inclure tous les headers publics séparés par des ";"
set_target_properties(${PROJECT_NAME} PROPERTIES PUBLIC_HEADER "...")

# Inclure les sous-dossiers de votre projet (ici, "include" et "src")
target_include_directories(${PROJECT_NAME} PRIVATE include src)

include(GNUInstallDirs)
install(TARGETS ${PROJECT_NAME}
        LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}/robotech
        PUBLIC_HEADER DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/robotech)

configure_file(${PROJECT_NAME}.pc.in ${PROJECT_NAME}.pc @ONLY)
install(FILES ${CMAKE_BINARY_DIR}/${PROJECT_NAME}.pc DESTINATION ${CMAKE_INSTALL_DATAROOTDIR}/pkgconfig)
```

Pour que la libairie soit trouvée par `pkg-config`, il faut créer un fichier `LibName.pc.in` (aucune modification à faire) :
```cmake
prefix=@CMAKE_INSTALL_PREFIX@
exec_prefix=@CMAKE_INSTALL_PREFIX@
libdir=${exec_prefix}/@CMAKE_INSTALL_LIBDIR@
includedir=${prefix}/@CMAKE_INSTALL_INCLUDEDIR@

Name: @PROJECT_NAME@
Description: @PROJECT_DESCRIPTION@
Version: @PROJECT_VERSION@

Requires:
Libs: -L${libdir} -l@PROJECT_NAME@
Cflags: -I${includedir}
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
find_package(PkgConfig REQUIRED)            # Utilitaire pour trouver des librairies
pkg_check_modules(MY_LIB REQUIRED LibName)  # Trouver une librairie "LibName"

# Après "add_executable"
target_link_libraries(my_project ${MY_LIB_LIBRARIES})   # Lier "LibName" à l'exécutable
```

Pour utiliser la librairie dans le code, il suffit d'inclure le header :
```c
#include <robotech/LibName.h>

int main() {
    // ...
}
```
