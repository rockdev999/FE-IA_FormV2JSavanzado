const { z } = window.Zod;

const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),
  
  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio" })
    .email({ message: "Debe ser un correo electrónico válido" }),
  
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no puede exceder 50 caracteres" }),
  
  confirmPassword: z
    .string()
    .min(1, { message: "Debes confirmar tu contraseña" }),
  
  age: z
    .number({ invalid_type_error: "La edad debe ser un número" })
    .min(18, { message: "Debes ser mayor de 18 años" })
    .max(100, { message: "Ingresa una edad válida" }),
  
  terms: z
    .boolean()
    .refine(val => val === true, { 
      message: "Debes aceptar los términos y condiciones" 
    })
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

const limpiarErrores = () => {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.textContent = '';
  });
  
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.classList.remove('error', 'success');
  });
  
  const errorsContainer = document.getElementById('errors');
  errorsContainer.classList.remove('show');
  errorsContainer.innerHTML = '';
};

/**
 * @param {Array} errors
 */
const mostrarErroresPorCampo = (errors) => {
  errors.forEach(error => {
    const path = error.path[0];
    const errorElement = document.getElementById(`error-${path}`);
    const inputElement = document.getElementById(path);
    
    if (errorElement) {
      errorElement.textContent = error.message;
    }
    
    if (inputElement) {
      inputElement.classList.add('error');
    }
  });
};

/**
 * @param {Array} errors
 */
const mostrarErroresGlobales = (errors) => {
  const errorsContainer = document.getElementById('errors');
  
  const errorList = errors.map(error => `<li>• ${error.message}</li>`).join('');
  
  errorsContainer.innerHTML = `
    <strong>Por favor, corrige los siguientes errores:</strong>
    <ul>${errorList}</ul>
  `;
  
  errorsContainer.classList.add('show');
};

/**
 * @param {Array} fieldNames
 */
const marcarCamposValidos = (fieldNames) => {
  fieldNames.forEach(fieldName => {
    const inputElement = document.getElementById(fieldName);
    if (inputElement && !inputElement.classList.contains('error')) {
      inputElement.classList.add('success');
    }
  });
};

/**
 * @param {Object} data
 */
const mostrarModalExito = (data) => {
  const modal = document.getElementById('successModal');
  const userData = document.getElementById('userData');
  
  userData.innerHTML = `
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Edad:</strong> ${data.age} años</p>
  `;
  
  modal.style.display = 'block';
};

document.getElementById('registerForm').addEventListener('submit', (event) => {
  event.preventDefault();

  limpiarErrores();
  
  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    age: parseInt(document.getElementById('age').value),
    terms: document.getElementById('terms').checked
  };
  
  try {
    const validatedData = registerSchema.parse(formData);
    
    console.log('Datos validados correctamente:', validatedData);
    
    marcarCamposValidos(['name', 'email', 'password', 'confirmPassword', 'age']);
    
    mostrarModalExito(validatedData);
    
    document.getElementById('registerForm').reset();
    
  } catch (error) {
    console.error('Errores de validación:', error.errors);
    
    mostrarErroresPorCampo(error.errors);
    
    mostrarErroresGlobales(error.errors);
    
    const primerError = document.querySelector('.error-message:not(:empty)');
    if (primerError) {
      primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

const validarCampoIndividual = (fieldName, schema) => {
  const input = document.getElementById(fieldName);
  
  input.addEventListener('blur', () => {
    const errorElement = document.getElementById(`error-${fieldName}`);
    
    try {
      let value = input.value.trim();
      
      if (fieldName === 'age') {
        value = parseInt(value);
      } else if (fieldName === 'terms') {
        value = input.checked;
      }
      
      schema.parse(value);
      
      errorElement.textContent = '';
      input.classList.remove('error');
      input.classList.add('success');
      
    } catch (error) {
      if (error.errors && error.errors.length > 0) {
        errorElement.textContent = error.errors[0].message;
        input.classList.remove('success');
        input.classList.add('error');
      }
    }
  });
};

validarCampoIndividual('name', registerSchema.shape.name);
validarCampoIndividual('email', registerSchema.shape.email);
validarCampoIndividual('password', registerSchema.shape.password);
validarCampoIndividual('age', registerSchema.shape.age);

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('successModal').style.display = 'none';
});

window.addEventListener('click', (event) => {
  const modal = document.getElementById('successModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

const togglePasswordVisibility = (inputId) => {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
};

console.log('Zod cargado correctamente:', typeof z !== 'undefined');
console.log('Esquema de validación creado:', registerSchema);