response_data = {
	ok: (values, res, message, fields) => {
		let data = {
			success: true,
			status: 200,
			data: values,
			message,
			fields,
		}
		res.json(data);
		res.end();
	},
	back: (code, values, message) => {
		let data = {
			status: code,
			data: values,
			message,
		}
		return data;
	},
	success: (res, fields) => {
		let data = {
			success: true,
			status: 201,
			data: null,
			message: `Success with empty data`,
			fields
		}
		res.json(data);
		res.end();
	},
	error: (status, message, res, err, fields) => {
		let data = {
			success: false,
			status,
			message,
			err,
			fields
		}
		res.json(data);
		res.end();
	},
	done: (message, res, token) => {
		let data = {
			success: true,
			status: 200,
			message: message,
			token: token
		}
		res.json(data);
		res.end();
	}
}

module.exports = response_data;
