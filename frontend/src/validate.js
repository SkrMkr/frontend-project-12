import * as yup from 'yup';

const shemas = {
  schemaChannelName: (channelsName) => yup.object().shape({
    nameChannel: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsName, 'Должно быть уникальным'),
  }),
  signUp: () => yup.object().shape({
    username: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup
      .string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    passwordConfirm: yup
      .string()
      .required('Обязательное поле')
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  }),
};

export default (shemaName) => shemas[shemaName];
