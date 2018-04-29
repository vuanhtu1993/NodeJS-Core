## Requirement
### Overview {#sec-1}
----------

You need to build a backend that provide the functionality for your
Medium clone called LION.

Your user will be able to:

1.  Register for a new account
2.  Create a new articles
3.  Add comment on a articles
4.  Like an articles
5.  Add Tag to article

Based on the API Spec write that API Service using the dependencies
below (may not needed):

-   expressjs - The server for handling and routing HTTP requests
-   express-jwt - Middleware for validating JWTs for authentication
-   jsonwebtoken - For generating JWTs used by authentication
-   mongoose - For modeling and mapping MongoDB data to javascript
-   mongoose-unique-validator - For handling unique validation errors in
    Mongoose. Mongoose only handles validation at the document level, so
    a unique index across a collection will throw an exception at the
    driver level. The mongoose-unique-validator plugin helps us by
    formatting the error like a normal mongoose ValidationError.
-   passport - For handling user authentication
-   slug - For encoding titles into a URL-friendly format

2 Passing Criteria {#sec-2}
------------------

-   Must write API Test script for each Endpoint

3 API Spec {#sec-3}
----------

Make sure to handle CORS and return correct Access-Control-Allow-Origin

### 3.1 Authentication Header: {#sec-3-1}

``` {.src .src-js}
Authorization: Token jwt.token.here
```

### 3.2 JSON Objects returned by API {#sec-3-2}

Make sure the right content type like Content-Type: application/json;
charset=utf-8 is correctly returned.

#### 3.2.1 Users (for authentication) {#sec-3-2-1}

``` {.src .src-json}
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
}
```

#### 3.2.2 Single Article {#sec-3-2-2}

``` {.src .src-json}
{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

#### 3.2.3 Multiple Articles {#sec-3-2-3}

``` {.src .src-json}
{
  "articles":[{
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }, {

    "slug": "how-to-train-your-dragon-2",
    "title": "How to train your dragon 2",
    "description": "So toothless",
    "body": "It a dragon",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }],
  "articlesCount": 2
}
```

#### 3.2.4 Single Comment {#sec-3-2-4}

``` {.src .src-json}
{
  "comment": {
    "id": 1,
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:22:56.637Z",
    "body": "It takes a Jacobian",
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

#### 3.2.5 Multiple Comments {#sec-3-2-5}

``` {.src .src-json}
{
  "comments": [{
    "id": 1,
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:22:56.637Z",
    "body": "It takes a Jacobian",
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }]
}
```

#### 3.2.6 List of Tags {#sec-3-2-6}

``` {.src .src-json}
{
  "tags": [
    "reactjs",
    "angularjs"
  ]
}
```

### 3.3 Errors and Status Codes {#sec-3-3}

If a request fails any validations, expect a 422 and errors in the
following format:

``` {.src .src-json}
{
  "errors":{
    "body": [
      "reason, can't be empty"
    ]
  }
}
```

**Other status codes**: 401 for Unauthorized requests, when a request
requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user
doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill
the request

### 3.4 Endpoints: {#sec-3-4}

#### 3.4.1 Authentication: {#sec-3-4-1}

``` {.example}
POST /api/users/login
```

Example request body:

``` {.src .src-json}
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a User

Required fields: email, password

#### 3.4.2 Registration: {#sec-3-4-2}

``` {.example}
POST /api/users
```

Example request body:

``` {.src .src-json}
{
  "user":{
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a User

Required fields: email, username, password

#### 3.4.3 Get Current User {#sec-3-4-3}

``` {.example}
GET /api/user
```

Authentication required, returns a User that's the current user

#### 3.4.4 Update User {#sec-3-4-4}

``` {.src .src-js}
PUT /api/user
```

Example request body:

``` {.src .src-json}
{
  "user":{
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```

Authentication required, returns the User

Accepted fields: email, username, password, image, bio

#### 3.4.5 List Articles {#sec-3-4-5}

``` {.example}
GET /api/articles
```

Returns most recent articles globally by default, provide tag, author or
favorited query parameter to filter results

Query Parameters:

Filter by tag:

``` {.example}
?tag=AngularJS
```

Filter by author:

``` {.example}
?author=jake
```

Favorited by user:

``` {.example}
?favorited=jake
```

Limit number of articles (default is 20):

``` {.example}
?limit=20
```

Offset/skip number of articles (default is 0):

``` {.example}
?offset=0
```

Authentication optional, will return multiple articles, ordered by most
recent first

#### 3.4.6 Feed Articles {#sec-3-4-6}

``` {.example}
GET /api/articles/feed
```

Can also take limit and offset query parameters like List Articles

Authentication required, will return multiple articles created by
followed users, ordered by most recent first.

#### 3.4.7 Get Article {#sec-3-4-7}

``` {.example}
GET /api/articles/:slug
```

No authentication required, will return single article

#### 3.4.8 Create Article {#sec-3-4-8}

``` {.example}
POST /api/articles
```

Example request body:

``` {.src .src-json}
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```

Authentication required, will return an Article

Required fields: title, description, body

Optional fields: tagList as an array of Strings

#### 3.4.9 Update Article {#sec-3-4-9}

``` {.example}
PUT /api/articles/:slug
```

Example request body:

``` {.src .src-json}
{
  "article": {
    "title": "Did you train your dragon?"
  }
}
```

Authentication required, returns the updated Article

Optional fields: title, description, body

The slug also gets updated when the title is changed

#### 3.4.10 Delete Article {#sec-3-4-10}

``` {.example}
DELETE /api/articles/:slug
```

Authentication required

#### 3.4.11 Add Comments to an Article {#sec-3-4-11}

``` {.example}
POST /api/articles/:slug/comments
```

Example request body:

``` {.src .src-json}
{
  "comment": {
    "body": "His name was my name too."
  }
}
```

Authentication required, returns the created Comment

Required field: body

#### 3.4.12 Get Comments from an Article {#sec-3-4-12}

``` {.example}
GET /api/articles/:slug/comments
```

Authentication optional, returns multiple comments

#### 3.4.13 Delete Comment {#sec-3-4-13}

``` {.example}
DELETE /api/articles/:slug/comments/:id
```

Authentication required

#### 3.4.14 Favorite Article {#sec-3-4-14}

``` {.example}
POST /api/articles/:slug/favorite
```

Authentication required, returns the Article

No additional parameters required

#### 3.4.15 Unfavorite Article {#sec-3-4-15}

``` {.example}
DELETE /api/articles/:slug/favorite
```

Authentication required, returns the Article

No additional parameters required

#### 3.4.16 Get Tags {#sec-3-4-16}

``` {.example}
GET /api/tags
```

## Doing
### Step 1: Create user table
1. Install mongoose 
2. Create user table
3. Create config file
4. Config babel package.json
```json
"scripts": {
    "build": "babel app -s -D -d dist",
    "start": "nodemon --exec babel-node app/server.js",
    "prestart": "npm run -s build"
  },
  "babel": {
    "presets": [
      "env"
    ]
  },
```