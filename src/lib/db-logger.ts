export const logQuery = (query: string, params: unknown[]) => {
	if (process.env.NODE_ENV !== "production") {
		console.log("SQL Query:", query);
		console.log("Parameters:", params);
	}
};
