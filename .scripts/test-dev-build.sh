# this script is used to test the package dev build

npm pack && tar -xf bspk-ui*.tgz package && rm -rf ../bspk-ui-dev &&  mkdir -p ../bspk-ui-dev && mv -v package/* ../bspk-ui-dev/
