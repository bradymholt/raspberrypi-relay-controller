# Samsung SmartThings Pi Relay Control Device Handler

## Device Handler Setup

1. Login to [https://graph.api.smartthings.com/](https://graph.api.smartthings.com/)
2. Go to: My Device Handlers > Create New Device Handler > From Code
3. Paste contents of `pi-relay-control-device-handler.groovy`
4. Click: Create, Publish > For Me

## Device Setup

1. Login to [https://graph.api.smartthings.com/](https://graph.api.smartthings.com/)
2. Go to: My Devices > New Device
3. Specify: Name, Device Network Id (arbitrary), Location, Hub, Type ("Pi Relay Control")
4. Click: Create, Preferences > edit
5. Specify: IP, port, Relay #
6. Click: Save
