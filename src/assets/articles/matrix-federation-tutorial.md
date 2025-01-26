## Introduction
In my [last article](./ldap-matrix), we have set up a private communication environment with the Matrix protocol. In this article, we will see how to set up a federation for a Matrix serever (Synapse).

## Requirements
This tutorial assumes Debian is used as the distribution of choice and the steps in my previous article were followed (having a fresh instance is sufficient). In order to follow this tutorial, you will need:
- Server with root access;
- [Docker compose](https://docs.docker.com/engine/install/debian/#install-using-the-repository);
- [Working synapse container](https://hub.docker.com/r/matrixdotorg/synapse).

## Setting up federation

The [documentation](https://element-hq.github.io/synapse/latest/federate.html) discusses the implementation. In our case, we'll use a slightly different approach. Firstly, enable federation in the `homeserver.yaml` file:
```yaml
listeners:
  - port: 8008
    tls: false
    type: http
    x_forwarded: true
    resources:
      - names: [client, federation]
        compress: false
```
Once this is updated, we need to update the NGINX configuration, to forward federation requests and also to tell other servers how to access our server. This configuration is slightly updated to also include SSL configuration. For ease of use, I recommend implementing [Cloudflare Origin certificates](https://developers.cloudflare.com/ssl/origin-configuration/).
```nginx
server {
  listen 80;
  server_name matrix.example.com;

  # Redirect all HTTP traffic to HTTPS
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  listen [::]:443 ssl;

  server_name matrix.example.com;

  # SSL certificates and key
  ssl_certificate <...>;
  ssl_certificate_key <...>;

  # Block unauthorized requests to admin endpoint
  location /_synapse/admin {
    allow 127.0.0.1;
    deny all;
  }

  # Proxy requests to the Synapse container
  location ~* ^(\/_matrix|\/_synapse\/client) {
    proxy_pass http://synapse:8008;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    client_max_body_size 50M;
    proxy_http_version 1.1;
  }

  # Tell other servers how to access this server
  location /.well-known/matrix/server {
    default_type application/json;
    return 200 '{"m.server": "matrix.example.com:443"}';
  }

}
```

Once the changes are made, feel free to restart your NGINX and Synapse containers!

## Adding a whitelist of other instances
If you want to allow federation with other instances, you can add them to the whitelist in the `homeserver.yaml` file. This will allow only the listed instances to be federated with. [The documentation](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html#federation) gives an example of how that can look like. Append the following to your configuration:
```yaml
whitelist_enabled: true
federation_whitelist_endpoint_enabled: false
allow_profile_lookup_over_federation: true
allow_device_name_lookup_over_federation: false
federation_domain_whitelist:
  - matrix.example1.com
  - matrix.example2.com
```

## Troubleshooting

If you encounter any problems, the [federation testing tool](https://federationtester.matrix.org/) can help understand any other present errors.
