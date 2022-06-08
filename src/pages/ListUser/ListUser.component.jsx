/* ---- Library Imports ---- */
import React, { useState, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

/* ---- Components Imports ---- */
import Pagination from "../../components/Pagination/Pagination.component";
import Table from "../../components/Table/Table.component";
import TextSearch from "../../components/TextSearch/TextSearch.component";
import FormOperation from "./components/FormUser/FormUser.component";
import Loader from "../../components/Loader/Loader.component";
import ToasterMessage, {
    toast,
} from "../../components/ToasterMessage/ToasterMessage.component";
import SessionExpired from "../../components/SessionExpired/SessionExpired.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import usePagesData from "../../hooks/usePagesData.hook";
import { search, column } from "./const/tableProps.const";
import { AuthContext } from "../../context/AuthProvider.context";
import UserServices from "../../services/user.services";

function Operations() {
    // Global State
    const [, dispatch] = useContext(AuthContext);

    const userServices = new UserServices(dispatch, toast);

    const { data, isSuccess, isError } = useQuery(
        ["getUsers", userServices],
        async () => {
            const { queryData: users } = await userServices.getUser();
            const newUsers = [];
            users.map((user) =>
                newUsers.push({
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                })
            );
            return { newUsers };
        }
    );

    userServices.queryClient = useQueryClient();

    const [openForm, setOpenForm] = useState(false);
    const [update, setUpdate] = useState({ is: false, row: {} });

    const action = [
        {
            icon: "fa-solid fa-delete-left",
            onClick: async (row) => {
                const { id } = row;
                const toastId = toast.loading("Eliminando");
                await userServices.deleteUser(id);
                toast.dismiss(toastId);
            },
            class: "delete",
        },
        {
            icon: "fa-solid fa-square-pen",
            onClick: (row) => {
                setUpdate({ is: true, row });
                setOpenForm(true);
            },
            class: "update",
        },
    ];

    const [pagesData, totalItems, currentPage, setCurrentPage, setSearch] =
        usePagesData(data?.newUsers, 10, search, isSuccess);

    if (isError) {
        return <SessionExpired serverError={true} />;
    }

    return (
        <>
            <ToasterMessage />
            <main className={styles.main}>
                <h1>Usuarios</h1>
                {isSuccess ? (
                    <div className={styles.container}>
                        <div className={styles.actions}>
                            <TextSearch
                                onSearch={(value) => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <div className={styles.containerTable}>
                            <Table
                                header={column}
                                data={pagesData}
                                action={action}
                            />
                        </div>
                        <Pagination
                            totalItems={totalItems}
                            itemsPerPage={15}
                            currentPage={currentPage}
                            setPage={(page) => setCurrentPage(page)}
                        />
                    </div>
                ) : (
                    <Loader />
                )}
            </main>
            <FormOperation
                openForm={openForm}
                setOpenForm={setOpenForm}
                update={update}
                services={userServices}
                toast={toast}
            />
        </>
    );
}

export default Operations;
