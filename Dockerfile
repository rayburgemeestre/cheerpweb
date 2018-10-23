FROM ubuntu:17.10

MAINTAINER Ray Burgemeestre

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:leaningtech-dev/cheerp-ppa && \
    apt-get update
    
RUN apt-get -y install cheerp-core

RUN apt-get -y install python3-pip

RUN mkdir /mnt/work

COPY Pipfile /mnt/work/

WORKDIR /mnt/work

RUN LC_ALL=C.UTF-8 LANG=C.UTF-8 python3 -m pip install pipenv && \
    LC_ALL=C.UTF-8 LANG=C.UTF-8 python3 -m pipenv install

EXPOSE 5000
COPY api.py /mnt/work/
CMD LC_ALL=C.UTF-8 LANG=C.UTF-8 python3 -m pipenv run python api.py

