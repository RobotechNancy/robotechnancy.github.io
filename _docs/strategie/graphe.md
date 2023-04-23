---
title: Gestionnaire de graphe
order: 1
category: Stratégie
category_order: 5
---

Pour la stratégie, un [gestionnaire de graphe](https://github.com/RobotechNancy/Strategie){:target="_blank"} est utilisé pour représenter les différents noeuds et les liens entre eux :
```cpp
#include "graph.h"

int main() {
    // (Initialisation du CAN)

    // Création du gestionnaire de graphe
    Graph graph(&can.logger, nodeCount);

    // Exemple de création de graphe
    graph.set_prev(1, new char[1]{0});
    graph.set_prev(2, new char[1]{1});
    graph.set_prev(3, new char[2]{1, 2});
    graph.set_prev(4, new char[1]{3});
    graph.set_prev(5, new char[3]{2, 4});

    graph.can_switch(0, 1); // true
    graph.can_switch(0, 2); // false

    graph.set_step(1); // Activer l'étape 1
    graph.send_state(&can, CAN_ADDR_BROADCAST); // Envoyer l'état du graphe
}
```

Chaque étape est représentée par une fonction et il est possible d'établir des contraintes selon les étapes actives :
```cpp
#include "graph.h"

void step2(Graph &graph) {
    // Vérifier si l'étape 2 est active
    if (!graph->is_set(2))
        return;

    // ...
}
```

Il devient alors possible d'utiliser les librairies CAN et XBee pour tout contrôler depuis un programme unique.
Pour plus de détails sur l'utilisation des codes fonction, le code source est disponible sur le Github.
