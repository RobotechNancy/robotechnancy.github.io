[order]:       # (4)
[title]:       # (Envoi de données)
[description]: # (Implémentation de l'envoi de données)

L'envoi de données utilise le mode API des modules XBee où chaque octet est renvoyé tel quel:
```cpp
xbee.send(XB_ADDR_ROBOT_01, XB_FCT_TEST_ALIVE, {0x01});
```

Il est possible d'envoyer jusqu'à 243 octets de données, la fonction retourne un code d'erreur le cas echéant.

L'identifiant attribué à chaque trame est automatiquement incrémenté à chaque envoi.
Cet identifiant est utilisé pour détecter les réponses à une trame envoyée.
