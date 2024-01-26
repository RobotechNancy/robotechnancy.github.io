[order]:       # (3)
[title]:       # (Lier des librairies)
[description]: # (Comment lier des librairies externes à un projet CMake)

Lier des librairies permet de facilement réutiliser du code existant dans plusieurs projets.
Il est important de comprendre que si la librairie a été installée (`sudo make install`), il faudra la réinstaller à chaque modification :
![Lier des librairies](/static/images/CMake.webp)

### Librairies standard et Robotech

Pour une librairie standard ou compatible, il suffit d'utiliser `find_package` et `target_link_libraries` :
```cmake
# Après add_executable
find_package(MyLib REQUIRED)
target_link_libraries(${PROJECT_NAME} ${MyLib_LIBRARIES})
```

Ces librairies se trouvent souvant dans `/usr/local/lib` (ou `lib64`) et `/usr/local/include`.
Pour l'instant, deux librairies Robotech sont disponibles : `CAN` et `XBee`.

### Librairies non standard

`target_include_directories` peut être utilisé pour indiquer où se trouvent les headers :
```cmake
# Après add_executable
find_package(MyLib REQUIRED)
target_link_libraries(${PROJECT_NAME} ${MyLib_LIBRARIES})
target_include_directories(${PROJECT_NAME} PRIVATE ${MyLib_INCLUDE_DIRS})
``` 

### PkgConfig

Similairement, si la librairie utilise `pkg-config`, `pkg_check_modules` peut être utilisé :
```cmake
# Après add_executable
find_package(PkgConfig REQUIRED)
pkg_check_modules(MyLib REQUIRED)

target_link_libraries(${PROJECT_NAME} ${MyLib_LIBRARIES})
target_include_directories(${PROJECT_NAME} PRIVATE ${MyLib_INCLUDE_DIRS})
```

### Librairies dans le projet

Si la librairie est incluse dans le projet, il faut utiliser `add_subdirectory` :
```cmake
# Avant add_executable
add_subdirectory(chemin/vers/MyLib)

# Après add_executable
target_link_libraries(${PROJECT_NAME} MyLib)
```
