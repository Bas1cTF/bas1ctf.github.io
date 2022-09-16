---
title: "Windows Forensics 1"
date: 2022-08-30T19:19:02-05:00
description: ""
type: "post"
tags: ["TryHackme"]
showTableOfContents: true
---
## Registros de Windows
*Artefactos (Artifacts),* es la evidencia dejada por los usuarios al interactuar con el sistema.

Los **registros de Windows** son bases de datos que almacenan la configuración de sistema del usuario (hardware, software o información del usuario), archivos usados recientemente, programas usados, o dispositivos conectados al sistema.
Se conforma de llaves y valores, al observarlos a traves de regedit.exe se pueden distinguir a las llaves como los folders y el valor de la llave son los datos almacenados en esta. 
*Registry Hive,* es un grupo de llaves, subllaves y sus valores, almacenados en un solo archivo en el disco.
En cualquier sistema Windows tenemos cinco llaves principales:
1. HKEY_CURRENT_USER
2. HKEY_HKEY_USERS
3. HKEY_LOCAL_MACHINE
4. HKEY_CLASSES_ROOT
5. HKEY_CURRENT_CONFIG

![Clasificacion](/images/windows-forensics/tabla.png)
## Registry Hives offline

Acceder a los registros en una imagen del disco no es posible hacerlo desde regedit, para eso es necesario saber en donde se encuentran, la mayoria de las hives se localizan en el directorio `C:\Windows\System32\Config` las cuales son:
1. DEFAULT - `HKEY_USERS\DEFAULT`
2. SAM - `HKEY_LOCAL_MACHINE\SAM`
3. SECURITY - `HKEY_LOCAL_MACHINE\SECURITY`
4. SOFTWARE - `HKEY_LOCAL_MACHINE\SOFTWARE`
5. SYSTEM - `HKEY_LOCAL_MACHINE\SYSTEM`

Las hives que contienen información del usuario son las siguientes (*Son archivos ocultos*):
1. NTUSER.DAT - `HKEY_CURRENT_USER` cuando un usuario inicia sesión - Se enceuntra en `C:\Users\<username>`
2. USRCLASS.DAT - `HKEY_CURRENT_USER\SOFTWARE\CLASSES` - Se encuentra en `C:\Users\<username>\AppData\Local\Microsoft\Windows` 

##  Transaction Logs y Backups de los registros

Frecuentemente Windows registra las modificaciones realizadas en las hives, estos se encuentran en el mismo directorio donde se almacaena la hive, con el nombre de la hive, son archivos .LOG y se le agrega un número en caso de que sean más de una :v.
Las copias de respaldo son realizadas cada 10 dias. Las copias son guardadas en `C:\Windows\System32\Config\RegBack`
![Regback](/images/windows-forensics/Regbacks.png)

## Herramientas

### Adquisición
1. [Autopsy](https://www.autopsy.com/) Dirigirse a la localización y extraer el archivo de la hive.
2. [KAPE](https://www.kroll.com/en/services/cyber-risk/incident-response-litigation-support/kroll-artifact-parser-extractor-kape) Linea de comandos y GUI, seleccionar fuente de donde obtener los registros y el destino en donde se van a copiar.
3. [FTK Imager](https://www.exterro.com/ftk-imager) Dirigirse a la localización y extraer el archivo de la hive.
### Visualización
1. [Registry Viewer](https://accessdata.com/product-download/registry-viewer-2-0-0) Similar a regedit, solo puede visualizar una hive a la vez. No toma en cuenta los transaction logs.
2. [Zimmerman's Registry Explorer](https://ericzimmerman.github.io/#!index.md) Permite cargar multiples hives y también utiliza la información de los transaction logs.
3. [RegRipper](https://github.com/keydet89/RegRipper3.0) Recibe un archivo hive como entrada y da como salida un reporte sobre las llaves importantes para forense.

## Información importante

En la llave `SOFTWARE\Microsoft\Windows NT\CurrentVersion` podemos consultar la versión del SO de la máquina.
### Current Control Set
Las hives donde se almacena la configuración que controla el inicio del sistema, son llamadas Control Set. Comunmente estos son `SYSTEM\ControlSet001` y `SYSTEM\ControlSet002`. De donde, la mayoria de los casos ControlSet001 apunta al Control Set con el que la máquina arrancó, mientras que, ControlSet002 es el `last known good` (la ultima configuración buena conocida).
Por otra parte, Windows crea un Control Set volatil cuando la máquina esta encendida, el cual es `HKLM\SYSTEM\CurrentControlSet`. Podemos verificar cual Control Set es utilizado como el actual y cual es el `last known good`, por medio de los valores en el registro de `SYSTEM\Current` y `SYSTEM\LastKnownGood` respectivamente.
### Nombre de la computadora
Para consultar el nombre de la computadora podemos buscar en la siguiente localización. 
`SYSTEM\CurrentControlSet\Control\ComputerName\ComputerName`
### Zona Horaria
Esta información es importante para poder desarrollar una cronología de los eventos ocurridos. Esta se puede consultar en la siguiente localización.
`SYSTEM\CurrentControlSet\Control\TimeZoneInformation`
### Interfaces de red y past networks?
Para consultar la dirección IP, la dirección DHCP IP, la máscara de subred y los servidores DNS, recurrimos a la siguiente localización.
`SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces`
Si queremos consultar las redes a las que estuvo conectada la máquina, accedemos a las siguientes localizaciones.
`SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Unmanaged`
`SOFTWARE\Microsoft\WindowsNT\CurrentVersion\NetworkList\Signatures\Managed`
### Programas con autoarranque
Los programas o comandos que se ejecutan al momento que un usuario inicia sesión en la máquina se pueden consultar en las siguientes llaves.
`NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Run`
`NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\RunOnce`
`SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce`
`SOFTWARE\Microsoft\Windows\CurrentVersion\policies\Explorer\Run`
`SOFTWARE\Microsoft\Windows\CurrentVersion\Run`
De igual si queremos revisar los servicios que se ejecutan desde que se inicia el sistema, nos dirigimos a `SYSTEM\CurrentControlSet\Services` para consultar los servicios, depués de seleccionar el que queremos revisar, observamos la llave Start si su valor es 0x02 esto quiere decir que se ejecuta al iniciarse el sistema.

### Información de los usuarios
En la hive SAM se puede revisar información sobre la cuenta, los grupos y los inicios de sesión. Información de usuario como el ID relativo, cuantas veces inicio sesión un usuario, último inicio de sesión, último intento fallido de inicio, último cambio de contraseña, cuando expira y la pista sobre la contraseña. Todo lo anterior se revisa en:
`SAM\Domains\Account\Users` 
### Archivos recientes
Windows mantiene una lista de archivos abiertos recientemente, de cada usuario. Esta lista la podemos encontrar en la siguiente localización. 
`NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs`
De igual forma encontramos llaves que contienen el último archivo de una extensión (como pdf, docx...) abierto. Por ejemplo.
`NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs\.pdf`
**Archivos de Office** 
Los archivos abiertos recientemente se pueden encontrar en la siguiente localizción.
`NTUSER.DAT\Software\Microsoft\Office\VERSION`
**ShellBags**
Eric Zimmerman's tools called ShellBag Explorer show us the information from the hive file we have extracted.
`USRCLASS.DAT\Local Settings\Software\Microsoft\Windows\Shell\Bags`
`USRCLASS.DAT\Local Settings\Software\Microsoft\Windows\Shell\BagMRU`
`NTUSER.DAT\Software\Microsoft\Windows\Shell\BagMRU`
`NTUSER.DAT\Software\Microsoft\Windows\Shell\Bags`

**Dialogos de abrir/guardar y último visitado**

Cuando abrimos o guardamos un archivo desde el cuadro de dialogo, podemos consultar los movimientos que realizamos en las siguientes localizaciones.
`NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\OpenSavePIDlMRU`
`NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedPidlMRU` 

**Barra de busqueda de Windows**
Otra forma de revisar la actividad reciente es mediante las busquedas realizadas por el usuario, estas se pueden encontrar en las siguientes localizaciones.
`NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\TypedPaths`
`NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery`
## Ejecutables
[Inicio](#registros%20de%20windows)
**UserAssist (Programas desde Windows Explorer)**
Windows mantiene información acerca de los programas ejecutados desde Windows Explorer, la fecha en que se abrió y el número de veces que se ha abierto. Esta llave se puede encontrar en la siguiente localización. Donde `GUID` es el ID del usuario. 
`NTUSER.DAT\Software\Microsoft\Windows\Currentversion\Explorer\UserAssist\{GUID}\Count`
**ShimCache (Todas las aplicaciones ejecutadas en la máquina)**
Es un mecanismo usado para dar seguimiento a la compatibilidad de los ejecutables con el sistema operativo.
ShimCache almacena el nombre del archivo, el tamaño del archivo y la última vez que se modifico el ejecutable. Lo podemos encontrar en la siguiente localización.
`SYSTEM\CurrentControlSet\Control\Session Manager\AppCompatCache`
Para visualizarlo podemos pasarle la hive `SYSTEM` a la herramienta AppCompatCacheParser.exe de Eric Zimmerman y obtenemos como salida un archivo csv con el siguiente comando:
```AppCompatCacheParser.exe --csv <ruta de salida> -f <ruta de la hive SYSTEM> -c <analizador gramatical utilizado>``` 
**AmCache** 
Otra hive importante es la de **Amcache** en la cual se almacena información sobre programas ejecutados recientemente, la ubicación del ejecutable, instalación, ejecucion y fecha en que se borró, e incluso las hashes en SHA1 de los programas ejecutados. Se localiza en `C:\Windows\AppCompat\Programs\Amcache.hve`
**BAM/DAM**
Monitoreo activo en segundo plano (Background Active Monitor), mantiene una lista de las aplicaciones en segundo plano. Moderador de actividad del escritorio (Desktop Activity Moderator) se encarga de optimizar el consumo de energía del dispositivo. Contiene información acerca de los últimos programas ejecutados, sus rutas de ubicación completas y la ultima vez que se ejecutó.
Estos podemos encontrarlos en las siguientes localizaciones.
`SYSTEM\CurrentControlSet\Services\bam\UserSettings\{SID}`
`SYSTEM\CurrentControlSet\Services\dam\UserSettings\{SID}`

## Dispositivos USB

**Identificación de dispositivos**
Las siguientes localizaciones almacenan información sobre los dispositivos USB conectados a la máquina. Almacenan el ID del vendedor, el ID del producto y versión del dispositivo USB.
`SYSTEM\CurrentControlSet\Enum\USBSTOR`
`SYSTEM\CurrentControlSet\Enum\USB`
**Primera/Última conexión**
En la siguiente localización tenemos distintas opciones de acuerdo al número colocado en "####"
0064 - Primera conexión
0066 - Última conexión
0067 - Últma vez que se desconectó
`SYSTEM\CurrentControlSet\Enum\USBSTOR\Ven_Prod_Version\USBSerial#\Properties\{83da6326-97a6-4088-9453-a19231573b29}\####`

**Nombre de Volumen del dispositivo USB**
Lo podemos encontrar en la siguiente localización.
`SOFTWARE\Microsoft\Windows Portable Devices\Devices`
Con esto podemos identificar muy bien los dispositivos USB y concentrarnos en el que nos interesa.
## Fuente
[Windows Forensics 1 - Tryhackme](https://tryhackme.com/room/windowsforensics1)

