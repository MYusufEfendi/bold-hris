import { useEffect } from 'react';
import { formErrors } from '../utils/errors';

export const useFormError = () => {
  useEffect(() => {
    const errors = (window as unknown as { formErrors?: Record<string, string> }).formErrors;
    if (errors) {
      formErrors.current = errors;
    }
  }, []);
};
