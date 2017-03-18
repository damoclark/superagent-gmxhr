# superagent-gmxhr

[![NPM](https://nodei.co/npm/superagent-gmxhr.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/superagent-gmxhr/)

Use superagent in your Greasemonkey or Tampermonkey userscripts to make GM_xmlhttpRequest requests

## Overview

Userscripts are a great way to customise your web browsing experience.  Userscript webextensions such as Greasemonkey
and Tampermonkey share an API that allows you to execute privileged javascript on your browser's web pages.  
 
A commonly used API function is `GM_xmlhttpRequest`, which 
[provides similar functionality](https://wiki.greasespot.net/GM_xmlhttpRequest) to the standard browser
`XMLHttpRequest` function, with one exception - it does not honour the browser same origin policy restrictions.  
Therefore you can make requests in your userscript for resources from websites from a different origin to the currently 
loaded web page.

The `GM_xmlhttpRequest` function however has a different API to `XMLHttpRequest`, and is rather low-level.  One 
higher-level library for making AJAX type requests is Superagent.  
[Superagent](https://github.com/visionmedia/superagent) can be used in the browser to make `XMLHttpRequest` calls.

Using this library, Superagent can be adapted to also work with the `GM_xmlhttpRequest` function.

## Installation

```bash
$ npm install --save superagent-gmxhr
```

## Usage

The following steps through an end-to-end example of how to use superagent-gmxhr in your userscripts.

```bash
$ npm init
$ npm install --save superagent-gmxhr superagent browserify browserify-userscript-header
```

Let's create a `superagent-gmxhr.meta.js` file that containers the metadata for our userscript:

```javascript
// ==UserScript==
// @name          Example Userscript using superagent-gmxhr
// @namespace	    https://damos.world
// @description	  A simple script demonstrating how to use superagent-gmxhr
// @version       0.0.1
// @copyright     GPL version 3; http://www.gnu.org/copyleft/gpl.html
// @grant					GM_xmlhttpRequest
// @include       *
// ==/UserScript==
```

Now, our `userscript.js` file:

```javascript

var superagent = require('superagent') ;
var gmxhr = require('superagent-gmxhr') ;

/* Tell superagent to use GM_xmlhttpRequest */
gmxhr.set(superagent) ;

// Superagent will use GM_xmlhttpRequest
superagent.get('http://www.bom.gov.au/qld/forecasts/brisbane.shtml',function(err,html) {
	if(err)
		console.log('Error occurred using GM_xmlhttpRequest\n'+err) ;
	else
		console.log('Output html from GM_xmlhttpRequest'+html.text) ;
}) ;

/* Revert superagent back to using browser's built in XMLHttpRequest */
gmxhr.unset(superagent) ;


superagent.get('http://www.bom.gov.au/qld/forecasts/brisbane.shtml',function(err,html) {
	if(err)
		console.log('Error occurred using XMLHttpRequest\n'+err) ;
	else
		console.log(html) ;
}) ;

```

Generate our `superagent-gmxhr.user.js` file using browserify:

```bash
$ ./node_modules/.bin/browserify -p [ browserify-userscript-header --raw --file superagent-gmxhr.meta.js ] \
  userscript.js -o superagent-gmxhr.user.js
```

Install the `superagent-gmxhr.user.js` file into your browser using either Greasemonkey for Firefox, or Tampermonkey
for Chromium-based browsers.

The output from Firefox, looks as follows.  As you can see, after the `gmxhr.set(superagent)` call, the output shows

```
Output html from GM_xmlhttpRequest ...
```

while after the `gmxhr.unset(superagent)` call, the output shows
 
```
Error occurred using XMLHttpRequest ...
```

due to an origin error (the xhr call was made for domain www.bom.gov.au from page on domain google.com.au)


## Licence

Copyright (c) 2017 Damien Clark, [Damo's World](https://damos.world)<br/> <br/>
Licenced under the terms of the
[GPLv3](https://www.gnu.org/licenses/gpl.txt)<br/>
![GPLv3](https://www.gnu.org/graphics/gplv3-127x51.png "GPLv3")

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL DAMIEN CLARK BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

