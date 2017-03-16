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

Taking advantage of Skore's Paperbot to create my own article digest, using a bot built with the Serverless framework!

## Story

[Paperbot](http://paperbot.ai/) is a bot made by [Skore](http://skore.io/) to organize all the links in a Slack team, and gives out a daily digest of the links. You can organize links by adding hashtags. Pretty neat idea, but I want to utilize its _smartness_ for making my own digest. I want to make a bookmarklet that when clicked, it'll send the current page to a special Slack channel, where Paperbot will be listening. 

How do I proceed about doing this?

## Theory

__Another bot to the rescue!__ I can make a bot that takes a POST request of a URL, then posts that URL to the special channel in Slack. Then I can use a bookmarklet to make requests to this API. Sounds just like a use case for [Serverless](https://serverless.com/) framework!

### Serverless Framework

For the uninitiated, the Serverless framework, just as it sounds, is _serverless_. It revolves around using microservices such as AWS' Lambda, Microsoft Azure Functions, and IBM's Apache OpenWhisk. To understand it better, please visit [their website](https://serverless.com/framework/).

When I was interning at a previous company, I used the Serverless framework on a project. That was when the framework is still very young, v0.5.6 to be exact. Right now, it's on v1.8.0! The project developement is fast and becoming easier to setup, develop and deploy. 

Developing apps using Serverless framework is very easy. In short, you define a `function` that can be triggered via various `events`. These `events` can be a requst through AWS API Gateway, scheduled timer, SNS topic, even AWS IoT and Alexa skills. The framework takes care of all the policies and permsion settings using CloudFormation templates. All you need to do is to command it through its CLI interface.

All you need to code is the actual code that's going to run on Lambda. The code can be written in Javascript (Node.js), Python or C#, I used Javascript since I'm most familiar with it. You setup the event details through a special config file: `serverless.yml`. I won't go into details here, but it should be really easy to figure out.

I absolutely love this framework.

### Paperbot Commands

To use Paperbot, you just invite it to channels you want to be listen on, and that's it! 

Or you can also direct mention it to add tags to a site, like the following pattern: `@paperbot https://poyu.xyz #ATag #AnotherTag`

### Bookmark2Slack Design

I want to be able to have a simple tagging system. Say I have 5 different bookmarklets, each will add a specific tag to the current site when it's send to the Slack channel. I also want my bot to detect a list of predifined sites and add special tags.

To do these, I designed an API that'll take 2 parameters: one is `url` and another is `tags`. `url` is simply the site's address, and `tags` will be an array of custom tags I want to add.

Easy enough, eh?

### Writing Bookmark2Slack

Slack provides 2 ways to send messages to a channel. One is to use [web hooks](https://api.slack.com/incoming-webhooks), the other is through its [Bot Users API](https://api.slack.com/bot-users). I tried using the web hook to send messages, but it seems like other bots on the channel will not be able to see its message this way. So the bot method is the only option, thankfully, it works.

There are tons of libraries and frameworkds that deal with chat bots, without looking around too much, I picked one that seems like the easiest, [Howdy.ai's Botkit](https://howdy.ai/botkit/). A few minutes later, I have my proof-of-concept working locally on my computer. Now I just need to implement it to AWS Lambda and API Gateway.

The flow is very simple: Lambda gets a request with the 2 parameters, search if the hostname matches the predefined domains, if it does, add the site specific tag. Then it'll add the tags from `tags` request body. Finally construct the string that directly mentions Slackbot, then sends it off to the special Slack channel.

### Calling It Up

The final part is the bookmarklets. Since I can include the tags in the request, I made several bookmarklets that'll include different tags, such as *Research*, *Save*, *Read*, etc. I used [this site](http://chriszarate.github.io/bookmarkleter/) to turn my plain JS code to bookmarklet JS. This part is easy, just your everyday XMLHttpRequest. Like this:

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
  	  if (request.readyState == XMLHttpRequest.DONE) {
 	       alert(request.responseText);
  	  }
	}
	request.open('POST', 'https://<YOUR_API_GATEWAY_URL_HERE>/prod/add', true);
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	request.send(JSON.stringify({url:window.location.href, tags:['Cool']}));

## Conclusion

I spent about half a day coding this up and testing it, works just like what I expected.

The code is here on [Github](https://github.com/applefreak/serverless-bookmark2slack)

There's only one BIG problem though...

### Limitations

Some site won't allow bookmarklets! Yep! Namely Github and NPM. Why? [__Content Security Policy__](https://en.wikipedia.org/wiki/Content_Security_Policy)

Basically it restricts what JS code the browser can run on a given page, mainly to prevent XSS. You can read up Github's implementaion [here](https://github.com/blog/1477-content-security-policy), and how they think major browsers doing it wrong. 

Well, there's currently no solution to this. One can write a browser extension to combat this, but... it's not exactly what I want. I want it to be plain and simple. Works across browsers what so ever. Oh well!

Thanks for reading!

## References

* [Paperbot.ai](http://paperbot.ai/)
* [Serverless Framework](https://serverless.com/)
* [Howdy.ai Botkit](https://howdy.ai/botkit/)
* [Slack Bot User API](https://api.slack.com/bot-users)
* [Bookmarkleter](http://chriszarate.github.io/bookmarkleter/)
* [Content Security Policy](https://en.wikipedia.org/wiki/Content_Security_Policy)
