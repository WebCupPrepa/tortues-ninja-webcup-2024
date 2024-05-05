import { toastType } from "@/components/global/toast/toastType";

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validation = regex.test(email);

  if (!validation) {
    return {
      isValid: false,
      status: toastType.error,
      title: "Format Email non valide",
    };
  }

  return { isValid: true };
}

export function validatePassword(password) {
  const minCharacters = 6;
  const validation = password.length > minCharacters ? true : false;

  if (!validation) {
    return {
      isValid: false,
      status: toastType.error,
      title: "Mot de passe trop faible",
      message: `Le mot de passe doit contenir au minimum ${minCharacters} caractères`,
    };
  }
  return {
    isValid: true,
  };
}
