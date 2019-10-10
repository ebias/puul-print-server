# Installation


1. Download Rasbian Buster Lite from https://raspberrypi.org/downloads/raspbian/
2. Burn iso to SD-Card with Balena Etcher from https://www.balena.io/etcher/
3. Put a empty file on the SD-Cards root folder with filename 'ssh' (no extension!) to enable ssh service on the RasPi.
4. Put a 'wpa_supplicant.conf' file on the same folder with following contents to configure Wi-fi connection:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
ap_scan=1
fast_reauth=1
country=JP

network={
	ssid="Your network's SSID"
	psk="Your network's password/psk"
	id_str="0"
	priority=100
}
```

5. SSH to the RasPi with command

```
ssh pi@RASPI-IP
```

The password for the **pi** user is **raspberry**

6. Run the deploy script: 

```
bash <(curl -s https://raw.githubusercontent.com/ebias/puul-print-server/master/deploy.sh)
```
