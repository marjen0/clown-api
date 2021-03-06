#!/bin/sh

JAVASCRIPT_LINES=`find . -name '*.js' | xargs cat | wc -l`
JSX_LINES=`find . -name '*.jsx' | xargs cat | wc -l`
TOTAL=$(($JAVASCRIPT_LINES + $JSX_LINES))
echo "lines of javascript code: $JAVASCRIPT_LINES"
echo "lines of jsx code: $JSX_LINES"
echo "total lines of code: $TOTAL"