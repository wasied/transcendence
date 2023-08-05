export function treatDbResult(dbResult) {
	var result = [];
	for (const row of dbResult.rows) {
		var session = {};
		row.forEach((value, index) => {
			session[dbResult.names[index]] = value;
		});
		result.push(session);
	}

	return result;
}
