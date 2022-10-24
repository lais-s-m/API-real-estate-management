import * as yup from "yup";

export const createUserSchemaResponse = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().required().default(true),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  id: yup.string().required(),
});
