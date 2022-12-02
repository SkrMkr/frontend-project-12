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
};

export default (shemaName) => shemas[shemaName];
