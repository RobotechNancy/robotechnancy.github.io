[order]:       # (1)
[title]:       # (Installation)
[description]: # (Comment installer les outils de développement pour STM32)

La manière la plus facile de développer pour STM32 est d'[installer STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html#get-software) qui offre :

- Un IDE basé sur Eclipse
- Des outils de compilation, de debug et de flash avec [ST-LINK](https://www.st.com/en/development-tools/st-link-v2.html)
- De la génération de code avec [STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html#get-software)

> [!TIP]
> Si vous utilisez `flatpak` sur Linux : `flatpak install flathub com.st.STM32CubeIDE`
> (ne nécessite pas de donner son email, nom et prénom)

Une l'installeur téléchargé, il suffit de l'exécuter et de suivre les instructions.
Sur Linux, il est possible que l'installeur ne soit pas exécutable, il faut alors le rendre exécutable avec `chmod +x fichier_installeur`. 

![STM32CubeIDE](/static/images/STM32/cubeide.webp)
