import { celebrate, Joi } from "celebrate";
import { Types } from "mongoose";

export const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((id, helpers) => {
        if (Types.ObjectId.isValid(id)) {
          return id;
        }
        return helpers.message({ custom: "Необходим валидный id" });
      }),
  }),
});

export const validateUserProfile = celebrate({
  body: Joi.object()
    .keys({
      // eslint-disable-next-line newline-per-chained-call
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'Минимальная длина поля "name" - 2',
        "string.max": 'Максимальная длина поля "name" - 30',
        "string.empty": 'Поле "name" должно быть заполнено',
      }),
      // eslint-disable-next-line newline-per-chained-call
      about: Joi.string().required().min(2).max(200).messages({
        "string.min": 'Минимальная длина поля "about" - 2',
        "string.max": 'Максимальная длина поля "about" - 200',
        "string.empty": 'Поле "about" должно быть заполнено',
      }),
      avatar: Joi.string()
        .required()
        .uri()
        .message('В поле "avatar" необходимо вставить ссылку')
        .messages({
          "string.empty": 'Поле "avatar" должно быть заполнено',
        }),
    })
    .unknown(true),
});

export const validateUserData = celebrate({
  body: Joi.object()
    .keys({
      // eslint-disable-next-line newline-per-chained-call
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'Минимальная длина поля "name" - 2',
        "string.max": 'Максимальная длина поля "name" - 30',
        "string.empty": 'Поле "name" должно быть заполнено',
      }),
      // eslint-disable-next-line newline-per-chained-call
      about: Joi.string().required().min(2).max(200).messages({
        "string.min": 'Минимальная длина поля "about" - 2',
        "string.max": 'Максимальная длина поля "about" - 200',
        "string.empty": 'Поле "about" должно быть заполнено',
      }),
    })
    .unknown(true),
});

export const validateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .uri()
        .message('В поле "avatar" необходимо вставить ссылку')
        .messages({
          "string.empty": 'Поле "avatar" должно быть заполнено',
        }),
    })
    .unknown(true),
});

export const validateNewCard = celebrate({
  body: Joi.object()
    .keys({
      link: Joi.string()
        .required()
        .uri()
        .message("Необходимо вставить ссылку")
        .messages({
          "string.empty": "Поле с ссылкой должно быть заполнено",
        }),
      // eslint-disable-next-line newline-per-chained-call
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'Минимальная длина поля "name" - 2',
        "string.max": 'Максимальная длина поля "name" - 30',
        "string.empty": 'Поле "name" должно быть заполнено',
      }),
    })
    .unknown(true),
});
