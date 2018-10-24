docker build -t cheerpweb:latest .
docker login
docker tag cheerpweb:latest rayburgemeestre/cheerpweb:latest
