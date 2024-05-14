[order]:       # (3)
[title]:       # (Réception de données)
[description]: # (Implémentation de la réception de données)

Pour démarrer la réception de données, il faut appeler `XBee::startListening`.
En interne, cette fonction démarre un thread qui vérifie toutes les 10ms si des données sont disponibles (avec `seriallib::available`).

Si des données sont disponibles, elles sont lues avec `XBee::readRx` avec un timeout de 100ms.
Un délai de 2ms est ajouté entre chaque lecture pour éviter d'arrêter la lecture du buffer de réception alors qu'il y a encore des données à lire.

Une fois les données lues, elles sont traitées par `XBee::processBuffer` qui a pour but de vérifier que les données reçues correspondent à une trame valide.

> [!WARNING]
> Pour l'instant, le cas où plusieurs trames sont reçues en même temps n'est pas géré.

### Gestion des réponses

Il y a deux manières de recevoir des données :

- Asynchrone : ne bloque pas l'exécution du programme principal et utilise des callbacks
- Synchrone : bloque l'exécution du programme principal et utilise `XBee::send`
```cpp
// On veut récupérer les positions de tous les tag ArUco
// Aucune données à envoyer, 5 secondes de timeout
xbee_result_t res = xbee.send(XB_ADDR_CAMERA_01, XB_FCT_GET_ARUCO_POS, {}, 5)

switch res.status {
    case XB_E_SUCCESS:
        // Trame disponible avec res.frame
        std::cout << "Positions reçues !" << std::endl;
    break;
    case XB_E_FRAME_TIMEOUT:
        std::cout << "Aucune réponse reçue en 5 secondes" << std::endl;
    break;
    default:
        std::cout << "Une erreur est survenue :(" << std::endl;
}
```

### Multi-threading

Comme l'écoute est asynchrone, un mutex est utilisé pour gérer les accès simultanés entre deux threads.
Par exemple, quand une réponse est reçu, l'accès à `XBee::responses` est bloqué le temps de l'insertion: 
```cpp
std::lock_guard<std::mutex> lock(responseMutex);

if (responses.contains(frame.frameId)) {
    responses[frame.frameId] = frame;
    return XB_E_SUCCESS;
}
``` 

Similairement, la boucle d'écoute utilise un booléen atomique pour savoir si l'écoute est en pause ou non.
L'utilisation de `std::atomic` n'est pas obligatoire ici mais on veut un comportement prévisible lorsque qu'on modifie l'état de l'écoute :
```cpp
while (isListening.load()) {
    std::this_thread::sleep_for(std::chrono::milliseconds(10));

    if (serial.available() > 0) {
        readRx(response);
        processBuffer(response);
    }
}
```

### Libération de la mémoire

Au lieu d'utiliser des raw pointers (ex. `std::thread*`), on utilise `std::unique_ptr`.
Ici la seule différence qui nous intéresse est que la mémoire derrière le pointeur (ex. `std::thread`) est libérée automatiquement.
