[order]:       # (1)
[title]:       # (Principe)
[description]: # (Principe de fonctionnement des modules XBee)

Ces modules permettent une communication fiable et sécurisée, même dans un environnement bruyant
Les modules XBee permettent la communication sans fil entre de multiples appareils.

Ici, les modules utilisés sont des [XBee S1 Pro](https://www.digi.com/resources/documentation/digidocs/pdfs/90000982.pdf) (alimentés en 3.3V) :
![XBee S1 Pro](/static/images/XBee/S1_pro.webp){: loading="lazy" }

Les modules communiquent en [UART](https://fr.wikipedia.org/wiki/UART) avec leur microcontrôleur respectif et suivant le protocole [IEEE 802.15.4](https://fr.wikipedia.org/wiki/IEEE_802.15.4) (2.4GHz) entre eux :
![XBee et Raspberry Pi](/static/images/XBee/schema.webp){: loading="lazy" }


### Configuration

Les modules ne peuvent communiquer qu'avec d'autres modules du même type et configurés de la même manière.
De plus, il n'y a que deux manières de communiquer : point à point et point à multipoint :
![IEEE 802.15.4](/static/images/XBee/protocol.webp){: loading="lazy" }

Pour configurer les adresses des modules, il faut envoyer des commandes AT :

| Commande | Valeur   | Description                              |
| -------- | -------- | ---------------------------------------- |
| ATMY     | `0xXXXX` | Adresse du module                        |
| ATDL     | `0xFFFF` | À qui envoyer les données (partie basse) |
| ATDH     | `0x0000` | À qui envoyer les données (partie haute) |

> Il est possible d'utiliser [XCTU](https://www.digi.com/products/embedded-systems/digi-xbee/digi-xbee-tools/xctu) pour configurer les modules
> et essayer d'envoyer des commandes.

Avec le protocole `IEEE 802.15.4`, il n'est pas possible pour un module de communiquer avec plusieurs groupes différents.
Pour contourner cette limitation, on configure les modules en broadcast (`0xFFFF` et `0x0000`) et on filtre les trames nous-même.

Pour éviter d'envoyer des trames à n'importe quel module, on utilise quatres paramètres supplémentaires :

| Commande | Valeur   | Description            |
| -------- | -------- | ---------------------- |
| ATID     | `0xXXXX` | Identifiant du réseau  |
| ATCH     | `0xXX`   | Canal de communication |
| ATEE     | `0x1`    | Chiffrement (activé )  |
| ATKY     | `0xXXXX` | Clé de chiffrement     |

### Initialisation

Pour configurer les modules, il faut d'abord entrer en mode AT en envoyant `+++`.
Une fois `OK\r` reçu, on envoie les commandes AT (`ATMY`, `ATDL`, ...) puis on quitte le mode AT en envoyant `ATCN\r`.

Une fois le module configuré, tout ce qui est envoyé par UART est envoyé tel quel à n'importe quel module du même réseau.
