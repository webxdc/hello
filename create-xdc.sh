#!/bin/sh

case "$1" in
    "-h" | "--help")
        echo "usage: ${0##*/} [PACKAGE_NAME]"
        exit
        ;;
    "")
        PACKAGE_NAME=${PWD##*/}
        ;;
    *)
        PACKAGE_NAME=$1
        ;;
esac

rm $PACKAGE_NAME.xdc 2> /dev/null
zip -9 --recurse-paths $PACKAGE_NAME.xdc * --exclude README.md webxdc.js "*.sh" "*.xdc"

echo "success, archive contents:"
unzip -l $PACKAGE_NAME.xdc
