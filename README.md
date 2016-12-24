# raspberrypi-relay-controller

An Ansible playbook to provision a Raspberry Pi as a 2-channel relay control server.  Both a simple web interface and a REST API is provided to allow for easy control and integration with other systems. 

# Instructions

The following instructions assume you are using a Raspberry Pi 3 Model B.

## Setup Arch Linux ARM on Raspberry Pi

1. Follow the [Mount SD card in VirtualBox from Mac OS X Host](http://www.geekytidbits.com/mount-sd-card-virtualbox-from-mac-osx/) guide to get access to SD Card from VirtualBox running on OS X host.
2. Prepare the SD Card by following [these instructions on the Arch Linux ARM website](https://archlinuxarm.org/platforms/armv8/broadcom/raspberry-pi-3).
3. Before running `umount boot root` from the above instructions, run `sync`.
4. After running  `umount boot root` from the above instructions, shutdown VirtualBox and then Eject the SD Card from OS X.
5. Insert SD Card into the Pi and boot
6. Run `arp -a` and look for the "alarm" entry to find the IP address of the Raspberry Pi.
 
## Pre-provisioning

By default Arch Linux ARM does not allow password authentication for root user over ssh.  So, before running the Ansible playbook, you need to ssh with the `alarm` user, `su root` and add an authorized public key so that Ansible is able to ssh in as root. 

1. `ssh alarm@[ip_address]` (password: alarm)
2. `su root` (password: root)
3. `mkdir ~/.ssh`
4. `curl -o ~/.ssh/authorized_keys https://github.com/bradyholt.keys` (replace bradyholt with your GitHub username)
5. `reboot`

## Provisioning

Do the following from the provisioning host (i.e. OS X or Windows):

1. Ensure [Ansible 2.2](http://docs.ansible.com/ansible/intro_installation.html#latest-releases-on-mac-osx) is installed
2. Copy config.yml.example to config.yml
3. Edit config.yml and update values per your environment
4. Run `./provision.sh`
5. Navigate to http://[ip_address]:3000 and you should see the web interface like below

![Relay Web Interface](https://cloud.githubusercontent.com/assets/759811/21414129/6ffc9bda-c7c2-11e6-9732-1c49930e84ef.png)
