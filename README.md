# EcoMercadito-frotend

# EcoMercadito

Frontend de EcoMercadito desarrollado con Angular.

Este documento explica paso a paso cómo preparar el entorno de desarrollo, clonar el repositorio, instalar las dependencias y ejecutar el proyecto localmente. También describe la organización de las carpetas principales.

---

## Índice

1. [Requisitos previos](#1-requisitos-previos)
2. [Clonar el repositorio](#2-clonar-el-repositorio)
3. [Ingresar a la carpeta del proyecto](#3-ingresar-a-la-carpeta-del-proyecto)
4. [Instalar las dependencias](#4-instalar-las-dependencias)
5. [Revisar la configuración del entorno](#5-revisar-la-configuración-del-entorno)
6. [Ejecutar el proyecto](#6-ejecutar-el-proyecto)
7. [Detener el proyecto](#7-detener-el-proyecto)
8. [Estructura de carpetas](#8-estructura-de-carpetas)
9. [Comandos útiles](#9-comandos-útiles)
10. [Solución de problemas frecuentes](#10-solución-de-problemas-frecuentes)
11. [Inicio rápido](#11-inicio-rápido)

---

## 1. Requisitos previos

Antes de comenzar, debes tener instaladas las siguientes herramientas:

| Herramienta      | Propósito                                                                        |
| ---------------- | -------------------------------------------------------------------------------- |
| Git              | Clonar el repositorio y gestionar los cambios del código.                        |
| Node.js          | Ejecutar las herramientas de desarrollo del proyecto.                            |
| npm              | Instalar y administrar las dependencias. Se incluye con Node.js.                 |
| Editor de código | Abrir y modificar el proyecto. Puedes utilizar Visual Studio Code u otro editor. |
| Navegador web    | Visualizar y probar la aplicación.                                               |

### 1.1. Instalar Git

Puedes descargar Git desde:

https://git-scm.com/downloads

Después de instalarlo, abre una terminal y verifica la instalación:

```bash
git --version
```

El comando debe mostrar la versión instalada.

### 1.2. Instalar Node.js y npm

Puedes descargar Node.js desde:

https://nodejs.org/

Utiliza una versión de Node.js compatible con la versión de Angular de este proyecto. No instales una versión únicamente porque sea la más reciente.

Para identificar la versión de Angular:

1. Consulta el archivo `eco-mercadito/package.json`.
2. Busca la dependencia `@angular/core`.
3. Revisa la tabla oficial de compatibilidad:

https://angular.dev/reference/versions

Una vez instalado Node.js, verifica las herramientas:

```bash
node --version
npm --version
```

Ambos comandos deben mostrar sus respectivas versiones.

> Si instalaste una herramienta mientras tenías abierta la terminal, ciérrala y vuelve a abrirla antes de ejecutar estos comandos.

### 1.3. Angular CLI

Los comandos de esta guía utilizan `npx ng` después de instalar las dependencias, para ejecutar Angular CLI desde el proyecto.

No es necesario instalar Angular CLI globalmente si el proyecto ya incluye `@angular/cli` entre sus dependencias de desarrollo.

---

## 2. Clonar el repositorio

### 2.1. Abrir una terminal

Puedes utilizar:

- La terminal integrada de Visual Studio Code.
- PowerShell.
- Símbolo del sistema.
- Git Bash.
- La terminal de Linux o macOS.

### 2.2. Ubicarte en la carpeta donde guardarás el proyecto

Por ejemplo, si utilizas una carpeta llamada `proyectos`:

```bash
cd proyectos
```

Si todavía no existe, puedes crearla:

```bash
mkdir proyectos
cd proyectos
```

> La ubicación es opcional. Puedes guardar el repositorio en cualquier carpeta donde tengas permisos de escritura.

### 2.3. Clonar EcoMercadito

Ejecuta:

```bash
git clone [https://github.com/danielamaya503/EcoMercadito-frotend.git](https://github.com/danielamaya503/EcoMercadito-frotend.git)
```

Este comando descargará el repositorio en una carpeta llamada:

```text
EcoMercadito-frotend
```

> El nombre del repositorio contiene `frotend`. Conserva esa escritura en la URL y en los comandos.

Si GitHub solicita autenticación, utiliza una cuenta que tenga acceso al repositorio.

---

## 3. Ingresar a la carpeta del proyecto

Primero, entra al repositorio:

```bash
cd EcoMercadito-frotend
```

Después, entra a la carpeta de la aplicación Angular:

```bash
cd eco-mercadito
```

También puedes realizar ambos pasos con un solo comando, inmediatamente después de clonar:

```bash
cd EcoMercadito-frotend/eco-mercadito
```

### 3.1. Verificar que estás en la carpeta correcta

Antes de instalar las dependencias, verifica que la carpeta actual contenga el archivo:

```text
package.json
```

Para listar el contenido en Windows:

```bash
dir
```

En Git Bash, Linux o macOS:

```bash
ls
```

> Los comandos de instalación y ejecución de esta guía deben ejecutarse dentro de `eco-mercadito`, donde se encuentra el `package.json` de la aplicación.

### 3.2. Abrir el proyecto en Visual Studio Code

Si utilizas Visual Studio Code y tienes disponible su comando de terminal:

```bash
code .
```

El punto `.` indica que quieres abrir la carpeta actual.

Si el comando no está disponible, abre Visual Studio Code y selecciona:

```text
Archivo → Abrir carpeta → eco-mercadito
```

---

## 4. Instalar las dependencias

Dentro de la carpeta `eco-mercadito`, ejecuta:

```bash
npm install
```

También puedes utilizar su forma abreviada:

```bash
npm i
```

Ambos comandos realizan la misma operación.

### ¿Qué hace esta instalación?

npm lee las dependencias declaradas en `package.json` y las instala para que el proyecto pueda ejecutarse.

Como parte de la instalación:

- Se descarga el código de las dependencias necesarias.
- Se crea o completa la carpeta `node_modules`.
- Se utiliza `package-lock.json`, si está disponible, para resolver las dependencias.

### Indicaciones importantes

- Espera a que la instalación termine antes de iniciar el proyecto.
- Necesitas conexión a Internet para descargar las dependencias que no estén disponibles localmente.
- No debes crear ni modificar manualmente la carpeta `node_modules`.
- No debes subir `node_modules` al repositorio.
- Si la instalación falla, revisa el mensaje de error antes de continuar.
- No utilices `--force` o `--legacy-peer-deps` como primera solución a un conflicto de dependencias.

### Instalación reproducible con `npm ci`

Si el repositorio incluye un `package-lock.json` actualizado y consistente con `package.json`, puedes utilizar:

```bash
npm ci
```

Este comando es útil cuando necesitas instalar exactamente las dependencias registradas en el archivo de bloqueo, por ejemplo, en integración continua.

> Para el inicio paso a paso de esta guía, utiliza `npm install` o `npm i`. No necesitas ejecutar ambos.

---

## 5. Revisar la configuración del entorno

El proyecto cuenta con la carpeta:

```text
src/environments
```

Antes de ejecutar la aplicación, revisa los archivos existentes en esta carpeta.

### 5.1. ¿Qué debes revisar?

Según la configuración real del proyecto, estos archivos pueden contener:

- La dirección base de una API.
- Opciones de configuración por entorno.
- Valores utilizados durante el desarrollo o la compilación.

No cambies nombres de propiedades ni agregues valores sin verificar cómo los utiliza la aplicación.

### 5.2. Si el frontend utiliza un backend

Comprueba que:

1. El backend esté disponible.
2. La dirección configurada corresponda al entorno que utilizarás.
3. El puerto y el protocolo sean correctos.
4. El backend permita las solicitudes desde el origen del frontend.

> Iniciar Angular no inicia automáticamente un backend independiente. Si algunas pantallas requieren una API, esa API debe estar disponible para que dichas funciones operen correctamente.

### 5.3. Configuraciones de Angular

Revisa `angular.json` para conocer las configuraciones disponibles y cualquier reemplazo de archivos de entorno.

El nombre de un archivo de entorno por sí solo no determina cuándo se utiliza: debe estar conectado con la configuración de compilación correspondiente.

> No guardes contraseñas, claves privadas ni secretos en los archivos del frontend. El código y la configuración incluidos en la aplicación pueden ser accesibles desde el navegador.

---

## 6. Ejecutar el proyecto

Después de instalar las dependencias y revisar la configuración, ejecuta:

```bash
npx ng serve
```

Este comando inicia el servidor de desarrollo de Angular.

### 6.1. Abrir la aplicación

Cuando la terminal indique que el servidor está listo, abre en el navegador la dirección que muestre.

Si no se ha configurado un puerto diferente, normalmente será:

```text
http://localhost:4200/
```

> Si la terminal muestra otra dirección o puerto, utiliza ese valor.

### 6.2. Abrir el navegador automáticamente

Puedes iniciar el servidor y solicitar que se abra el navegador con:

```bash
npx ng serve --open
```

### 6.3. Mantener la terminal abierta

Mientras utilizas la aplicación:

- Mantén abierta la terminal donde ejecutaste el servidor.
- No cierres el proceso de Angular.
- Guarda los cambios de código para que el servidor vuelva a compilar cuando corresponda.

### 6.4. Ejecutar mediante `npm start`

Si `package.json` contiene un script llamado `start` que inicia la aplicación, también puedes utilizar:

```bash
npm start
```

Antes de usarlo, revisa la sección `scripts` del archivo `package.json`.

Puedes listar los scripts disponibles con:

```bash
npm run
```

> `npm start` depende del script definido por el proyecto. El comando principal de esta guía es `npx ng serve`.

### 6.5. Utilizar otro puerto

Si el puerto predeterminado está ocupado:

```bash
npx ng serve --port 4300
```

Después, abre la dirección que indique la terminal, normalmente:

```text
http://localhost:4300/
```

---

## 7. Detener el proyecto

En la terminal donde está ejecutándose Angular, presiona:

```text
Ctrl + C
```

Si la terminal solicita confirmar la finalización del proceso, acepta la confirmación.

Para iniciar nuevamente la aplicación:

```bash
npx ng serve
```

No necesitas volver a clonar el repositorio ni instalar las dependencias cada vez que quieras ejecutar el proyecto.

---

## 8. Estructura de carpetas

La estructura principal compartida para el proyecto es:

```text
EcoMercadito-frotend/
└── eco-mercadito/
    └── src/
        ├── app/
        │   ├── core/
        │   ├── features/
        │   ├── services/
        │   └── shared/
        └── environments/
```

Las siguientes descripciones sirven como guía de organización. La responsabilidad concreta de cada archivo debe verificarse en el código del proyecto.

### 8.1. `src`

Contiene el código fuente de la aplicación.

Dentro de esta carpeta se encuentran `app` y `environments`, junto con los demás archivos de origen que tenga configurados el proyecto.

[Ver carpeta src](https://github.com/danielamaya503/EcoMercadito-frotend/tree/main/eco-mercadito/src)

### 8.2. `src/app`

Contiene el código de la aplicación Angular, organizado en las carpetas principales descritas a continuación.

[Ver carpeta app](https://github.com/danielamaya503/EcoMercadito-frotend/tree/main/eco-mercadito/src/app)

### 8.3. `src/app/core`

Carpeta destinada a elementos centrales o transversales de la aplicación.

Según la organización del proyecto, puede utilizarse para elementos como:

- Configuración general.
- Guards de navegación.
- Interceptores HTTP.
- Lógica de sesión o autenticación.
- Componentes base de la aplicación.

Estos ejemplos describen usos posibles; no implican que todos estén implementados actualmente.

[Ver carpeta core](https://github.com/danielamaya503/EcoMercadito-frotend/tree/main/eco-mercadito/src/app/core)

### 8.4. `src/app/features`

Carpeta destinada a organizar las funcionalidades de la aplicación.

Permite agrupar el código por área funcional, en lugar de concentrar todas las pantallas y componentes en una sola carpeta.

Los nombres de las subcarpetas deben corresponder a las funcionalidades realmente implementadas.

[Ver carpeta features](https://github.com/danielamaya503/EcoMercadito-frotend/tree/main/eco-mercadito/src/app/features)

### 8.5. `src/app/services`

Carpeta destinada a los servicios de la aplicación.

Según su implementación, estos servicios pueden encargarse de:

- Realizar solicitudes a una API.
- Compartir lógica entre componentes.
- Administrar operaciones de acceso a datos.
- Centralizar integraciones.

Antes de crear un servicio, revisa la organización existente para evitar duplicar responsabilidades con `core` o `features`.

[Ver carpeta services](https://github.com/danielamaya503/EcoMercadito-frotend/tree/main/eco-mercadito/src/app/services)

### 8.6. `src/app/shared`

Carpeta destinada a elementos reutilizables entre distintas partes de la aplicación.

Puede utilizarse para:

- Componentes compartidos.
- Directivas.
- Pipes.
- Utilidades comunes.

La finalidad es reutilizar implementaciones y reducir la duplicación de código.

[Ver carpeta shared](https://github.com/danielamaya503/EcoMercadito-frotend/tree/main/eco-mercadito/src/app/shared)

### 8.7. `src/environments`

Contiene los archivos de configuración de entorno existentes en el proyecto.

Revisa sus valores y la configuración de `angular.json` antes de cambiar direcciones de API o seleccionar un entorno de ejecución.

[Ver carpeta environments](https://github.com/danielamaya503/EcoMercadito-frotend/tree/main/eco-mercadito/src/environments)

---

## 9. Comandos útiles

Ejecuta estos comandos desde la carpeta `eco-mercadito`.

| Comando                    | Descripción                                                |
| -------------------------- | ---------------------------------------------------------- |
| `npm i`                    | Instala las dependencias del proyecto.                     |
| `npm run`                  | Lista los scripts disponibles en `package.json`.           |
| `npx ng version`           | Muestra información de Angular CLI y del entorno.          |
| `npx ng serve`             | Inicia el servidor de desarrollo.                          |
| `npx ng serve --open`      | Inicia el servidor y abre el navegador.                    |
| `npx ng serve --port 4300` | Inicia el servidor utilizando otro puerto.                 |
| `npx ng build`             | Compila la aplicación según la configuración del proyecto. |

### 9.1. Compilar la aplicación

Para generar una compilación:

```bash
npx ng build
```

Consulta `angular.json` para conocer la configuración predeterminada y la ubicación de los archivos generados.

Si existe una configuración llamada `production`, puedes seleccionarla explícitamente:

```bash
npx ng build --configuration production
```

> Compilar la aplicación no la publica automáticamente en Internet. El despliegue es un proceso adicional.

### 9.2. Pruebas

Consulta los scripts del proyecto:

```bash
npm run
```

Si existe un script `test`, puedes ejecutarlo con:

```bash
npm test
```

La disponibilidad y el comportamiento de las pruebas dependen de las herramientas y configuraciones incluidas en el proyecto.

---

## 10. Solución de problemas frecuentes

### 10.1. `git`, `node` o `npm` no se reconocen

Posibles causas:

- La herramienta no está instalada.
- La terminal se abrió antes de completar la instalación.
- La herramienta no está disponible en el `PATH` del sistema.

Qué revisar:

1. Confirma que la herramienta esté instalada.
2. Cierra y vuelve a abrir la terminal.
3. Ejecuta nuevamente el comando de verificación correspondiente:

```bash
git --version
node --version
npm --version
```

### 10.2. npm no encuentra `package.json`

Un mensaje como `ENOENT` relacionado con `package.json` puede indicar que estás ejecutando npm desde una carpeta incorrecta.

Qué revisar:

1. Lista el contenido de la carpeta actual.
2. Comprueba que exista `package.json`.
3. Si estás en la raíz del repositorio, entra a la aplicación:

```bash
cd eco-mercadito
```

4. Ejecuta nuevamente:

```bash
npm i
```

### 10.3. Error de compatibilidad con Node.js

Qué revisar:

1. Consulta la versión instalada:

```bash
node --version
```

2. Revisa la versión de `@angular/core` en `package.json`.
3. Compara ambas versiones con la tabla oficial:

https://angular.dev/reference/versions

4. Utiliza una versión de Node.js compatible.
5. Repite la instalación si corresponde.

### 10.4. El comando `ng` no se reconoce

Utiliza el comando indicado en esta guía:

```bash
npx ng serve
```

Si también falla:

1. Confirma que estás dentro de `eco-mercadito`.
2. Comprueba que `npm i` terminó correctamente.
3. Revisa que `@angular/cli` esté declarado en el proyecto.

### 10.5. El puerto está ocupado

Ejecuta el proyecto en otro puerto:

```bash
npx ng serve --port 4300
```

Abre la dirección que muestre la terminal.

### 10.6. La aplicación abre, pero no carga datos

Qué revisar:

1. La disponibilidad del backend, si la función depende de una API.
2. La dirección de la API configurada.
3. La pestaña Network o Red de las herramientas del navegador.
4. Los errores de la consola.
5. La autenticación requerida por los endpoints.
6. La configuración CORS del backend, si el navegador reporta un error de ese tipo.

> Un error al consultar datos no significa necesariamente que Angular no se haya iniciado. El servidor del frontend y la API son componentes distintos.

### 10.7. Error `ERESOLVE` durante la instalación

Este error puede indicar un conflicto entre versiones de dependencias.

Antes de forzar la instalación:

1. Lee qué paquetes aparecen en el conflicto.
2. Comprueba que tu versión de Node.js sea compatible.
3. Verifica que no hayas modificado accidentalmente `package.json` o `package-lock.json`.
4. Consulta con el equipo antes de cambiar versiones.

No elimines `package-lock.json` ni actualices dependencias sin revisar el impacto sobre el proyecto.

### 10.8. PowerShell bloquea la ejecución de `npm.ps1`

Si PowerShell informa que la ejecución de scripts está deshabilitada, puedes utilizar Símbolo del sistema o Git Bash.

También puedes invocar el ejecutable de Windows explícitamente:

```bash
npm.cmd i
npx.cmd ng serve
```

Evita cambiar políticas de seguridad del sistema sin comprender su alcance, especialmente en equipos administrados.

---

## 11. Inicio rápido

Si ya tienes Git, Node.js compatible y npm instalados:

```bash
# 1. Clonar el repositorio
git clone [https://github.com/danielamaya503/EcoMercadito-frotend.git](https://github.com/danielamaya503/EcoMercadito-frotend.git)

# 2. Entrar a la aplicación Angular
cd EcoMercadito-frotend/eco-mercadito

# 3. Instalar las dependencias
npm i

# 4. Iniciar el servidor de desarrollo
npx ng serve --open
```

Antes de utilizar funcionalidades que dependan de una API, revisa la configuración en `src/environments` y comprueba que el backend esté disponible.

Para las siguientes ejecuciones, abre una terminal dentro de `eco-mercadito` y ejecuta:

```bash
npx ng serve
```

---

## Documentación de referencia

- Angular: https://angular.dev/
- Configuración local: https://angular.dev/tools/cli/setup-local
- Compatibilidad de versiones: https://angular.dev/reference/versions
- Configuración de entornos: https://angular.dev/tools/cli/environments
- Node.js: https://nodejs.org/
- Git: https://git-scm.com/
