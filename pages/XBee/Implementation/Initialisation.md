[order]:       # (2)
[title]:       # (Initialisation)
[description]: # (Implémentation de l'initialisation des modules XBee)

Toute l'initialisation se fait dans `XBee::open` qui ouvre le port série et appelle `XBee::checkATConfig` pour vérifier la configuration du module :
```cpp
XBee xbee(XB_ADDR_ROBOT_01); 

if (xbee.open("/dev/ttyAMA0") != XB_E_SUCCESS) {
    // Code d'erreur dans define_xbee.h
}
```

### Choix de l'adresse

Toutes les adresses sont sur un octet (0 à 255), définies dans `define_xbee.h` et purement arbitraires:

- `XB_ADDR_ROBOT_01` : `0x01`, adresse du gros robot
- `XB_ADDR_ROBOT_02` : `0x02`, adresse du petit robot
- `XB_ADDR_CAMERA_01` : `0x03`, première adresse pour une caméra
- `XB_ADDR_CAMERA_02` : `0x04`, deuxième adresse pour une caméra

### Choix du port série

Le choix du port série dépend du PC utilisé :

- Sur une Raspberry Pi, le port est généralement `/dev/ttyAMA0` ou `/dev/ttyS0`
- Sur un PC, le port est généralement `/dev/ttyUSB0`

Si ce n'est pas le cas, `lsusb` permet de lister tous les appareils USB connectés au PC. Il est aussi possible que le module XBee soit mal configuré, dans ce cas, il faut utiliser [XCTU](https://www.digi.com/products/embedded-systems/digi-xbee/digi-xbee-tools/xctu) pour le réinitialiser ou appuyer sur le bouton reset de l'adaptateur USB.

En interne, le port série est ouver avec `seriallib::openDevice` et utilise les paramètres suivants (configuration par défaut des modules XBee) :

- Baudrate : `9600`
- Parité : `SERIAL_PARITY_NONE`
- Nombre de bits : `SERIAL_DATABITS_8`
- Nombre de stop bits : `SERIAL_STOPBITS_1`

### Configuration AT

Le mode AT permet de lire et modifier les paramètres d'un module XBee.
C'est la fonction `XBee::checkATConfig` qui s'occupe de vérifier la configuration du module :

- Tout d'abord, elle entre en mode AT en envoyant `+++` sur le port série (`XBee::enterATMode`)
- Ensuite, elle vérifie chaque paramètre et le modifie si nécessaire, par exemple, le baudrate :
```cpp
// Avec XB_AT_M_GET, la valeur du paramètre est lue et comparée au second argument
// Avec XB_AT_M_SET, la valeur du paramètre est modifiée pour correspondre au second argument

if (sendATCommand(XB_AT_CMD_BAUDRATE, XB_AT_V_BAUDRATE, XB_AT_M_GET))
        logger(INFO) << "Vaudrate vérifié avec succès" << std::endl;
else if (sendATCommand(XB_AT_CMD_BAUDRATE, XB_AT_V_BAUDRATE, XB_AT_M_SET))
    logger(INFO) << "Baudrate configuré avec succès" << std::endl;
else {
    logger(CRITICAL) << "Impossible de configurer le baudrate" << std::endl;
    return XB_E_AT_BAUDRATE;
}
```
- On appelle `XBee::writeATConfig` pour valider les changements
- Enfin, on sort du mode AT en envoyant `ATCN` sur le port série (`XBee::exitATMode`)
