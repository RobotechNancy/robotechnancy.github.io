---
category: Communication
category_order: 2

subcategory: I2C
subcategory_order: 2

title: Principe
order: 1
---

Un bus I2C est un moyen de communication, souvent utilisé pour connecter des composants (écrans, capteurs, ...) à une carte électronique.
C'est un bus avec une architecture maître-esclave mais il est possible d'avoir plusieurs maîtres et plusieurs esclaves sur le même bus :
![I2C](/images/I2C/schema.webp){: loading="lazy"}

> **Note :** le choix du baudrate est plus limité que pour un bus CAN (100kHz, 400kHz ou 3,4MHz), le plus souvent 100kHz.

### Lecture et écriture

Une séquence de lecture ou d'écriture est composée de 3 parties : l'adresse (jusqu'à 128 nœuds), la demande (lecture ou écriture) et les données
(séparées par des ACK) :
![Séquence I2C](/images/I2C/sequence.webp){: loading="lazy"}

Le premier octet de données correspond souvent au registre à lire ou écrire.
Plus généralement, les adresses, regitres et valeurs acceptées sont décrits dans la datasheet du composant.

### Conflits

Il existe plusieurs types de conflits sur un bus I2C qu'il faut savoir prendre en compte.

Tout d'abord, les nœuds sont en collecteur ouvert : ils peuvent uniquement tirer la tension vers le bas.
On utilise donc des résistances de pull-up pour garantir la bonne tension au niveau haut :
![Pull-up](/images/I2C/pull-up.webp){: loading="lazy"}

Ensuite, il est possible que plusieurs maîtres accèdent au bus en même temps.
Dans ce cas, chaque maître doit s'assurer que le bus est libre avant d'envoyer une séquence (condition d'arrêt depuis plus de 4,7µs).

Enfin, il est possible que des esclaves aient la même adresse par défaut.
Si c'est le cas, il faut les alimenter un par un pour changer leur adresse (voir la datasheet du composant).
