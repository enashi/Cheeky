export const dateParser = (num) => {
	let options = { hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "long", day: "numeric", month: "short", year: "numeric" };

	let timestamp = Date.parse(num);

	let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

	return date.toString();
};

export const timestampParser = (num) => {
	let options = { hour: "2-digit", minute: "2-digit", second:"2-digit", weekday: "long", day: "numeric", month: "short", year: "numeric" };

	let date = new Date(num).toLocaleDateString("fr-FR", options);

	return date.toString();
}

export const isEmpty = (value) => {
	return value === undefined
		|| value === null
		|| (typeof value === 'object' && Object.keys(value).length === 0)
		|| (typeof value === 'string' && value.trim().length === 0);
}