[order]:       # (2)
[title]:       # (Créer un exécutable)
[description]: # (Comment créer un exécutable avec CMake)

Pour créer un exécutable avec CMake, il faut créer un fichier `CMakeLists.txt` à la racine du projet. Ce fichier contient les instructions pour créer un exécutable à partir des fichiers sources :
```cmake
cmake_minimum_required(VERSION 3.x)       # Version de cmake
set(CMAKE_CXX_STANDARD 20)                # Version de C++ (11, 14, 17, 20, 23)
project(my_project)                       # Nom du projet

add_executable(${PROJECT_NAME} main.cpp)  # Créer un exécutable du même nom que le projet
```

Pour compiler le projet, il faut créer un dossier où seront stockés les fichiers de compilation :
```bash
mkdir build && cd build

cmake ..  # Génère les fichiers de compilation
make      # Compile le projet

# Une fois le projet compilé, on peut l'exécuter
./my_project
```

> [!WARNING]
> Pour éviter les erreurs, il faut inclure **tous** les fichiers source dans `add_executable`

Optionnellement, pour les fichiers source, il est possible d'éviter les chemins relatifs pour inclure les headers :

- Dans le fichier `CMakeLists.txt` :
```cmake
# Avant add_executable
include_directories(dossier1 dossier2 ...)
```
- Dans les fichiers source et headers :
```cpp
#include <header.h> // au lieu de ../dossier1/header.h par exemple
```
