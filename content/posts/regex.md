---
title: "Regex"
date: 2022-08-28
description: "Cheatsheet de expresiones regulares."
type: "post"
tags: ["CheatSheets"]
---

#### Cualquier dígito

Se puede usar `\d` para indicar que se trata de cualquier dígito entre 0-9. Para descartar cualquier dígito se usa `\D`.

#### Cualquier caracter

El `.` (punto), se usa como comodín para indicar que se trata de cualquier caracter, solo indica una posición, para utilizar el punto se necesita escapar con `\.`.

#### Solo [abc]

Poner caracteres entre corchetes nos permite hacer match con solo un caracter de los que vienen dentro del corchete, por ejemplo, `[abc]`an da match con la palabra dan y la palabra ban, pero no con rei. Cuando queremos descartar algunos caracteres utilizamos la siguiente expresión `[^abc]` en este caso cualquier palabra que no contenga alguna de los caracteres dentro del corchete es incluida.

#### Rangos

También es posible utilizar rangos los cuales distinguen entre mayusculas y minusculas por ejemplo: `[A-Z]` que da match con cualquier mayuscula entre A y Z, `[a-n]` da match con cualquier minuscula entre a y n, y `[0-9]` da match con cualquier número entre 0 y 9. Para cualquier rango alfanúmerico se utiliza `\w` el cual es lo mismo que `[A-Za-z0-9]`. Para cualquier no alfanúmerico se utiliza `\W`.

#### Repeticiones

Para una repiticón de caracteres utilizamos `a{5}`, la cual realiza match con ‘waaaaa’. Para establecer rangos usamos `a{1,5}` el cual hace match con ‘wa’ y ‘waaaaa’. Es posible combinar con `[abc]{5}` el cual hace match con ‘waaaaa’, ‘wbbbbb’ y ‘wabcba’.

#### Kleene

Para realizar match con varios caracteres tenemos la estrella de Kleene y Kleene +, el primero realiza match con cualquier cantidad del patron que le precede, incluso si la cantidad es 0, por ejemplo, si tenemos `a*bc`, realiza match con ‘bc’, ‘abc’, ‘aaabc’. Por el otro lado Kleene +, hace lo mismo pero con la condición de que debe haber al menos un elemento, por ejemplo, si tenemos `a+bc`, realiza match con ‘abc’, ‘aabc’, ‘aaaabc’, pero no con ‘bc’.

#### Opcionalidad

Cuando se quiere poner un caracter opcional se usa `?`, si se quiere utilizar el simbolo se escapa de la siguiente forma `\?`. Ejemplo: `ab?c`, va a dar match con ‘abc’ y ‘ac’.

#### Cualquier espacio

Las formas más comunes de espacios son el _espacio_ `..`, el _tabulador_ `\t`, línea nueva `\n`, y el retorno de carro `\r`, pero existe un caracter que engloba todos los tipos de espacio anteriores: el caracter `\s`. Para cualquier caracter que no sea un espacio se usa `\S`.

#### Inicio y fin

Para indicar cuando empieza una cadena utilizamos el caracter `^`, si queremos indicar el fin de la cadena lo indicamos con `$`, de este modo para hacer match con una cadena especifica como ‘Hola mundo’, utilizamos `^Hola mundo$`.

#### Grupos

Para obtener información que después pueda ser analizada más a detalle. Esto se logra hacer colocando una expresión dentro de paréntesis `()`, esta expresión va a ser capturada como un grupo.

#### Subgrupos

También es posible dividir en subgrupos, un grupo. Esto se realiza colocando una expresión entre paréntesis dentro de un grupo limitado entre paréntesis, `(PATTERN(PATTERN))`.

#### OR

Cuando tenemos dos o más cadenas específicas que puedan venir utilizamos el operador lógico or `|`, por ejemplo, `I love (cats|dogs)`, el cual realiza match con ‘I love cats’ y con ‘I love dogs’.

### Source

[RegexOne - Learn Regular Expressions - Lesson 1: An Introduction, and the ABCs](https://regexone.com/)

