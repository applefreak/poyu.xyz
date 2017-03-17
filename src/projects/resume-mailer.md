---
title: Resume Mailer
date: 2017-03-16
layout: project.html
collection: projects
nav: projects
project: true
description: Sending job resumes the programmer's way. Using Gulp and Nodemailer. Automate all the things!
---

# Resume Mailer

Sending job resumes the programmer's way. Using Gulp and Nodemailer. Automate all the things!

<script type="text/javascript" src="https://asciinema.org/a/bq1p7x5plvioep8vmkoe74odp.js" id="asciicast-bq1p7x5plvioep8vmkoe74odp" async data-autoplay="1" data-speed="2" data-theme="monokai"></script>

## Story

I'm looking for a job. And one of the most effective way to get you an interview is to customize your cover letter, and leave a good impression.

Well, I smart up and use [MailChimp](https://mailchimp.com/) to layout my email, then I can edit a few line then send out my customized cover letter to the recruiters, right? Not so fast! The problem is, there's no easy and efficient way to email these HTML emails. Apple's Mail.app doesn't support HTML, my email provider doesn't support HTML, the only software that's usable is Thunderbird, but then I still have to edit each email one by one to customize them. Well, thankfully, I'm a programmer and we human are the best at simplifying things using computers, right?

## Theory

This project is what I came up with. I exported the email as HTML in MailChimp, using Mustache, I took out the parts I want to customize and fill them with template variables. I decided to use Gulp (cause why not?) to string together the following tasks: 

1. Use `gulp-prompt` to ask for information I want to customize
2. Confirm the entered information is correct
3. If entered yes, read the template then fill out the variables using information I entered
4. Make the CSS styles inline with `gulp-inline-css`
5. Finally, use `gulp-mail` to send out the email

This is the first time I've ever write Gulpfiles from scratch, it was pretty easy and straightforward. No wonder people use it to automate development workflow.

## Conclusion

The code is [here](https://github.com/applefreak/resume-mailer) up on Github. 

The result is this cool interactive prompt that will ask me for recruiter's information, then send out my resume based on the things I've entered. Pretty slick, eh?

*If you're interested how my resume looks like, feel free to shoot me an email! Recruiters, I'm still looking for a job! Shoot me an email as well if you want to consider me.*

## Reference

* [MailChimp](https://mailchimp.com/)
* [Gulp](http://gulpjs.com/)
* [gulp-prompt](https://github.com/Freyskeyd/gulp-prompt)
* [gulp-inline-css](https://github.com/jonkemp/gulp-inline-css)
* [gulp-mail](https://github.com/fritx/gulp-mail)
