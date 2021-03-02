#!/bin/sh

LINES=`find . -name '*.js' | xargs cat | wc -l`
echo "lines of js code: $LINES"