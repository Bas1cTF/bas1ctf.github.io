---
title: "Barney"
date: 2022-08-28T20:51:57-05:00
description: "Writeup de la máquina Barney disponible en echoctf"
type: "post"
tags: ["echoCTF","writeups"]
---
Escaneando con nmap encontramos que esta abierto el puerto 80, como solo indica un servicio lo visitamos en el navegador.

Viendo el código fuente encontramos la primera flag.

Por fuzzing no encontré nada alv

En la petición que se envía tenemos el campo name, el cual es el que debemos modificar con el valor `beer` para que el servidor acepte nuestro archivo. Esto se intuye después de subir un archivo cualquiera y nos arrojara un mensaje de que se necesita `beer`, entonces modificando los campos disponibles encontramos que el campo a modificar es name.
```
// Original
Content-Disposition: form-data; name="file-upload"; filename="hola.jpg" 
// Archivo aceptado
Content-Disposition: form-data; name="beer"; filename="hola.jpg"
```

En la página de inicio también tenemos el mensaje de que no acepta archivos php y probando a subir uno efectivamente no lo acepta, entonces modificando la petición para que acepte el archivo, notamos que el filtro unicamente se encuentra en el campo filename.

Intentando bypassear encontramos dos métodos principales:

- Subiendo un archivo `.shtml` malicioso para ejecutar código.
- Subiendo un archivo de configuración `.htaccess` para interpretar archivos con una extensión determinada como archivos php.
- Subiendo una shell de `.htaccess`
En este caso seguí la segunda opción subiendo mi archivo .htaccess con el siguiente contenido:
```
# El addType ni lo toma en cuenta xd
AddType application/x-httpd-php .bee
AddHandler application/x-httpd-php .bee
```
Con esto es posible subir una reverse shell de php con extensión `.bee`, entonces al acceder a la dirección del archivo obtenemos una shell en el puerto que pusimos en escucha.

## Escalada de privilegios

Después de realizar unas revisiones manuales y no encontrar algo de utilidad, procedemos a utilizar linpeas para ver que puede encontrar.

En los resultados observamos que la versión de sudo 1.8.27 es vulnerable al CVE-2019-14287. Al tratar de ejecutar un comando indicando el id del usuario podemos pasarle el id `-1` o un número mayor que el maximo de int y obtener acceso a root, debido a que interpreta el id como 0, el cual corresponde a dicho usuario.

```
sudo -u#-1 /bin/bash
```
Las localizaciones de las flags son:
- Comando env con el usuario www-data, o subiendo la shell con `sudo su`.
- /etc/passwd
- /etc/shadow
- Archivo `index.php` (2)
- Archivo `ETSCTF.html`
- /root


[File Upload Lab](https://github.com/LunaM00n/File-Upload-Lab/blob/master/File%20Upload%20Attack.pdf)

[SSI RCE](https://owasp.org/www-community/attacks/Server-Side_Includes_(SSI)_Injection)

Contenido del SHTML malicioso:
```
<!--#exec cmd="ls -la" -->
```
