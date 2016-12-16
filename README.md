# hammerhead-provisioning

This is the repository containing an Ansible playbook for provisioning  my Raspberry Pi running Arch Linux ARM which controls my garage doors.

# Instructions

## Setup Arch Linux ARM on Raspberry Pi

1. Follow the [Mount SD card in VirtualBox from Mac OS X Host](http://www.geekytidbits.com/mount-sd-card-virtualbox-from-mac-osx/) guide to get access to SD Card from VirtualBox running on OS X host.
1. Prepare SD Card with [these instructions](https://archlinuxarm.org/platforms/armv6/raspberry-pi)
2. Before running `umount boot root` from above, run `sync`.
3. After running  `umount boot root` from above, shutdown VirtualBox and then Eject the SD Card from OS X.
2. Insert SD Card into Pi and boot

## Setup DNS/DHCP

1. In LAN Router (Tomato) at http://192.168.1.1
 - Go to Status > Device List and find device with name `alarmpi`
 - Click `[static]` (redirects to Basic > Static DHCP/ARP/IPT) and configure a static IP of 192.168.1.5
 
## Pre-provisioning

1. `ssh alarm@[IP from device list]` (password: alarm)
2. `su root` (password: root)
3. `mkdir ~/.ssh`
4. `curl -o ~/.ssh/authorized_keys https://github.com/bradyholt.keys`
5. `reboot`

## Provisioning

1. Ensure Ansible 2.2 is installed
2. `provision.sh` (ansible-vault password located in LastPass > Secure Notes > Applications Secrets > "goblin ansible-vault")
