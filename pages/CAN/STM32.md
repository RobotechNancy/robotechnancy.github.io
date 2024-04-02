[order]:       # (3)
[title]:       # (Librairie STM32)
[description]: # (Utiliser la librairie CAN pour STM32)

Pour importer la librairie CAN dans un projet STM32, il faut :

- Depuis la racine du projet : `git clone https://github.com/RobotechNancy/CAN-L432KC.git`
- Suivre [cette démarche](https://www.youtube.com/watch?v=MUZj4YwKVac), qui se résume à
    - Aller dans `Project > Properties > C/C++ General > Paths and Symbols`
    - Ajouter le dossier `CAN-L432KC/Inc` dans l'onglet `Include`
    - Ajouter le dossier `CAN-L432KC` dans l'onglet `Source Location`

> Pour mettre à jour la librairie, `git pull` dans le dossier cloné.

### Configuration du bus

La configuration du bus se fait dans le fichier `ioc` du projet STM32 :

- Ouvrir le fichier `ioc` du projet STM32
- Dans l'onglet `Pinout & Configuration`, sélectionner `CAN1` dans `Connectivity`
- Cocher `Activated` dans `CAN1 Mode and Configuration`
- Cocher toutes les interruptions dans `NVIC Settings`
![Screenshot IOC](/static/images/CAN/IOC.webp)

Les pins `CAN1_RX` et `CAN1_TX` sont configurées automatiquement (ici, `PA11` et `PA12`).
Pour le baudrate, il est automatiquement calculé en fonction des paramètres dans `Bit Timings Parameters`. Ici, `22727 bit/s`.

### Initialisation

La fonction `CAN_AWAKENING` permet d'attribuer une adresse et d'initialiser le bus CAN :
```c
/* USER CODE BEGIN 2 */
CANBUS_AWAKENING(&hcan1, CANBUS_ODOMETRIE);
/* USER CODE END 2 */
```

> Il faut placer cette fonction dans le main avant la boucle infinie et dans
> une section `USER CODE` pour ne pas qu'elle soit écrasée lors de la génération

### Envoyer des données

La fonction `CAN_YEET` permet d'envoyer des données sur le bus CAN, par exemple :
```c
uint8_t data[1] = { 0x01 };

HAL_StatusTypeDef status = CAN_YEET(
    &hcan1,                  // Structure créée par CubeMX pour gérer le bus CAN
    CANBUS_PRIO_STD,         // Priorité du message
    CAN_ADDR_RASPBERRY,      // Adresse du destinataire
    FCT_ACCUSER_RECEPTION,   // Fonction à appeler sur le destinataire
    1,                       // Identifiant de la trame applicative
    false,                   // Demande => false
    data,                    // Données à envoyer 
    1                        // Taille des données
);

if (status != HAL_OK) {
    // Erreur dans l'envoi
}
```

### Recevoir des données

Pour recevoir des données, il faut créer la fonction `HAL_CAN_RxFifo0MsgPendingCallback` qui sera automatiquement appelée à chaque trame reçue
et utiliser `CAN_YOINK` pour récupérer les données :
```c
void HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *hcan) {
    can_frame_t frame;
    if (CAN_YOINK(&hcan1, &frame) != HAL_OK) {
        // Erreur dans la réception
    }

    // Utiliser frame
}
```
