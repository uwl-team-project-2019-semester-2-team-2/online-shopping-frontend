# GO Mart

## Key Features

User Management  
- Registration  
- Sign in  
- Updating of 
	- Delivery Address  
	- Payment details  
	- Viewing past orders  

Admin Panel  
- Create Read Update Delete of products  
- Viewing automated analytics reports  

Search  
- Filtering  
- Sort order  

Product page  
- Product information  

Ordering  
- Basket management  
- Order process

## Pages

### Landing `/`

Homepage landing, user can access almost all parts of website directly from here. 

### Basket `/basket`

Users can view and edit items in basket from here

### User `/user`

| Endpoint         | Description                                                                              |
|------------------|------------------------------------------------------------------------------------------|
| `/`              | Initial management page with links to child pages                                        |
| `/order-history` | Past orders made by account                                                              |
| `/account`       | Editing of account information, such as changing names, passwords or emails              |
| `/addresses`     | Overview of addresses attached to account with ability to create, modify or delete       |
| `/payment`       | Overview of payment details attached to account with ability to create, modify or delete |

### Search `/search`

| Endpoint | Description                                         |
|----------|-----------------------------------------------------|
| `/`      | Product search, can be modified with URL Parameters |

| URL Parameters | Description                                                                                                          |
|----------------|----------------------------------------------------------------------------------------------------------------------|
| `filter`       | Filter various dietary requirements such as `vegan`, `eggs`, `vegeterian`                                            |
| `count`        | Number of products shown per page                                                                                    |
| `order`        | How the products are ordered by default it's `relevance` but can be price in either `ascending` or `decending` order |
| `page`         | Current page of search results                                                                                       |

### Admin `/admin`

| Endpoint        | Description                                                             |
|-----------------|-------------------------------------------------------------------------|
| `/`             | Admin panel for employees                                               |
| `/product`      | List of products from database                                          |
| `/product/<id>` | Changes to product                                                      |
| `/product/new`  | Creation of new products for database                                   |
| `/report`       | View previous sales analytics reports and request new ones be generated |

### Product Page `/product`

| Endpoint | Description                                             |
|----------|---------------------------------------------------------|
| `/<id>`  | Product page showing relevant pictures and information. |

### Sign in `/signin`

Users can sign in to their accounts

### Register `/register`

Users can register accounts
