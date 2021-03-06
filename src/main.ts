#! /usr/bin/env node

//
// Copyright 2016-present by Pouya Kary <kary@gnu.org> All rights reserved
//

//
// ─── INCLUDES ───────────────────────────────────────────────────────────────────
//

    import themeX   = require('./themeX')
    import loader   = require('./loader')
    import builder  = require('./buildcore')
    import CLITest  = require('./cli-test')
    import size     = require('window-size')

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    // starting the software here...
    main( )

    /** Where the software starts. main basically acts as an arg switcher. */
    function main ( ) {
        let args = process.argv.slice( 2 )
        if ( args.length === 0 )
            if ( process.cwd( ).toLowerCase( ).endsWith( '.themex' ) )
                buildCWD( )
            else
                showHelp( )

        else if ( args.length === 1 )
            if ( args[ 0 ].toLowerCase( ).endsWith( '.themex' ) )
                buildByFile( args[ 0 ] )
            else if ( args[ 0 ] === 'test' )
                process.exit( CLITest( ) )
            else
                showHelp( )

        else
            showHelp( )
    }

//
// ─── BUILD WITH CWD ─────────────────────────────────────────────────────────────
//

    function buildCWD ( ) {
        buildByFile( process.cwd( ) );
    }

//
// ─── BUILD BY FILE ──────────────────────────────────────────────────────────────
//

    function buildByFile ( file: string ): boolean {
        printTitle( )
        const bundle = loader.loadProjectByFile( file )
        return builder( bundle, file )
    }

//
// ─── BUILD ──────────────────────────────────────────────────────────────────────
//

    function build ( bundle: themeX.IBundle.base ) {
        themeX.report( "hello world" )
    }

//
// ─── PRINT TITLE ────────────────────────────────────────────────────────────────
//

    function printTitle ( ) {
        printHorizontalLine( )

        let spacings = ''
        for ( let index = 0; index < Math.floor( size.width / 2 ) - 4; index++ )
            spacings += '•'

        spacings = spacings.rainbow

        console.log( `${ spacings } themeX ${ spacings }` )

        printHorizontalLine( )
        console.log('')
    }

//
// ─── PRINTING HORIZONTAL LINE ───────────────────────────────────────────────────
//

    function printHorizontalLine ( ) {
        let line = ''
        for ( let index = 0; index < size.width; index++ )
            line += '\u2500'
        console.log( line.cyan )
    }

//
// ─── HELP ───────────────────────────────────────────────────────────────────────
//

    function showHelp ( ) {
        console.log(
            "\n" +
            "  ┌─── themeX ─────────────────────────────────────────────┐\n" +
            "  │                                                        │\n" +
            "  │  themeX provides a simple universal definition for     │\n" +
            "  │  IDE/editor color schemes. To use it please read the   │\n" +
            "  │  documentation from:                                   │\n" +
            "  │  https://github.com/karyfoundation/themeX/wiki         │\n" +
            "  │                                                        │\n" +
            "  └────────────────────────────────────────────────────────┘\n"
        )
    }

// ────────────────────────────────────────────────────────────────────────────────