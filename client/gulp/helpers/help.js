'use strict';

var tasks = {};
var taskArguments = {};
var maxNameLength = 0;

module.exports = {
	registerTask: function registerTask(taskName, description, dependecies, args) {
		args = args || [];
		dependecies = dependecies || [];

		dependecies.forEach(function dependeciesForEach(dep) {
			// validate dependency
			if (!tasks[dep]) {
				throw new Error('The dependency, ' + dep + ', is not registered');
			}

			tasks[dep].arguments.forEach(function taskArgumentsForEach(arg) {
				// dedupe
				if (args.indexOf(arg) !== -1) {
					return;
				}
				args.push(arg);
			});
		});

		// validate arguments
		args.forEach(function argsForEach(arg) {
			if (!taskArguments[arg]) {
				throw new Error('The argument, ' + arg + ', is not registered');
			}
		});

		tasks[taskName] = {
			name: taskName,
			description: description,
			arguments: args.sort(),
			dependencies: dependecies.sort()
		};

		if (taskName.length > maxNameLength) {
			maxNameLength = taskName.length;
		}
	},
	registerArgument: function registerArgument(argumentName, description, defaultValue) {
		taskArguments[argumentName] = {
			name: argumentName,
			description: description,
			defaultValue: defaultValue
		};
		if (argumentName.length > maxNameLength) {
			maxNameLength = argumentName.length;
		}
	},
	getMaxNameLength: function getMaxNameLength() {
		return maxNameLength;
	},
	getTasks: function getTasks() {
		// turn tasks object into a task name sorted array
		return Object.keys(tasks).sort().map(function tasksMap(task) {
			return tasks[task];
		});
	},
	getTaskNames: function getTaskNames() {
		// turn tasks object into a task name sorted array
		return Object.keys(tasks).sort();
	},
	getArguments: function getArguments() {
		// turn arguments object into a argument name sorted array
		return Object.keys(taskArguments).sort().map(function argumentsMap(arg) {
			return taskArguments[arg];
		});
	}
};
