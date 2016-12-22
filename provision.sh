#!/bin/bash

ansible-playbook -e @config.yml provision.yml $@
