'use strict';

module.exports = function(grunt) {	
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['*.js','test/*.js'],
		},
		mocha_istanbul: {
			coverage: {
				src: 'test',
				options: {
					mask: '*.spec.js'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-istanbul');
	
	grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
	grunt.registerTask('test', ['jshint', 'coverage']);
	grunt.registerTask('default', ['test']);
};