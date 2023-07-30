# Wed de noticias colaborativas.

Implementar una API que permita gestionar noticias colaborativas, estilo reddit o menéame, donde los usuarios puedan registrarse y publicar una noticia en una serie de categorías temáticas fijas.

## Base de datos

### users

| Campo            | Tipo         | Descripción                                |
| ---------------- | ------------ | -------------------------------------------|
| id               | CHAR(36)     | Identificador único del usuario            |
| email            | VARCHAR(100) | Correo electrónico del usuario             |
| password         | VARCHAR(100) | Contraseña del usuario (hash)              |
| firstName        | VARCHAR(50)  | Nombre del usuario                         |
| lastName         | VARCHAR(100) | Apellidos del usuario                      |
| biography        | TEXT         | Biogradía del usuario                      |
| photo            | VARCHAR(200) | Foto del usuario                           |
| createdAt        | DATETIME     | Fecha y hora de creación del usuario       |

### news

| Campo     | Tipo         | Descripción                            |
| --------- | ------------ | -------------------------------------- |
| id        | VARCHAR(36)  | Identificador único de la entrada      |
| title     | VARCHAR(100) | Nombre del usuario                     |
| photo     | VARCHAR(200) | Foto de la noticia                     |
| intro     | VARCHAR(100) | Entradilla de la noticia               |
| text      | TEXT         | Texto de la noticia                    |
| itemNews  | VARCHAR(100) | Tema de la noticia                     |
| createdAt | DATETIME     | Fecha de creación de la noticia        |
| userId    | VARCHAR(36)  | Identidicador del usuario              |

### votes

| Campo     | Tipo        | Descripción                                     |
| --------- | ----------- | ----------------------------------------------- |
| id        | VARCHAR(36) | Identificador único de la entrada               |
| votesTipe | ENUM        | Registrar si el voto es "positivo" o "negativo" |
| newsId    | VARCHAR(36) | Identidicador de la noticia                     |
| usersId   | VARCHAR(36) | Identidicador del usuario                       |
| createdAt | DATETIME    | Fecha de creación del voto                      |

## Endpoints del usuario ✅

-   **POST** - [`/users/register`] - Crea un nuevo usuario. 
-   **POST** - [`/users/login`] - Logea a un usuario. 
-   **PUT** - [`/users/:userId`] - Permite acceder al perfil público de un usuario. 
-   **PUT** - [`/users/photo`] - Permite actualizar la foto del usuario.
-   **GET** - [`/users`] - Retorna información privada del usuario con el id del token.

## Endpoints de las noticias✅

-   **POST** - [`/news`] - Permite añadir una noticia. 
-   **GET** - [`/news/:newsId`] - Retorna información de una noticia. 
-   **POST** - [`/news/:newsId/photo`] - Añadir una foto a una noticia. 
-   **POST** - [`/news/:newsId/votes`] - Votar una noticia positivamente o negativamente. 




