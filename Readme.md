# Poyu.xyz

[Poyu.xyz](https://poyu.xyz) source code. Powered by [Metalsmith.io](http://www.metalsmith.io/).

I also included a handy NGINX configuration file with Let's Encrypt SSL `poyu.xyz.conf`

## Build

	$ make build
	
## Deploy

Make sure you have SSH access to the machine you want to deploy, and change the DEST variable in Makefile. Finally:

	$ make deploy
