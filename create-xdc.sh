#!/bin/sh

if [ $# -eq 0 ]
then
    echo "usage: zip-xdc.sh PACKAGE_NAME"
    exit
fi

PACKAGE_NAME=$1

rm $PACKAGE_NAME.xdc 2> /dev/null
zip -9 --recurse-paths $PACKAGE_NAME.xdc * --exclude README.md webxdc.js "*.sh" "*.xdc"

echo "success, archive contents:"
unzip -l $PACKAGE_NAME.xdc
