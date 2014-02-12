/*global module:true */
module.exports = function (grunt) {
    'use strict';

    /* PATH CONFIGURATION */
    /* Change these paths to change the structure of your project. */
    var JS_PATH = 'js/',
        REPORTS_PATH = 'reports/',
        // COVERAGE_REPORT_PATH = REPORTS_PATH + 'coverage/',
        MODULES_PATH = JS_PATH + 'modules/',
        ROOT_MODULE = 'app',
        TESTS_PATH = JS_PATH + 'tests/',
        SPEC_SUFFIX = '-spec.js',
        SASS_PATH = 'scss/',
        ROOT_SASS_FILE = SASS_PATH + 'styles.scss',
        JQUERY_PATH = MODULES_PATH + 'jquery.js',

        /* Content Directory */
        CONTENT_PATH = '../dist/',
        CONTENT_CSS_PATH = CONTENT_PATH + 'css/',
        CONTENT_JS_PATH = CONTENT_PATH + 'js/',

        /* Bundle Names */
        JAVASCRIPT_BUNDLE = CONTENT_JS_PATH + 'modules/' + ROOT_MODULE + '.js', /* Replace root */
        CSS_BUNDLE = CONTENT_CSS_PATH + 'styles.css',

        /* All Concerns  */
        ALL_JAVASCRIPT = JS_PATH + '**/*.js',
        ALL_HTC = JS_PATH + '**/*.htc',
        ALL_MODULES = MODULES_PATH + '**/*.js',
        ALL_SPECS = TESTS_PATH + '**/*' + SPEC_SUFFIX,
        ALL_TEST_CONTENT = TESTS_PATH + '**',
        ALL_SASS = SASS_PATH + '**/*.scss',
        ALL_CSS = CONTENT_CSS_PATH + '**',
        ALL_REPORTS = REPORTS_PATH + '**',
        SASS_FILE_MAP = {};
        // NON_ROOT_AND_THIRD_PARTY_JAVASCRIPT = [
        //     ALL_MODULES,
        //     '!' + MODULES_PATH + ROOT_MODULE + '.js',
        //     '!' + JQUERY_PATH
        // ];

    /* Sass File Map. Maps input SASS to output CSS. Add more mappings as needed. */
    SASS_FILE_MAP[CSS_BUNDLE] = ROOT_SASS_FILE;

    /* GRUNT PLUGIN CONFIGURATION */
    grunt.initConfig({
        /* JSHINT */
        /* See http://is.gd/jshintopts for more options */
        jshint: { /* Lint the Gruntfile, all modules and specs except JQuery. */
            all: [
                'Gruntfile.js',
                ALL_MODULES,
                ALL_SPECS,
                '!' + JQUERY_PATH
            ],
            options: {
                bitwise: false,
                browser: true,
                curly: true,
                eqeqeq: true,
                es3: true, /* Assume site must work in IE6/7/8. */
                forin: true,
                globals: { /* Require and Jasmine's Globals. Note that $ is not permitted. */
                    'requirejs': false, /* Require */
                    'require': false,
                    'define': false,
                    'describe': false, /* Jasmine */
                    'xdescribe': false,
                    'it': false,
                    'xit': false,
                    'beforeEach': false,
                    'afterEach': false,
                    'jasmine': false,
                    'spyOn': false,
                    'expect': false,
                    'waitsFor': false
                },
                immed: true,
                indent: 4,
                jquery: true,
                latedef: true,
                maxdepth: 2,
                newcap: true,
                noarg: true,
                noempty: false,
                onevar: true,
                plusplus: false,
                quotmark: 'single', /* Use backslashes if they\'re needed. */
                regexp: false,
                regexdash: true,
                strict: true, /* Use one 'use strict'; per file. */
                trailing: true, /* Turn 'show whitespace' on in your editor. */
                undef: true,
                unused: true
            }
        },

        /* FILE CONCATINATION */
        concat: {},

        /* SASS COMPILATION */
        sass: {
            local: {
                options: {
                    style: 'expanded'
                },
                files: SASS_FILE_MAP
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: SASS_FILE_MAP
            }
        },

        /* CLEAN */
        clean: {
            options: {
                force: true /* Need force to clean beyond current working dir */
            },
            js: {
                src: [
                    CONTENT_JS_PATH + '**/*'
                ]
            },
            css: {
                src: [
                    ALL_CSS
                ]
            },
            reports: {
                src: [
                    ALL_REPORTS
                ]
            }
        },

        /* COPY */
        /* Note: Copy retains the relative path that files were found on. */
        copy: {
            js: {
                src: [ALL_JAVASCRIPT, ALL_HTC, '!' + ALL_TEST_CONTENT], /* Don't copy tests or reports. */
                dest: CONTENT_PATH
            },
            libraries: {  // and supporting libraries
                src: [JS_PATH + 'require.js',
                        JS_PATH + '/libs/*'],
                dest: CONTENT_PATH
            },
            images: {
                src: ['images/**/*'],
                dest: CONTENT_PATH
            }
        },

        /* ASSEMBLE */
        assemble: {
            options: {
                assets: 'assets',
                partials: ['partials/**/*.hbs'],
                layout: ['layouts/default.hbs'],
                data: ['data/*.{json,yml}']
            },
            pages: {
                expand: true,
                cwd: 'pages',
                src: ['*.hbs'],
                dest: CONTENT_PATH
            }
        },

        /* REQUIREJS BUNDLING */
        /* See http://is.gd/rjsopts for more options */
        requirejs: {
            compile: {
                options: {
                    baseUrl: MODULES_PATH,
                    name: ROOT_MODULE,
                    out: JAVASCRIPT_BUNDLE,
                    optimize: 'uglify' /* Pick uglify, uglify2 or 'none' */
                }
            }
        },

        /* WATCH */
        watch: {
            files: [ALL_SASS, ALL_JAVASCRIPT, '**/*.{hbs,json,yml,md}'],
            tasks: ['default']
        }

        /* JASMINE */
        /* See http://pivotal.github.io/jasmine/ for a full guide. */
        // jasmine: {
        //     test: {
        //         options: {
        //             specs: ALL_SPECS,
        //             template: require('grunt-template-jasmine-requirejs'),
        //             templateOptions: {
        //                 requireConfig: {
        //                     baseUrl: MODULES_PATH
        //                 }
        //             }
        //         }
        //     },
        //     coverage: {
        //         src: NON_ROOT_AND_THIRD_PARTY_JAVASCRIPT,
        //         options: {
        //             specs: ALL_SPECS,
        //             vendor: [JS_PATH + 'require.js'],
        //             template: require('grunt-template-jasmine-istanbul'),
        //             templateOptions: {
        //                 coverage: COVERAGE_REPORT_PATH + 'coverage.json',
        //                 report: {
        //                     type: 'lcov',
        //                     options: {
        //                         dir: COVERAGE_REPORT_PATH + 'lcov'
        //                     }
        //                 },
        //                 thresholds: {
        //                     lines: 0,
        //                     statements: 0,
        //                     branches: 0,
        //                     functions: 0
        //                 }
        //             }
        //         }
        //     }
        // }
    });

    /* LOAD PLUGINS */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('assemble');

    /* TARGET TASKS */
    grunt.registerTask('local-html', ['assemble']);
    grunt.registerTask('build-html', ['assemble']);

    grunt.registerTask('local-js', ['jshint', 'clean:js', 'copy:js', 'copy:images']);
    grunt.registerTask('build-js', ['jshint', 'clean:reports', 'clean:js',
                                    'copy:libraries', 'copy:images', 'requirejs', 'jasmine:coverage']);

    grunt.registerTask('local-css', ['clean:css', 'sass:local']);
    grunt.registerTask('build-css', ['clean:css', 'sass:build']);

    /* TARGETS */
    grunt.registerTask('local', ['local-html', 'local-js', 'local-css']);
    grunt.registerTask('build', ['build-html', 'build-js', 'build-css']);
    grunt.registerTask('default', ['local']);
};
