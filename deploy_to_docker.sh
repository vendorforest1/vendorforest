docker images

echo "Building the docker image."

#clean up
# To stop the running container
docker stop vendorforest-demov1.0
docker rm vendorforest-demov1.0
docker rmi -f vendorforest/demov1.0 

#build
docker build -t vendorforest/demov1.0 .

echo "Done building image."

echo "Set docker image to run."

docker run --name vendorforest-demov1.0 --expose="$1" -p "$1:$1" -d vendorforest/demov1.0

echo "Image is exposed on port: $1"

docker ps --all

echo "Verify port: "

sudo lsof -i -P -n | grep LISTE

#NODE_ENV=development nodemon dist