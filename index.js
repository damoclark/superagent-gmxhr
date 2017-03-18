/**
 * superagent-gmxhr
 *
 * Use superagent in your Greasemonkey or Tampermonkey userscripts to make GM_xmlhttpRequest requests
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

var gmxhr = require('gmxhr') ;

/**
 * Backup copy of getXHR method from superagent
 * @type {!function}
 */
var old_xhr = null ;

/**
 * This function will replace the original browser xhr implementation with gmxhr in the superagent module.
 *
 * All subsequent calls using superagent will use gmxhr
 *
 * @param {function} superagent Superagent constructor function (i.e. require('superagent') )
 */
function set(superagent)
{
	old_xhr = superagent.getXHR ;
	superagent.getXHR = function()
	{
		return new gmxhr() ;
	} ;
}

/**
 * This function will restore the original browser xhr implementation to the superagent module.
 *
 * All subsequent calls will revert to using the original browser xhr implementation
 *
 * @param {function} superagent Superagent constructor function (i.e. require('superagent') )
 */
function unset(superagent)
{
	if(old_xhr === null)
		throw new Error("Must call .set method on superagent before can call .unset") ;

		superagent.getXHR = old_xhr ;
		old_xhr = null ;
}

module.exports =
{
	set: set,
	unset: unset
} ;
