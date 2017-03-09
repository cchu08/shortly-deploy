module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      lib: {
        src: ['public/lib/handlebars.js', 'public/lib/jquery.js', 'public/lib/underscore.js', 
              'public/lib/backbone.js'],
        dest: 'public/dist/libBuild.js'
      },
      client: {
        src: ['public/client/app.js', 'public/client/link.js', 'public/client/links.js',
        'public/client/linkView.js', 'public/client/linksView.js', 
        'public/client/createLinkView.js', 'public/client/router.js'],
        dest: 'public/dist/clientBuild.js',
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      lib: {
        src: ['public/dist/libBuild.js'],
        dest: 'public/dist/libAsset.js'
      },
      client: {
        src: ['public/dist/clientBuild.js'],
        dest: 'public/dist/clientAsset.js'
      }

    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/dist/build.js'
      ]
    },

    cssmin: {
      css: {
        src: ['public/*.css'],
        dest: 'public/dist/css.styles.min.css',
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat', 'cssmin', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run('shell');

    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'build', 'test', 'upload'
  ]);


};
