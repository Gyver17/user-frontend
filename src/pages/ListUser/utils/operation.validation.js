import * as yup from "yup";
import { expressions } from "../../../const/regularExpressions.const";

const validationScheme = yup.object({
    name: yup
        .string()
        .matches(expressions.name, "Debe introducir un Nombre valido")
        .required("Debe introducir un Nombre"),
    lastName: yup
        .string()
        .matches(expressions.name, "Debe introducir un Apellido valido")
        .required("Debe introducir un Apellido"),
    phone: yup
        .string()
        .required("Debe introducir un Telefono"),
    email: yup
        .string()
        .email("Debe introducir un Correo Electrónico Valido")
        .required("Debe introducir un Correo Electrónico"),
});

export { validationScheme };
