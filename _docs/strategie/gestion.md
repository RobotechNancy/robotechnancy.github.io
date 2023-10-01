---
category: Stratégie
category_order: 5

title: Gestion de la stratégie
order: 1
---

{: .warning}
> Toute cette partie a été développée en urgence pendant la compétition.
Le code source n'est pas documenté et son approche mérite d'être revue.

Pour facilement changer les paramètre et la stratégie, deux fichiers ont été créés :
- `config.txt` : contient les caractéristiques du robot
  ```cpp
  START <code de vérification>

  // Un commentaire
  variable_1 = valeur_1
  variable_2 = valeur_2

  END
  ```
- `strategie.txt` : contient la démarche à suivre
  ```cpp
  START <code de vérification>

  // Un commentaire
  ACTION_1
  ACTION_2 10 1.2
  ACTION_3 5

  END
  ```

### Vérification

Si des modifications sont faites sans que le code de vérification soit mis à jour, le robot ne démarrera pas.
Le code de vérification est un CRC16 Modbus et peut-être généré automatiquement :
```cpp
#include "robolang/parser.h"

int main() {
    Parser::update_crc("config.txt");
    Parser::update_crc("strategie.txt");
}

```

Si le contenu concorde avec le code de vérification, la Raspberry exécute les actions ligne par ligne et chaque instruction bloque le programme jusqu'à ce qu'elle soit terminée.

### Ajouter une action

Pour ajouter une action, il faut d'abord ajouter une fonction dans `robolang/interpreter.h` :
```cpp
class Interpreter {
public:
    // ...
private:
    // ...

    void action_1();
    void action_2(std::vector<std::string> &args);
    void action_3(std::vector<std::string> &args);
};
```

Ensuite, il faut modifier la fonction `Interpreter::execute()` dans `robolang/interpreter.cpp` :
```cpp
void Interpreter::execute(const std::string& name, const std::vector<std::string>& args) {
    // ...

    if (name == "ACTION_1") return action_1();
    if (name == "ACTION_2") return action_2(args);
    if (name == "ACTION_3") return action_3(args);
}
```

Enfin, il ne reste plus qu'à implémenter l'action dans `robolang/interpreter.cpp` :
```cpp
void Interpreter::action_1() {
    // ...
}

void Interpreter::action_2(std::vector<std::string> &args) {
    int param_1 = parser.get<int>(args[0]);
    float param_2 = parser.get<float>(args[1]);

    // ...
}

void Interpreter::action_3(std::vector<std::string> &args) {
    int param_1 = parser.get<int>(args[0]);

    // ...
}
```

### Démarrer la stratégie

Pour démarrer la stratégie, il suffit d'initialiser un interpréteur et d'utiliser `Interpreter::run` :
```cpp
#include "robolang/interpreter.h"

int main() {
    // Créer un interpréteur avec un logger
    Interpreter interpreter(
        std::make_shared<Logger>("strategie")
    );

    // Initialiser la communication et l'écran LCD
    interpreter.init();

    // Lire les fichiers de configuration et de stratégie
    interpreter.load_config("chemin/vers/config.txt");
    interpreter.load_strategy("chemin/vers/strategie.txt")    

    interpreter.run();
}
```
