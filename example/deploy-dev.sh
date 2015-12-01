#!/bin/bash
echo "to deploy dev"
exit
 
WEB_PATH='/home/evan/git/ginst'
WEB_USER='evan'
WEB_USERGROUP='evan'
 
echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
# use no passphrase for your key! chagne it by ssh-keygen -p
git pull origin master
git checkout master
echo "changing permissions..."
chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
echo "Finished."
