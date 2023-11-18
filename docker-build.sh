result=${PWD##*/}          
result=${result:-/}      

docker build -t $result . && \
docker run -dp 5000:5000 $result