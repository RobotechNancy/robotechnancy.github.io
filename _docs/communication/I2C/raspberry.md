---
category: Communication
category_order: 2

subcategory: I2C
subcategory_order: 2

title: Raspberry
order: 2
---

Toutes les Raspberry Pi ont un bus I2C disponible sur les broches 3 (SDA) et 5 (SCL).
Pour s'assurer qu'il soit activé, il suffit de suivre les étapes suivantes :
- Exécuter `sudo raspi-config`
- Sélectionner `5 Interfacing Options` puis `P5 I2C`
- Répondre `<Yes>` à `Would you like the ARM I2C interface to be enabled?`

Pour vérifier que le bus I2C est bien activé, il suffit d'exécuter `ls /dev/i2c*`.

### Ecrire et lire sur le bus

Il est possible d'utiliser les librairies standard C de Linux pour accéder au bus I2C :
```c
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <linux/i2c-dev.h>

int main() {
    // Accès Read/Write à l'interface I2C
    int bus = open("/dev/i2c-1", O_RDWR);

    // Sélection de l'adresse de l'esclave
    if (ioctl(bus, I2C_SLAVE, <adresse>)) {
        printf("Erreur lors de la sélection de l'adresse de l'esclave\n");
        return 1;
    }
}
```

Pour écrire sur le bus, il suffit d'utiliser la fonction `write`, par exemple :
```c
// Ecrire 0x01 sur le registre 0x80
uint8_t data[2] = {0x80, 0x01};
size_t bytes_sent = write(bus, data, 2);

if (bytes_sent != 2) {
    printf("Erreur lors de l'écriture sur le bus I2C\n");
    return 1;
}
```

Pour lire sur le bus, il suffit d'utiliser la fonction `read`, par exemple :
```c
// On envoie le registre à lire
uint8_t data[1] = {0x81};
write(bus, data, 1);

// Idéalement il faudrait faire du polling
usleep(400);

// Et on lit la valeur retournée
uint8_t buffer[1];
read(bus, buffer, 1);
printf("Valeur lue : %d\n", buffer[0]);
```
