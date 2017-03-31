---
title: MsgMe Device
date: 2017-02-15
layout: project.html
collection: projects
nav: projects
project: true
draft: false
description: A modern pager device for couples that are separated.
---

# Message Me Device

A modern pager device for couples that are separated.

<iframe src='https://gfycat.com/ifr/TheseHomelyFish' frameborder='0' scrolling='no' width='640' height='360' allowfullscreen></iframe>

## Story

I'm moving back to the States from Taiwan, my significant other will be staying until I'm more financially stable. It was almost Christmas time so I decided to build a device that will remind us of each other. 

Inspired by the old school pager, "Message Me" (MsgMe) is a simple, Internet connected device that can only recieve messages. Messages are send via a web interface hosted on my server. The device also displays the number of days we are together.

## Theory

The objectives are simple, a website, and two devices. The website acts as a sender, and the two devices act as recievers, but the website can specify which device to send to.

I decided to use publish-subscribe-based protocol to handle the communication. The best choice is [MQTT](https://en.wikipedia.org/wiki/MQTT), messages are event based and doesn't use up unnecessary resources as oppose to polling-based solutions (e.g. HTTP request).

With that in mind, I chose ESP8266 as the brain of this project. I also wanted a graphical interface to display indicators such as WIFI status, MQTT connection status and a new message notification. So I used a SSD1306 OLED display to all of the above information.

### MQTT

The MQTT protocol requires a "message broker", which aggregate messages between subcribers on the same topic. The broker has to be always on, with as little down time as possible. Although you can set up your own using the open source [Mosquitto](http://mosquitto.org/) software, I used [CloudMQTT](https://www.cloudmqtt.com/) for the sake of simplicity and ease of maintenance.

There are total of four topics: each device has their own topic, one called "days", used to publish the days together informaion, and last one called "request", which is used by the two devices to request information such as the latest message or the lateset days together data.

In order to send a message to the device, just publish the message on their respective topic. The "days" topic is used to update the days together information on both devices, which is sent by the server hosting the web interface daily.

### Web Interface and Hosting Server

The website only needs to handle publishing new messages from the web interface to MQTT broker, the server needs to have a periodical timer to update the days together information each day. To achieve the previous, I used Node.js as the backend runtime, and Express.js as the framework. For frontend, I chose Vue.js since I'm most familiar with it. Then have it running using PM2 and NGINX as reverse proxy.

![web-interface](/img/msgme/web.png)

This Node.js instance not only handles the HTTP requests from users, but also listens on the "request" MQTT topic, then it'll respond to each different requests sent by devices.

I used a Systemd Timer to call up a Node.js script to update the days information every 24 hours. The script just publishes a message with body "days" to the "request" topic. Then the listening Node.js instance will respond by sending out the latest days informaion to the "days" topic.

__TODO__: Put the Systemd Timer unit here.

### Devices

The physical "pager" device is a double stacked PCB. With an OLED display and two buttons at the first layer, and an ESP8266 at the bottom layer, connected together with 8 pins, of which only 6 is used. The bottom layer also have 2 buttons, one for reset, then the other connects to ESP8266's GPIO-0 to the ground when pressed, used for programming the ESP8266. Also on the bottom layer, is a USB to serial module. I was lucky to find one that fits perfectly to my board. It also provides 5V to the whole device, which is then regulated to 3.3V with a AMS1117-3.3V on the back of the bottom layer.

I'm using the Arduino libray through [Platform.io](http://platformio.org/), which takes care of library dependencies for me. I found a library for SSD1306 that has a "slide" function built in, so I decided to use it. At boot, it'll first initialize the display, then try to connect to a known SSID. If none is found, it'll switch to AP mode and deliver a setup page to input the SSID information. After that, it will try to connect to the MQTT broker, and subscribes itself to a few topics. One is their own device specific topic, the other is the "days" topic, then the other is the "request" topic. After the connection is established, it'll publish "days" and "their_device_name" as the message body to the "request" topic. Which then the server will respond with the latest days information and the last message published to the device.

The two buttons has interrupts set. They act as left and right button to switch between slides. The first slide shows the days together information, the the second slide shows the latest message. There's also 3 icon indicators at the first slide which indicates whether WIFI is connected, MQTT broker is connected, and if a new message has received.

When the device receives a new MQTT message, it first check if the topic is its own device specific topic. If it is, then it'll display the indicator and put the message in the message variable. If the topic is "days" then it will simply change the "daysTogether" variable.

## Result

![sandwiched](/img/msgme/sandwiched.jpg)

The finished product looks natural and perfect, no compromises are made when choosing the parts. The display width fits the PCB perfectly, micro USB port is exposed from the top, and the two system buttons are hidden nicely under the first layer PCB.

The functions works as intended whith minimum hiccup, but there are still few known issues and features to desire.

The web interface is done with Bootstrap, not the best UI out there, but it gets the job done.

I'm mostly happy with this project, as it serves the purpose. My SO is happy about it too! Since is very unique and sincere.

### Known Bugs & Enhencements

* MQTT connection will sometimes disconnect from the device. The reason is unknown, but can be solved by simply making it reconnect if it detects a disconnection.
* I could utilize Arduino framework's OTA update feature so I can deliver firmware updates over the air to the devices.

## Resources

* [Device Firmware](https://github.com/applefreak/message-me-firmware)
* [Server Side Codes](https://github.com/applefreak/message-me-server)
* [SSD1306 Library](http://platformio.org/lib/show/562/ESP8266_SSD1306)
* [PubSubClient](http://platformio.org/lib/show/89/PubSubClient)
* [WifiManager](http://platformio.org/lib/show/567/WifiManager)
