[order]:       # (1)
[title]:       # (Principe)
[description]: # (Principe de fonctionnement du bus CAN)

Un bus CAN (Control Area Network) est un moyen de communication en temps réel avec un haut niveau de fiabilité.
C'est un bus orienté message composé de deux fils (CAN-H et CAN-L) qui permettent de faire communiquer plusieurs nœuds entre eux :
![Schéma CAN](/static/images/CAN/schema.webp){: loading="lazy" }

> Pour avoir une architecture modulaire et réactive, tous les noeuds sont connectés en configuration `High Speed`
(jusqu'à 1 Mbit/s au lieu de 125 kbit/s). Ici, on utilise une connexion à 500 kbit/s.

### Transmission

La communication sur le bus CAN s'appuie sur le principe de la diffusion (broadcast).
Chaque nœud écoute le bus et décide de quoi faire avec les messages reçus.

Pour éviter les collisions, la méthode CSMA CD/AMP est utilisée.
Elle permet de déterminer quel message est prioritaire en fonction de son identifiant (ID) et de sa priorité (plus la valeur est basse, plus le message est prioritaire).

Les messages sont transmis sur le bus sont codés avec la méthode NRZ (pas de retour à zéro après chaque bit) :
![NRZ](/static/images/CAN/NRZ.webp){: loading="lazy" }

Cette méthode présente un défaut majeur : les longues séquences de bits sont difficiles à décoder.
C'est pourquoi, tous les 5 bits, un bit de contrôle est ajouté (Bit Stuffing) :
![NRZS](/static/images/CAN/NRZS.webp){: loading="lazy" }

### Protocoles

Deux protocoles sont souvent utilisés : `CAN 2.0a` (en haut) et `CAN 2.0b` (en bas) :
![Protocoles](/static/images/CAN/protocols.webp){: loading="lazy" }

Il est possible d'utiliser les champs `Identifier` et `Extended Identifier` pour créer une trame applicative :
C'est une trame qui contient des meta-données sur le message et qui sert aux noeuds à savoir quoi faire avec le message.

Il est important de comprendre :

- Il n'y a pas de notion d'adresse à proprement parler, les noeuds ne font qu'appliquer des __filtres__ sur les messages reçus
- Les champs d'identification et le champ de données sont deux choses différentes
