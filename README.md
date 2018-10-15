# DNS Reverse Lookup

> Reverse DNS lookup service.

A service that returns the host names of the provided IP addresses

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
npm i reverse-dns-lookup
```

## Usage

```sh
npm start

curl -H 'Content-Type: application/json' -d '{"ips":["8.8.8.8", "8.8.4.4"]}' http://localhost:8465/

# Example formatted output:
# {
#    "8.8.8.8" : [
#       "google-public-dns-a.google.com"
#    ],
#    "8.8.4.4" : [
#       "google-public-dns-b.google.com"
#    ]
# }
```

## API

The body is expected to have a content-type of application/json.

### /

Accepted body arguments:

`ip` a single IP address
`ips` multiple IP addresses

Returns and object with the ip address as key and an array of host names.


## Contribute

See [the contribute file](CONTRIBUTING.md)!

PRs accepted.

## License

[ISC © Michael Leaney](../LICENSE)
