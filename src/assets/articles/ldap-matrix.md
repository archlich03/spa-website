# Private communication setup with LDAP and Matrix

## Introduction

Some time ago, I needed to explore how to set up a private communication environment. Convieniently I stumbled upon the [Matrix protocol](https://matrix.org/). This article will provide a method on how to launch a Matrix server (Synapse) and integrate it with LDAP.

## Requirements
This tutorial assumes Debian is used as the distribution of choice. In order to follow this tutorial, you will need:
- A Virtual Private Server (VPS) with root access;
- [Docker compose](https://docs.docker.com/engine/install/debian/#install-using-the-repository).

## Setting up and administrating LDAP

To begin with, we need to decide on what implementation of LDAP we will use. In this case, we will use [OpenLDAP](https://www.openldap.org/) and [PHPLDAPAdmin](https://github.com/leenooks/phpLDAPadmin) for administration respectively.

As per the [OpenLDAP container documentation](https://github.com/osixia/docker-openldap), we need to specify some information. Before we start inserting it, we need to understand a couple of concepts. Firstly, we don't need to use TLS, because we can terminate SSL at NGINX. In addition, even though OpenLDAP is [mostly secure](https://www.cvedetails.com/vendor/439/), it's not recommended to expose it to the live internet. The current set up will work, because all containers can communicate with each other via internal IP addresses. It is also necessary to set up a read-only user, which will be used to read data from LDAP. While the admin user can read and write data, the read-only user can only look at it. And lastly, all containers will be placed in the same network, so that they can communicate with each other. Don't forget to set up the shared network for the containers.
```yaml
openldap:
  image: osixia/openldap:latest
  container_name: openldap
  command: --copy-service
  environment:
  LDAP_BASE_DN: "dc=example,dc=com" # Enter base domain name
  LDAP_ORGANISATION: "Example.com" # Enter Org name
  LDAP_DOMAIN: "Example.com" # Enter domain name
  LDAP_ADMIN_PASSWORD: "password1" # Enter admin password
  LDAP_TLS: "false"
  LDAP_READONLY_USER: "true"
  LDAP_READONLY_USER_USERNAME: reader # Enter read-only user username
  LDAP_READONLY_USER_PASSWORD: "password2" # Enter read-only user password
  volumes:
  - "/srv/ldap/bootstrap.ldif:/container/service/slapd/assets/config/bootstrap/ldif/custom/50-bootstrap.ldif"
  - "/srv/ldap/config:/etc/ldap/slapd.d"
  - "/srv/ldap/data:/var/lib/ldap"
  restart: unless-stopped
  networks:
  - shared_network
```

As per the administration part, [PHPLDAPAdmin (v1) container documentation](https://github.com/leenooks/phpLDAPadmin) doesn't require much additional configuration. The main thing is to make sure that it can connect to the OpenLDAP container via the same network and consistent container name. Even though the software doesn't have [many vulnerabilities](https://www.cvedetails.com/vendor/20973/), **the container should not be exposed to the live internet** as well.

I recommend setting up a wireguard server to securely connect to the server and access the container that way.

```yaml
phpldapadmin:
  image: osixia/phpldapadmin:latest
  container_name: phpldapadmin
  environment:
  PHPLDAPADMIN_LDAP_HOSTS: openldap
  PHPLDAPADMIN_HTTPS: "false"
  networks:
  - shared_network
  restart: unless-stopped
  depends_on:
  - openldap
```

Once the container is running, I made a structure such as presented below. `cn=user` is a value meant to satisfy the GID requirement. And all users are inside of the `ou=people,dc=example,dc=com` Organization Unit. The blurred entries are users, that will have the ability to log in as Matrix users. I recommend adding the Email attribute to them.
![LDAP structure](../images/ldap-matrix-pla1.png)

## Setting up the Matrix server
Now is the time to set up the server, where the communication will be taking place. [Here](https://hub.docker.com/r/matrixdotorg/synapse) you can find detailed set up instructions. Create the configuration file by using an adapted version of this command (change the volume config as necessary):
```bash
docker run -it --rm \
    --mount type=volume,src=synapse-data,dst=/data \
    -e SYNAPSE_SERVER_NAME=my.matrix.host \
    -e SYNAPSE_REPORT_STATS=yes \
    matrixdotorg/synapse:latest generate
```

Feel free to change the [server configuration](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html) as needed. Once that's done, we need modify the configuration file to insert the LDAP authentication module. In this case, we'll use [matrix-synapse-ldap3](https://github.com/matrix-org/matrix-synapse-ldap3). As per their documentation, we should append the following commands to the bottom of the `homeserver.yaml` file:
```yaml
modules:
 - module: "ldap_auth_provider.LdapAuthProviderModule"
   config:
     enabled: true
     uri: "ldap://openldap:389"
     start_tls: false
     base: "ou=people,dc=example,dc=com" # Enter base domain name
     attributes:
        uid: "cn"
        mail: "mail"
        name: "uid"
   bind_dn: "cn=reader,dc=example,dc=com" # Enter read-only user DN username
   bind_password: "password2" # Enter read-only user password
```

And you can use something similar to this docker compose container setup:
```yaml
synapse:
  image: matrixdotorg/synapse:latest
  container_name: synapse
  volumes:
    - "/srv/synapse:/data"
  restart: unless-stopped
  networks:
    - shared_network
```

## Setting up NGINX

Lastly, we need to set up NGINX to serve the Matrix server. [Here](https://hub.docker.com/r/containous/whoami) you can find detailed set up instructions. This is how the container should be set up:
```yaml
nginx:
  image: nginx:latest
  container_name: nginx
  ports:
    - "80:80"
    #- "443:443"  # assuming you have configured SSL certificates
  volumes:
    - "/srv/nginx:/etc/nginx/conf.d/"
  networks:
    - shared_network
  depends_on:
    - phpldapadmin
```
And lastly, we need to create the following NGINX configuration file. The admin endpoint is blocked for security reasons. To execute administration commands, it must be done from the VPS itself.
```conf
server {
  listen 80;
  server_name matrix.example.com;

  location /_synapse/admin {
    allow 127.0.0.1;
    deny all;
  }

  location ~* ^(\/_matrix|\/_synapse\/client) {
    proxy_pass http://synapse:8008;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    client_max_body_size 50M;
    proxy_http_version 1.1;
  }
}
```

## Conclusion

And that's it! The only thing left to do for this configuration would be to set up SSL certificates for your traffic to be fully enrypted. You now have a private Matrix server with LDAP authentication! I hope this article has been useful to you. If you have any questions or suggestions, please don't hesitate to contact me. I look forward to hearing from you!