import { url } from "../const/url";
import {
    requestRejected,
    constraintViolated,
} from "../utils/requestRejected.util";

export default class UserServices {
    constructor(dispatch, toast, queryClient) {
        this.url = url;
        this.dispatch = dispatch;
        this.toast = toast;
        this.queryClient = queryClient;
        this.messages = {
            first: "El Correo Electrónico ya se encuentra registrado",
            second: "El Usuario no se puede eliminar",
        };
    }

    async signIn(body) {
        try {
            const request = await fetch(`${this.url}signin`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const queryData = await request.json();

            if (request.ok) {
                return { queryData, success: true };
            } else {
                return { queryData, success: false };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async signUp(body) {
        try {
            const request = await fetch(`${this.url}signup`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const queryData = await request.json();

            if (request.ok) {
                return { queryData, success: true };
            } else {
                constraintViolated(
                    queryData.message,
                    this.toast,
                    this.messages
                );
                return { queryData, success: false };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getUser() {
        try {
            const request = await fetch(`${this.url}user`, {
                method: "GET",
                mode: "cors",
                credentials: "include",
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            const queryData = await request.json();

            if (request.ok) {
                return { queryData, success: true };
            } else {
                return { queryData, success: false };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(id, body) {
        try {
            const request = await fetch(`${this.url}user/${id}`, {
                method: "PUT",
                mode: "cors",
                credentials: "include",
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const queryData = await request.json();

            if (request.ok) {
                this.queryClient.invalidateQueries("getUsers");
                return true;
            } else {
                constraintViolated(
                    queryData.message,
                    this.toast,
                    this.messages
                );
                requestRejected(queryData.message, this.dispatch, this.toast);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(id, body) {
        try {
            const request = await fetch(`${this.url}user/${id}`, {
                method: "DELETE",
                mode: "cors",
                credentials: "include",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const queryData = await request.json();

            if (request.ok) {
                this.queryClient.invalidateQueries("getUsers");
                return true;
            } else {
                constraintViolated(
                    queryData.message,
                    this.toast,
                    this.messages
                );
                requestRejected(queryData.message, this.dispatch, this.toast);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
