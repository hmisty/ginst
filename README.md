# ginst
ginst webhook and proof-of-concept

## how it works

RULE: one box can be and only be one role among dev, staing, or production. it cannot be both.

point hosts to right front-ends:

 * hostname1-dev --> fe1 --> nginx vhost1 --> example/app1
 * hostname2-dev --> fe1 --> nginx vhost2 --> example/app2
 * hostname1-staging --> fe2 --> nginx vhost1 --> example/app1
 * hostname2-staging --> fe2 --> nginx vhost2 --> example/app2
 * hostname1-production --> lb --> fe3 fe4 --> nginx vhost1 --> example/app1
 * hostname2-production --> lb --> fe3 fe4 --> nginx vhost2 --> example/app2

git co branch to switch to the right codebase:

 * master branch: topology.dev fe1 (detected by `hostname`)
 * staging branch: topology.staging fe2
 * production branch: topology.production fe3 fe4

git push to trigger deployment:

 * git push --> github webhook -> POST ginst /install

## pre-requisite

 * setup git pull without pwd/passphrase
 * deployment folder /srv/ginst
 * symlink /etc/nginx/sites-enabled/vhosts -> /srv/ginst/example/vhosts

## misc
Files under /misc are used for server configuration (@ubuntu server).

 * /misc/ginst: the upstart script that can symlink to /etc/init.d/
 * /misc/ginst-vhost: the virtual host configuration file that can symlink to /etc/nginx/sites-enabled/

## license
* MIT
* Evan Liu 2015
