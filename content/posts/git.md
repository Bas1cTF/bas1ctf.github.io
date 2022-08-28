---
title: "Git"
date: 2022-08-28T17:10:52-05:00
description: ""
type: "post"
tags: ["cheatsheets"]
---
### Vincular Git
Para conectar correctamente es necesario tener configurado Git;
- Se establece un nombre con `git config --global user.name "Nombre"`
- Se establece el correo: `git config --global user.email "email@email.com"`
El correo tiene que ser el mismo utilizado en la cuenta Github o Gitlab.
Para enlazar Git con una cuenta de Github o Gitlab solo busca como enlazar con SSH, las instrucciones pueden cambiar y nada mejor que buscar la documentación oficial.
### Primer push
- `git init` - Para preparar una carpeta como repositorio git.
- `git add PathArchivo` - Agregar un archivo o archivos al stage, listos para hacer commit.
- `git status` - Vemos el status del repositorio.
- `git diff` - Muestra los cambios en el repositorio.
- `git commit -m "Mensaje"` - Guarda el estado actual del repositorio, la bandera -m permite agregar un mensaje desde consola si no se incluye la bandera, abre el editor (vim). `:wq xd`
- `git log --oneline` - Despliega los commits que se han realizado
Al crear un nuevo repositorio en Github, nos da los comandos para conectar Git al repositorio remoto.
- `git push -u origin main` - Guardar el repositorio local en el repositorio remoto.
### Revertir cambios
- `git checkout -- NombreArchivo` - Revertir los cambios que no han sido añadidos al stage (estar listos para un commit).
- `git reset HEAD NombreArchivo` - Reestablece los cambios al último commit, luego se usa el comando checkout.
- `git reset HashCommit` - Se reestablece a la versión de commit señalada (hash).
- `git restore NombreArchivo` - Reestablecemos el archivo después de usar el comando anterior.
- `git reset --hard HashCommit` - Lo mismo de los dos comandos anteriores. No se recomiendan mucho. No es una buena práctica.
- `git revert HEAD` - Reestablece al penúltimo commit, solo salir de vim.
Revertir dos commits hechos por error.
``` 
$ git revert --no-commit HEAD
$ git revert --no-commit HEAD~1
$ git revert --continue
```
### Ramas
- `git branch` - Enlista las ramas existentes.
- `git branch NombreRama` - Crea una nueva rama.
- `git checkout -b NombreRama` - Crea una nueva rama y nos cambiamos a ella.
- `git branch -m NombreRama NuevoNombre` - Renombra una rama.
- `git branch -d NombreRama` - Elimina una rama.
- `git branch -c NombreRama NuevaRama` - Copiar una rama.
- `git branch -h` - Enlista todas las opciones del comando.
- `git checkout NombreRama` - Cambiar a la rama indicada.
- `git diff NombreRama1 NombreRama2` - Compara dos ramas.
- `git merge NombreRama1 NombreRama2` - Añade todo lo de la rama 1 a la rama 2.
- `git log --oneline --graph --all` - Nos permite ver todos los commit.
### Push & Pull
- `git push origin NombreRama` - Sincronizar el repositorio remoto con los cambios del repositorio local.
- `git pull origin NombreRama` - Obtener los cambios de la rama indicada del repositorio remoto. Realiza un merge entre la rama en la que nos localizamos y la que obtenemos.
- `git clone` - Descargar un repositorio, solo se descarga la rama principal.
- `git push origin HEAD:main` - Realizar un push desde una rama remota.
