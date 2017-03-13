---
title: Bookmark2Slack
date: 2017-03-11
layout: project.html
collection: projects
nav: projects
project: true
draft: false
description: Taking advantage of Skore's Paperbot, using bot built with Serverless framework
---

# Bookmark2Slack

Taking advantage of Skore's Paperbot to create my own digest, using a bot built with the Serverless framework

## Story

[Paperbot](http://paperbot.ai/) is a bot made by [Skore](http://skore.io/) to organize all the links in a Slack team, and gives out a daily digest of the links. You can organize links by adding hashtags. Pretty neat idea, but I want to utilize its _smartness_ for making my own digest. I want to make a bookmarklet that when clicked, it'll send the current page to a special Slack channel, where Paperbot will be listening. 

How do I proceed about doing this?

## Theory

__Another bot to the rescue!__ I can make a bot that takes a POST request of a URL, then posts that URL to the special channel in Slack. Sounds just like a use case for [Serverless](https://serverless.com/) framework!

### Serverless Framework

For the uninitiated, the Serverless framework, just as it sounds, is _serverless_. It revolves around using microservices such as AWS' Lambda, Microsoft Azure Functions, and IBM's Apache OpenWhisk. To understand it better, please visit [their website](https://serverless.com/framework/).

When I was interning at a previous company, I used the Serverless framework on a project. That was when the framework is still very young, v0.5.6 to be exact. Right now, it's on v1.8.0! The project developement is fast and becoming easier to setup, develop and deploy. 

I absolutely love this framework.

### Paperbot commands



## Conclusion

Lorem ipsum it up
