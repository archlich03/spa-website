## Introduction
In my [last article](./ldap-matrix), we set up a private communication environment using the Matrix protocol. A crucial feature of Matrix is its ability to federate, allowing different Matrix servers to communicate seamlessly, making it suitable for both personal and collaborative environments. In this article, we will explore how to enable federation on a Matrix server (Synapse) and ensure proper configuration for secure and efficient communication.

---

## Requirements
To follow this guide, the following prerequisites should be met:

- A Debian-based system with root access.
- A fully functioning [Synapse container](https://hub.docker.com/r/matrixdotorg/synapse).
- [Docker Compose](https://docs.docker.com/engine/install/debian/#install-using-the-repository) installed.
- Familiarity with basic command-line operations.

If you haven’t yet set up a Synapse server, refer to the previous article for detailed steps. Starting with a fresh instance is recommended but not mandatory.

---

## What is Federation?
Matrix federation enables different servers to interoperate, sharing data such as messages and profiles across domain boundaries. This decentralization is one of Matrix's strengths, providing users with more control over data while facilitating global communication. Setting up federation involves configuring Synapse and its proxy server (e.g., NGINX) appropriately.

---

## Setting up Federation

### Step 1: Enable Federation in Synapse Configuration
Locate the `homeserver.yaml` file for Synapse. By default, this file resides in the `/data` directory inside your container. Edit the file to enable federation by ensuring the following block is included:

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

This allows the server to handle federation traffic on port `8008` while preserving client and federation-specific routes.

### Step 2: Configure NGINX for Federation
Next, we need to modify the NGINX configuration to handle federation requests and communicate the server's address to other Matrix instances. Add or update the NGINX configuration file for your Synapse server as follows:

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
  ssl_certificate /etc/ssl/certs/example-com.pem;
  ssl_certificate_key /etc/ssl/private/example-com.key;

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

Replace `matrix.example.com` with your actual domain name. Additionally, configure SSL certificates for secure connections. [Cloudflare Origin Certificates](https://developers.cloudflare.com/ssl/origin-configuration/) are a convenient option for SSL.

Once updated, restart your NGINX and Synapse containers to apply changes:

```bash
docker-compose restart nginx synapse
```

---

## Adding a Whitelist of Other Instances
By default, a federated Matrix server communicates with all instances. However, you can restrict access by whitelisting specific domains. To configure this, append the following to your `homeserver.yaml` file:

```yaml
whitelist_enabled: true
federation_whitelist_endpoint_enabled: false
allow_profile_lookup_over_federation: true
allow_device_name_lookup_over_federation: false
federation_domain_whitelist:
  - matrix.example1.com
  - matrix.example2.com
```

This configuration ensures your server interacts only with trusted instances, bolstering privacy and control.

---

## Troubleshooting
If issues arise during configuration, the [Matrix Federation Tester](https://federationtester.matrix.org/) is an excellent tool to diagnose federation problems. Common issues include:

- Missing or misconfigured `.well-known/matrix/server` records.
- Invalid or absent SSL certificates.
- Inconsistent NGINX proxy rules.

Inspect logs from both Synapse and NGINX to identify potential errors:

```bash
docker-compose logs synapse nginx
```

---

## Conclusion
By following these steps, you now have a fully functional federated Matrix server. This setup opens up opportunities for secure, private, and decentralized communication while integrating seamlessly into the broader Matrix ecosystem. Explore additional configurations to further customize and optimize your server's capabilities.

---
