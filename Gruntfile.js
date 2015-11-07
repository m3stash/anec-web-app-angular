module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    concat: {
  	  options: {
  	    // define a string to put between each file in the concatenated output
  	    separator: ';'
  	  },
  	  dist: {
  	    // the files to concatenate
  	    src: ['WebContent/assets/javascript/**/*.js'],
  	    // the location of the resulting JS file
  	    dest: 'dist/concat.js'
  	  }
  	},
  	wiredep: {
  	  task: {
  	    src: ['WebContent/index.html'],
  	  },
  	  devDependencies: true
  	},
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint','concat','wiredep']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint','concat','wiredep']);

};
