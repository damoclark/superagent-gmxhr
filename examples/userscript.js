
/**
 * userscript.js
 *
 * Example userscript using superagent-gmxhr
 *
 * 18/03/2017
 *
 * Copyright (C) 2017 Damien Clark (damo.clarky@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


try
{
	var superagent = require('superagent') ;
	//var gmxhr = require('superagent-gmxhr') ;
	var gmxhr = require('..') ;

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
}
catch(err)
{
	console.log('Error: '+err) ;
	console.log('On line: '+err.lineNumber) ;
	console.log('Stack:'+err.stack) ;
}
