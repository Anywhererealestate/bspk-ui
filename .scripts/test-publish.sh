# this script is used to publish the package to a local directory for testing.
# it will build the package, create a tarball, extract it to a directory and link it.
# in the demo app run `npm link @bspk/ui` then `npm run preview`

npm run build && npm pack && tar -xf bspk-ui*.tgz package && cd package && npm link