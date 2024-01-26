[order]:       # (2)
[title]:       # (Utiliser la librairie)
[description]: # (Comment utiliser la librairie XBee sur une Raspberry Pi)

La librairie XBee est utilisable uniquement sur Linux, pour l'installer :

- Clôner le dépôt GitHub : `git clone https://github.com/RobotechNancy/Communication.git`
- Se placer dans le dossier cloné : `cd Communication`
- Utiliser le script d'installation : `sudo ./lib_manager install Logs XBee`

> Pour mettre à jour la librairie, `git pull` puis `sudo ./lib_manager install XBee`
> [!TIP]

### Initialisation

Pour initialiser un module XBee, il faut créer une instance de la classe `XBee` :
```cpp
// Adresses 8 bits (0x00 à 0xFF) ou macro XB_ADDR_<...>
XBee xbee(XB_ADDR_ROBOT_01);

int status = xbee.open("/dev/ttyAMA0", 9600);
if (status != 0) {
    // Une erreur s'est produite lors de l'ouverture du port série
    // Toutes les erreurs sont définies dans define_xbee.h
}
```

En fonction d'où est utilisé la librairie, le port série peut être différent.
Par exemple, sur une Raspberry Pi, c'est généralement `/dev/ttyAMA0` alors que sur PC c'est généralement un des ports USB (ex. `/dev/ttyUSB0`).

Si une mauvaise configuration est à l'origine d'une erreur d'initialisation, vous pouvez utiliser [XCTU](https://www.digi.com/products/embedded-systems/digi-xbee/digi-xbee-tools/xctu) pour la corriger. La librairie utilise les paramètres par défauts d'un module XBee.

> Si vous utiliser l'adaptateur USB, il est possible de réinitialiser la configuration en appuyant sur le bouton reset.
> [!TIP]

### Envoyer des données

Pour envoyer des données, il suffit d'utiliser la fonction `XBee::send`:
```cpp
// On envoie un octet avec le code fonction TEST_ALIVE à la caméra 01
xbee.send(XB_ADDR_CAMERA_01, XB_FCT_TEST_ALIVE, {0x01});

std::vector<uint8_t> data = {0x01, 0x02, 0x03};
xbee.send(XB_ADDR_CAMERA_02, XB_FCT_TEST_ALIVE, data);
```

Il est possible d'envoyer jusqu'à 243 octets de données, la fonction retourne un code d'erreur le cas echéant.

### Recevoir des données

Il existe deux moyens de recevoir des données :

- De manière synchrone (bloque le programme) avec `XBee::send` :
```cpp

// On veut récupérer toutes les positions
// avec un délai maximal de 5 secondes
xbee_result_t res = xbee.send(XB_ADDR_01, XB_FCT_GET_ARUCO_POS, {}, 5);

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
- De manière asynchrone (non bloquant) avec `XBee::bind` :
```cpp
void onTestAlive(XBee &xbee, xbee_frame_t &frame) {
    std::cout << "Code fonction TEST_ALIVE reçu" << std::endl;
    xbee.send(frame.emitterAddress, XB_FCT_TEST_ALIVE, frame.data);
}

xbee.bind(XB_FCT_TEST_ALIVE, onTestAlive);
```

Dans les deux cas, il faut utiliser `XBee::startListening` pour pouvoir recevoir des données, par exemple :
```cpp
#include <robotech/xbee.h>

int main() {
    XBee xbee(XB_ADDR_ROBOT_01);
    int status = xbee.open("/dev/ttyUSB0");

    if (status != XB_E_SUCCESS)
        return status;

    // Utilisation d'un lambda au lieu d'une fonction classique
    xbee.bind(XB_FCT_TEST_ALIVE, [](XBee &xbee, const xbee_frame_t &frame) {
        std::cout << "Code fonction TEST_ALIVE reçu" << std::endl;
        xbee.send(frame.emitterAddress, XB_FCT_TEST_ALIVE, frame.data);
    });

    // On bloque le thread principal pour laisser le 
    // temps au programme de recevoir des meesages
    xbee.startListening();
    std::this_thread::sleep_for(std::chrono::seconds(10));

    return 0;
}
```
