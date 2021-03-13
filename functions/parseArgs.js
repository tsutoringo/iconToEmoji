module.exports = function (args) {
	const result = {
		args: [],
		options: [],
		parameters: {}
	}
	for (const i in args) {
		const arg = args[i];
		if (arg.startsWith("--")) {
			result.options.push(arg.replace("--",""))
		} else if (arg.startsWith("-")) {
			result.parameters[arg.replace("-","")] = args[+i+1];
		}　else if (args[i-1] == null || (!args[i-1].startsWith("-") || args[i-1].startsWith("--"))) {
			result.args.push(arg);
		}
	}
	return result;
}