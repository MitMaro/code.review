'use strict';

var pad = require('pad');
var chalk = require('chalk');
var help = require('./helpers/help');

var ADDITIONAL_PADDING = 4;

module.exports = function registerHelpTask(gulp, plugins) {
	gulp.task('help', function helpTask() {
		var tasks = help.getTasks();
		var taskNames = help.getTaskNames();
		var taskArguments = help.getArguments();
		var colOnePad = help.getMaxNameLength();

		// limit to atleast 15 characters for "description"
		if (colOnePad < 15) {
			colOnePad = 15;
		}
		colOnePad += ADDITIONAL_PADDING;

		// print header
		plugins.util.log();
		plugins.util.log(chalk.cyan.bold('Code Review Build System Help'));
		plugins.util.log(chalk.gray('usage: ') + chalk.blue('gulp ') + '<' + wrapTask('task') + '> <' + wrapArgument('arguments') + '>');

		// print task list
		plugins.util.log();
		plugins.util.log(chalk.green.underline('Tasks List'));
		plugins.util.log(taskNames.map(wrapTask).join(', '));

		// print arguments list
		plugins.util.log();
		plugins.util.log(chalk.green.underline('Arguments List'));
		taskArguments.forEach(function argumentsForEach(arg) {
			var out = wrapArgument(pad('--' + arg.name, colOnePad)) + chalk.white(arg.description);
			
			if (arg.defaultValue) {
				out += chalk.cyan(' [Default: ') + chalk.yellow(arg.defaultValue) + chalk.cyan(']');
			}
			plugins.util.log(out);
		});
		plugins.util.log();

		// print tasks details
		plugins.util.log();
		plugins.util.log(chalk.green.underline('Tasks Details'));
		tasks.forEach(function tasksForEach(task) {
			var dependenciesList;
			var argumentsList;

			plugins.util.log(wrapTask(pad(task.name, colOnePad)) + chalk.white(task.description));

			if (task.dependencies.length) {
				dependenciesList = task.dependencies.map(wrapTask).join(', ');
				plugins.util.log(chalk.green.dim(pad(colOnePad, 'Dependencies: ')) + dependenciesList);
			}

			if (task.arguments.length) {
				argumentsList = task.arguments.map(wrapArgument).join(', ');
				plugins.util.log(chalk.green.dim(pad(colOnePad, 'Arguments: ')) + argumentsList);
			}
			plugins.util.log();
		});
	});

	function wrapTask(task) {
		return chalk.yellow(task);
	}

	function wrapArgument(arg) {
		return chalk.magenta.bold(arg);
	}
};
