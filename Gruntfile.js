/**
 * Created by paigewalters on 11/12/15.
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },

        copy: {
            app: {
                src: 'client/scripts/adminapp.js',
                dest: 'server/public/assets/scripts/'
            },
            app2: {
                src: 'client/scripts/addAstation.js',
                dest: 'server/public/assets/scripts/'
            },

            bootstrap: {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/css',
                src: [
                    "bootstrap.min.css"
                ],
                dest: "server/public/vendors/"
            },
            jquery: {
                expand: true,
                cwd: 'node_modules/jquery/dist/',
                src: [
                    "jquery.min.js",
                    "jquery.min.js.map"
                ],
                dest: "server/public/vendors/"
            },
            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    "*",
                    "*/*"
                ],
                dest: "server/public/assets/views/"
            },
            style: {
                expand: true,
                cwd: 'client/styles/',
                src: [
                    "*"
                ],
                dest: "server/public/assets/styles/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};