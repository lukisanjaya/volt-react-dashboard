Berikut adalah hasil ubahan dari data yang kamu berikan menjadi format **`task.md`** yang rapi dan mudah dibaca:

---

````markdown
# DummyJSON API Tasks

## 1. Login

**Request**
```http
POST https://dummyjson.com/auth/login
Content-Type: application/json
````

**Body**

```json
{
  "username": "emilys",
  "password": "emilyspass"
}
```

---

## 2. Refresh Token

**Request**

```http
POST https://dummyjson.com/auth/refresh
Content-Type: application/json
```

**Body**

```json
{
  "refreshToken": "{{$Login.response.body.accessToken}}"
}
```

---

## 3. Get Products

**Request**

```http
GET https://dummyjson.com/products?limit=30&skip=0&sort=title&order=asc&q=mascara
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NjI1OTM1MjQsImV4cCI6MTc2MjU5NzEyNH0.d27XgOunGDazDABYvhpDsHzpVcz4WRjTm855XGjnfqY
```

**Response (200)**

```json
{
  "products": [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 10.48,
      "rating": 2.56,
      "stock": 99,
      "tags": ["beauty", "mascara"],
      "brand": "Essence",
      "sku": "BEA-ESS-ESS-001",
      "weight": 4,
      "dimensions": {
        "width": 15.14,
        "height": 13.08,
        "depth": 22.99
      },
      "warrantyInformation": "1 week warranty",
      "shippingInformation": "Ships in 3-5 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 3,
          "comment": "Would not recommend!",
          "reviewerName": "Eleanor Collins"
        },
        {
          "rating": 4,
          "comment": "Very satisfied!",
          "reviewerName": "Lucas Gordon"
        },
        {
          "rating": 5,
          "comment": "Highly impressed!",
          "reviewerName": "Eleanor Collins"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 48,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "5784719087687",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 30
}
```

---

## 4. Get Product by ID

**Request**

```http
GET https://dummyjson.com/products/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NjI1OTM1MjQsImV4cCI6MTc2MjU5NzEyNH0.d27XgOunGDazDABYvhpDsHzpVcz4WRjTm855XGjnfqY
```

**Response (200)**
(Sama dengan detail produk di atas.)

---

## 5. Get Authenticated User

**Request**

```http
GET https://dummyjson.com/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NjI1OTM1MjQsImV4cCI6MTc2MjU5NzEyNH0.d27XgOunGDazDABYvhpDsHzpVcz4WRjTm855XGjnfqY
```

**Response (200)**

```json
{
  "id": 1,
  "firstName": "Emily",
  "lastName": "Johnson",
  "maidenName": "Smith",
  "age": 28,
  "gender": "female",
  "email": "emily.johnson@x.dummyjson.com",
  "phone": "+81 965-431-3024",
  "username": "emilys",
  "password": "emilyspass",
  "birthDate": "1996-5-30",
  "image": "https://dummyjson.com/icon/emilys/128",
  "bloodGroup": "O-",
  "height": 193.24,
  "weight": 63.16,
  "eyeColor": "Green",
  "hair": {
    "color": "Brown",
    "type": "Curly"
  },
  "address": {
    "address": "626 Main Street",
    "city": "Phoenix",
    "state": "Mississippi",
    "postalCode": "29112",
    "country": "United States"
  },
  "company": {
    "department": "Engineering",
    "name": "Dooley, Kozey and Cronin",
    "title": "Sales Manager"
  },
  "crypto": {
    "coin": "Bitcoin",
    "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
    "network": "Ethereum (ERC20)"
  },
  "role": "admin"
}
```