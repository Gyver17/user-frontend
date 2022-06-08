import { types } from "../context/authReducer.context";

const requestRejected = (code, dispatch, toast) => {
	if (code === "50115" || code === "43292" || code === "50500") {
		dispatch({
			type: types.sessionClose,
		});
	}

	// This Situation Should Not Happen
	if (code === "43097") {
		toast.error("Valores Invalido");
	}
};

const constraintViolated = (message, toast, messages) => {
	if (message === "duplicate") {
		toast.error(messages.first);
	}

};

export { requestRejected, constraintViolated };
