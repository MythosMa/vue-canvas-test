export BUILD_IMG_TAG=0.0.1

sh .docker/check-docker.sh

yarn install
yarn build

cp .docker/Dockerfile ./

docker buildx build \
   --platform=linux/amd64 \
   --tag mythosma/vue-fabric:$BUILD_IMG_TAG \
   --push -t mythosma/vue-fabric:$BUILD_IMG_TAG .

rm -f Dockerfile
rm -rf dist

