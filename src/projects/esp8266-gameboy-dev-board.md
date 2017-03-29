---
title: ESP8266 Gameboy Dev Board
date: 2017-03-28
layout: project.html
collection: projects
nav: projects
project: true
draft: false
description: A development board for Gameboy Link Port accessories, powered by ESP8266!
---

# ESP8266 Gameboy Dev Board

Your go to dev board for Gameboy accessories development, powered by ESP8266.

![Prototype](/img/esp8266-gameboy-dev-board/prototype.png)

## Story

I wanted to create this board to solve 2 problems:

1. To make my other project, ESP8266 Gameboy Printer, more slick looking and convenient to use.
2. Easily test out Gameboy accessory ideas that I want to make, that also utilizes ESP8266.

I posted on Reddit [/r/Gameboy](https://www.reddit.com/r/Gameboy/comments/61xtsd/work_in_progress_wifi_gameboy_printer_emulator/) about my ESP8266 Gameboy Printer Emulator project, and recieved tremendous comments. Which also confirmed that this device do sparks some interest.

I'm releasing this project under __MIT License__ for both the board design and code.

## The Board

Few weeks weeks ago I finally pull the trigger and designed the board then sent it to OSH Park to get it made. It came back yesterday so I tested it out. Unfortunately due to my carelessness there are some little problems. Too embarrassed to talk about it here.

But I got it all fixed up! And even added my own aesthetic touch to it! Here's a sneak peak! Cute eh?

![Mockup](/img/esp8266-gameboy-dev-board/new_board_mockup.png)

This can go straight on top of the [Wemo D1 mini](https://www.wemos.cc/product/d1-mini.html) and I helpfully added an LED and a button to pull `GPIO0` to ground.

Someone on Reddit also asked if it's possible to add SD card to this setup. With the Arduino framework, I can't see why not. You can pop [this shield](https://www.wemos.cc/product/micro-sd-card-shield.html) and get micro SD connection, but I've already used D5-D7 on my board. Maybe you have to wire one yourself.

## Potentials

Not only you can emulate a Gameboy Printer, there are a lot of things you can emulate as well! Such as another Gameboy. Another project I have in mind is like so:

A Pokemon creation device. You input all the specs of a Pokemon, the device creates the Pokemon and can be traded with real Gameboys! Further more, one can even use it to "store" a Pokemon as a file, you can put it on the cloud, you can duplicate it, or even create a web service to trade Pokemons!! The Pokemon link protocol of gen 1 and 2 games are fairly open right now, so theoretically you can achieve this (in fact, [someone already did](https://www.engadget.com/2015/02/17/you-can-now-trade-pokemon-with-yourself-thanks-to-arduino/))!

## Conclusion

I've submitted the new board to the fab house, again. Hopefully this time there will be no more design problems. 

I'll upload the EagleCAD design files to Github shortly.

## Update

[And here's the Github Repo!](https://github.com/applefreak/esp8266-gameboy-dev-board)
