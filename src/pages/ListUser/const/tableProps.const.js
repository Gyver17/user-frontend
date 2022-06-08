const search = (values, valueSearch) => {
	let expresion = new RegExp(`${valueSearch}.*`, "i");
	return values.filter(
		(value) =>
			expresion.test(value.name) ||
			expresion.test(value.lastName) ||
			expresion.test(value.email)
	);
};

const column = [
	{
		title: "Nombre",
		field: "name",
		type: "string",
	},
	{
		title: "Apellido",
		field: "lastName",
		type: "string",
	},
	{
		title: "email",
		field: "email",
		type: "string",
	},
	{
		title: "Telefono",
		field: "phone",
		type: "string",
	},
];

export { search, column };
