[order]:       # (4)
[title]:       # (Créer une librairie)
[description]: # (Comment créer une librairie installable avec CMake)

Pour créer une librairie, on utilise `add_library` avec le nom de la librairie et les fichiers source:
```cmake
set(CMAKE_CXX_STANDARD 20)
cmake_minimum_required(VERSION 3.16)
project(LibName VERSION 0.1 DESCRIPTION "Description de la librairie")

add_library(${PROJECT_NAME} ...)
```

Ensuite, on peut configurer la librairie avec `set_target_properties`.
Les hearders publiques sont ceux qui seront installés avec la librairie:
```cmake
# Version de la librairie
set_target_properties(${PROJECT_NAME} PROPERTIES VERSION ${PROJECT_VERSION})
# Inclure tous les headers publics séparés par des ";"
set_target_properties(${PROJECT_NAME} PROPERTIES PUBLIC_HEADER "...")
```

Pour pouvoir installer la librairie, on utilise `install`:
```cmake
# Configuration d'où et quoi est installé
include(GNUInstallDirs)
install(TARGETS ${PROJECT_NAME}
        LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}/robotech
        PUBLIC_HEADER DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/robotech)

# Création automatique d'un fichier "LibNameConfig.cmake" à partir de "Config.cmake.in"
configure_file(Config.cmake.in ${PROJECT_NAME}Config.cmake @ONLY)
install(FILES ${CMAKE_BINARY_DIR}/${PROJECT_NAME}Config.cmake DESTINATION ${CMAKE_INSTALL_DATAROOTDIR}/${PROJECT_NAME}/cmake)
```

Pour que la librairie soit trouvable par `find_package`, il faut créer un fichier `Config.cmake.in`:
```cmake
set(@PROJECT_NAME@_FOUND TRUE)
set(@PROJECT_NAME@_VERSION @PROJECT_VERSION@)

set(@PROJECT_NAME@_INCLUDE_DIRS "@CMAKE_INSTALL_PREFIX@/@CMAKE_INSTALL_INCLUDEDIR@/robotech")
set(@PROJECT_NAME@_LIBRARIES "@CMAKE_INSTALL_PREFIX@/@CMAKE_INSTALL_LIBDIR@/lib@PROJECT_NAME@.a")
```

La librairie est maintenant installable avec `make install` et trouvable avec `find_package`.