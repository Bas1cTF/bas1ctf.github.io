---
title: "Tor"
date: 2022-08-28T16:35:24-05:00
description: "Apuntes de la room Tor en TryHackme"
type: "post"
tags: ["CheatSheets","TryHackme"]
---
Comando `(sudo) apt-get install tor` para instalar/actualizar tor.

Para ejecutar el programa se utiliza `(sudo) service tor start`.

El comando `service tor status` índica el estado de Tor.

Para detener su ejecución se utiliza `(sudo) service tor stop`.

**Proxychains** es una herramienta que obliga a cualquier conexión TCP hecha con cualquier aplicación a seguir un proxy como Tor o cualquier otro proxy HTTP(S). Está herramienta es ampliamente utilizada durante la etapa de reconocimiento.

Para instalar/actualizar la herramineta se utiliza `(sudo) apt install proxychains`.

La configuración se encuentra en el archivo `/etc/proxychains.conf`, se puede editar con cualquier editor de tu preferencia, ejemplo: `(sudo) vim /etc/proxychains.conf`. En este archivo vienen comentarios sobre el funcionamiento de cada opción, las cuales se pueden comentar y descomentar para activarlas, se recomienda la opción `proxy_dns` para evitar filtraciones del DNS.

*Nota: Antes de ejecutar firefox con proxychains, se tienen que haber cerrado todos las demás ventanas de navegadores.*

Una vez configurado iniciamos el servicio Tor, y ejecutamos el comando `proxychains firefox`, se coloca `proxychains` antes de cualquier comando para forzar a transferir los datos a tráves de Tor. Para comprobar que efectivamente cambio nuestra IP, podemos ir a la página `dnsleaktest.com`.

**Información obtenida de:** [Tor - Tryhackme](https://tryhackme.com/room/torforbeginners)


