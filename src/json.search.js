
if (!JSON.search) {
	JSON.search = function(tree, xpath, single) {
		'use strict';
		
		var doc  = JSON.toXML(tree),
			xres = Defiant.node[ single ? 'selectSingleNode' : 'selectNodes' ](doc, xpath),
			i    = xres.length,
			ret  = [],
			mapIndex;

		if (single) xres = [xres];
console.log( this.search );
		//console.log( 'x-RES:', xres );
		while (i--) {
			switch(xres[i].nodeType) {
				case 2:
				case 3: 
					ret.unshift( xres[i].nodeValue );
					break;
				default:
					mapIndex = +xres[i].getAttribute('d:mi');
					ret.unshift( this.search.map[mapIndex-1] );
			}
		}
		// if tracing is enabled
		if (typeof JSON.mtrace === 'function') JSON.mtrace();
		//this.trace = JSON.search.trace ? JSON.mtrace(tree, ret) : false;

		//console.log( 'RES:', ret );
		return ret;
	};
}
