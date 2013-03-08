module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Tasks

    // Custom Tasks

    // Build task
    grunt.registerTask('build', 'Building Documentation', function() {
        grunt.task.run([
        ]);
    });

    // Default task(s).
    grunt.registerTask('default', ['build']);

};
