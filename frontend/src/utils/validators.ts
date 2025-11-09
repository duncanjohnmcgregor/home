// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 8 chars, at least one letter and one number)
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

// Phone validation
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Required field validation
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Min length validation
export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

// Max length validation
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

// Number validation
export const validateNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && value.trim() !== '';
};

// Positive number validation
export const validatePositiveNumber = (value: string): boolean => {
  return validateNumber(value) && Number(value) > 0;
};
