export function httpErrorHandler(error?: any) {
		if (error && typeof error === "object" && error.message)
			console.error(error.message);
		else if (error)
			console.error(error);
}
