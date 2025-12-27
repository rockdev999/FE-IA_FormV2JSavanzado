Este es el proyecto corriendo:

<img width="582" height="858" alt="image" src="https://github.com/user-attachments/assets/00787c40-8587-4708-93a9-058c5efae8c0" />
<img width="577" height="549" alt="image" src="https://github.com/user-attachments/assets/21acfb19-5619-4a60-82b6-0e865c26c669" />

```
[
    {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "El nombre es obligatorio",
        "path": [
            "name"
        ]
    },
    {
        "code": "too_small",
        "minimum": 3,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "El nombre debe tener al menos 3 caracteres",
        "path": [
            "name"
        ]
    },
    {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "El correo electrónico es obligatorio",
        "path": [
            "email"
        ]
    },
    {
        "validation": "email",
        "code": "invalid_string",
        "message": "Debe ser un correo electrónico válido",
        "path": [
            "email"
        ]
    },
    {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "La contraseña es obligatoria",
        "path": [
            "password"
        ]
    },
    {
        "code": "too_small",
        "minimum": 6,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "La contraseña debe tener al menos 6 caracteres",
        "path": [
            "password"
        ]
    },
    {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "Debes confirmar tu contraseña",
        "path": [
            "confirmPassword"
        ]
    },
    {
        "code": "invalid_type",
        "expected": "number",
        "received": "nan",
        "path": [
            "age"
        ],
        "message": "La edad debe ser un número"
    },
    {
        "code": "custom",
        "message": "Debes aceptar los términos y condiciones",
        "path": [
            "terms"
        ]
    }
]
```

<img width="590" height="844" alt="image" src="https://github.com/user-attachments/assets/2bbef707-07f1-4d16-ad15-d7ef05a32180" />

```
{
    "name": "John Down",
    "email": "john@gmail.com",
    "password": "JohnDown@123",
    "confirmPassword": "JohnDown@123",
    "age": 19,
    "terms": true
}
```
