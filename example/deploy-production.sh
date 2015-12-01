#!/bin/bash
echo "to deploy production"
exit
 
WEB_PATH='/home/evan/git/ginst'
WEB_USER='evan'
WEB_USERGROUP='evan'
 
echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/production
git clean -f
# use no passphrase for your key! chagne it by ssh-keygen -p
git pull origin production
git checkout production
echo "changing permissions..."
chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
echo "Finished."
