#docker build --no-cache -t cheerp:latest .
docker build -t cheerp:latest .

#docker build -t sc_build_ubuntu:17.10 ./Ubuntu17.10

docker login
docker tag cheerp:latest rayburgemeestre/cheerp:latest
echo docker push rayburgemeestre/cheerp:latest

