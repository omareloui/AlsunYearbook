import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup.string().trim().url().required(),
});
