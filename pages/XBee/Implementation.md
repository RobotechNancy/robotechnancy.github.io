[order]:       # (3)
[title]:       # (Implémentation)
[description]: # (Documentation sur l'implémentation de la librairie XBee)

La librairie XBee n'est compatible qu'avec Linux et est structurée comme suit :
```bash
.
├── CMakeLists.txt      # Configuration CMake pour build et installer la lib
├── Config.cmake.in     # Fichier pour que la lib soit retrouvable avec PkgConfig
├── include
│   ├── define_xbee.h   # Header où sont définies toutes les constantes
│   ├── serialib.h      # Lib utilisée pour la communication série
│   └── xbee.h          # Header où sont définis tous les types et classes
└── src                 
    ├── main.cpp        # Programme utilisé pour tester la librairie
    ├── serialib.cpp    # Implémentation de la lib pour la communication série
    └── xbee.cpp        # Implémentation de la lib XBee
```

Pour voir le code complet (et commenté), vous pouvez aller sur le [dépôt GitHub](https://github.com/RobotechNancy/Communication/XBee).
