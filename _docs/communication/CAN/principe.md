---
category: Communication
category_order: 2

subcategory: CAN
subcategory_order: 1

title: Principe
order: 1
---

Un bus CAN (Control Area Network) est un moyen de communication en temps réel avec un haut niveau de fiabilité.
C'est un bus orienté message composé de deux fils (CAN-H et CAN-L) qui permettent de faire communiquer plusieurs nœuds entre eux :
![CAN](/images/CAN/schema.webp){: loading="lazy" }

> **Note :** Pour avoir une architecture modulaire et réactive, tous les noeuds sont connectés en configuration `High Speed`
(jusqu'à 1 Mbit/s au lieu de 125 kbit/s)

### Transmission

La communication sur le bus CAN s'appuie sur le principe de la diffusion (broadcast).
Chaque nœud écoute le bus et décide de quoi faire avec les messages reçus.

Pour éviter les collisions, la méthode CSMA CD/AMP est utilisée.
Elle permet de déterminer quel message est prioritaire en fonction de son identifiant (ID) et de sa priorité (plus la valeur est basse, plus le message est prioritaire).

Les messages sont transmis sur le bus sont codés avec la méthode NRZ (pas de retour à zéro après chaque bit) :
![NRZ](/images/CAN/NRZ.webp){: loading="lazy" }

Cette méthode présente un défaut majeur : les longues séquences de bits sont difficiles à décoder.
C'est pourquoi, tous les 5 bits, un bit de contrôle est ajouté (Bit Stuffing) :
![NRZS](/images/CAN/NRZS.webp){: loading="lazy" }

### Protocoles

Deux protocoles sont souvent utilisés : `CAN 2.0a` (en haut) et `CAN 2.0b` (en bas) :
![Protocoles](/images/CAN/protocols.webp){: loading="lazy" }

À Robotech Nancy, le protocole `2.0b` est utilisé pour avoir une trame applicative sur 29 bits (au lieu de 11) et jusqu'à 8 octets de données :

| Champ          |       EMIT_ADDR       |       RECV_ADDR       |      FCT_CODE       |           MSG_ID           |    IS_RESP     |
| :------------- | :-------------------: | :-------------------: | :-----------------: | :------------------------: | :------------: |
| Nombre de bits |       8 (0-255)       |       8 (0-255)       |      8 (0-255)      |          4 (0-15)          |    1 (0-1)     |
| Description    | Adresse de l'emetteur | Adresseur du receveur | Fonction à réaliser | ID de la trame applicative | Réponse ou non |

La gestion des réponses est gérée automatiquement par la [librairie CAN](https://github.com/RobotechNancy/Communication/tree/master/CAN/Raspberry){:target="_blank"},
une [page dédiée](../raspberry#utilisation-de-la-librairie){:target="_blank"} est disponible pour plus d'informations.