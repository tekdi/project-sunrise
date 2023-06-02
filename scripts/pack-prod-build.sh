#!/bin/bash
rm -rf prod-build
mkdir prod-build
mkdir prod-build/modules
# find packages \( ! -path packages/common-lib -o ! -path packages/teacher-app \) -type d -exec bash -c '
find packages \( -path "packages/core" -o -path "packages/studentprogram" -o -path "packages/reports" \) -type d -exec bash -c '

for f  do
    # echo $f
    if [ $f != "packages/common-lib" ] &&  [ $f != "packages/teacher-app" ] && [ $f != "packages/student-app" ]; then
        echo "Processing ${f//packages\//}"
        cp -rf "$f/build" "prod-build/modules/${f//packages\//}"
    fi
done 
' sh {} +
cp -r  packages/mylearning/build/* prod-build/
# cp -r  packages/players/* prod-build/
find  prod-build -name  'modules.json' | xargs sed -i 's|http://localhost:[0-9]*||g'
cd prod-build && tar -cf ../shiksha-ui.tar . && cd ../
