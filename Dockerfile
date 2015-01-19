FROM    centos:centos7

# Install Development Tools Centos          
RUN		yum groupinstall -y 'Development Tools'

# Define mountable directories.
VOLUME ["/data"]

# Define working directory.
WORKDIR /data

# Download package Rethinkdb 
RUN		wget http://download.rethinkdb.com/centos/6/`uname -m`/rethinkdb.repo \
          -O /etc/yum.repos.d/rethinkdb.repo

# Install Package Dependencies
RUN     yum update && yum install -y \
		epel-release \
		nodejs \
		npm \
		redis \
		rethinkdb

# List Repos 
RUN 	yum repolist

# Bundle app source
COPY . /src

# Install app dependencies
RUN  cd /src; npm install



# Running Database: RethinkDB 
CMD ["rethinkdb", "--bind", "all"]

# Running Database: Redis


# Expose ports.
# Database RethinkDB
#   - 8080: web UI
#   - 28015: process
#   - 29015: cluster
# Database Redis:
#   - 
# Application:
#   - 1111: Developer
#   - 2222: Product

EXPOSE 8080
EXPOSE 28015
EXPOSE 29015
EXPOSE 1111
EXPOSE 2222

# Running Application
CMD ["node", "/src/app.js"]

