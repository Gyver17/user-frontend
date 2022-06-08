/* ---- Library Imports ---- */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* ---- Components Imports ---- */
import ButtonForm from "../../../../components/ButtonForm/ButtonForm.component";
import Modal from "../../../../components/Modal/Modal.component";
import TextForm from "../../../../components/TextForm/TextForm.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import { validationScheme } from "../../utils/operation.validation";

function FormOperation({ openForm, setOpenForm, update, services, toast }) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationScheme),
    });

    useEffect(() => {
        if (update?.is) {
            const { row } = update;
            reset({
                id: row.id,
                name: row.name,
                lastName: row.lastName,
                email: row.email,
                phone: row.phone,
            });
        } else {
            reset({
                id: "",
                name: "",
                lastName: "",
                email: "",
                phone: "",
            });
        }
    }, [reset, update]);

    const onSubmit = async (data) => {
        const newData = {
            name: data.name,
            lastName: data.lastName,
            email: {
                body: data.email.split("@")[0],
                domain: data.email.split("@")[1],
            },
            phone: data.phone,
        };
		console.log(data.id, newData)
        const toastId = toast.loading("Actualizando");
        await services.updateUser(data.id, newData);
        toast.dismiss(toastId);
        reset();
        setOpenForm(false);
    };
    return (
        <>
            <Modal isOpen={openForm} setOpen={setOpenForm}>
                <div className={styles.container}>
                    <h1>Editar Usuario</h1>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={styles.inputs}>
                            <TextForm
                                title="Nombre"
                                type="text"
                                name="name"
                                control={control}
                                error={errors?.name}
                            />
                            <TextForm
                                title="Apellido"
                                name="lastName"
                                control={control}
                                error={errors?.lastName}
                            />
                            <TextForm
                                title="Correo Electrónico"
                                type="text"
                                name="email"
                                control={control}
                                error={errors?.email}
                            />
                            <TextForm
                                title="Telefono"
                                type="text"
                                name="phone"
                                control={control}
                                error={errors?.phone}
                            />
                        </div>
                        <footer>
                            <ButtonForm
                                icon="fa-solid fa-floppy-disk"
                                title="Actualizar"
                            />
                        </footer>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default FormOperation;
