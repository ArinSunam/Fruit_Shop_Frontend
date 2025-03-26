import * as yup from 'yup'

export const LoginSchema = yup.object({
  email: yup.string().email().required(),
  // password: yup.string().min(8).max(14).required().matches("^(?=.*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\\d).{8,}$", "Password must include at least one special character, one uppercase letter, and one digit.")
})

