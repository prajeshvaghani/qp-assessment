# QP Assessment

Grocery manengment with Express REST API.

## Project setup

```
npm install
```

### Run

```
npm run build
```

```
docker compose up
```

### API Endpoint - ADMIN

```
/sign-up | Method - Post

BODY
{
    name:"",
    email:"",
    password:"",
    userType:"admin || user",
}
```

```
/sign-in |  Method - Post

BODY
{
    email:"",
    password:"",
}
```

```
Url - /products  |  Method - get
```

```
Url - /products |  Method - Post  |authorization -  bearer token

BODY
{
    name:"",
    price:"",
    description:"",
    inventory:"",
}
```

```
Url - /product/:id  |  Method - put  |authorization -  bearer token

BODY
{
    name:"",
    price:"",
    description:"",
    inventory:"",
}
```

```
/product/:id  |  Method - delete |   authorization -  bearer token
```

### API Endpoint - USER

```
Url- /product |  Method - get
```

```
Url - /order |  Method - post  | authorization -  bearer token

BODY
{
    userId:1,
    productId:1
}
```
