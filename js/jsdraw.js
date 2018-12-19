var canvas = document.getElementById( 'canvas' ),
	context = canvas.getContext( '2d' );
var backgroundcolor = '#FFFFFF';
var foregroundcolor = '#000000';
var objectlist = [];
var mouseDrag = false;
var startpos;
var endpos;
var palette = [
		[ "rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
			"rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"
		],
		[ "rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
			"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"
		],
		[ "rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
			"rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
			"rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
			"rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
			"rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
			"rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
			"rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
			"rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
			"rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
			"rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"
		]
	];

( function ()
{
	window.addEventListener( 'resize', resizeCanvas, false );

	function resizeCanvas()
	{
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;



		draw();
	}
	resizeCanvas();


} )();

function writeMessage( message )
{
	var context = canvas.getContext( '2d' );
	context.clearRect( 0, 0, canvas.width, canvas.height );
	context.font = '18pt Calibri';
	context.fillStyle = 'black';
	context.fillText( message, 10, 25 );
}

canvas.addEventListener( 'mousedown', function ( evt )
{
	startpos = getMousePos( evt );
	mouseDrag = true;
}, false );

canvas.addEventListener( 'mouseup', function ( evt )
{
	endpos = getMousePos( evt );
	context.fillStyle = foregroundcolor;
	context.fillRect( startpos.x, startpos.y, endpos.x - startpos.x, endpos.y - startpos.y );
	var newobj = {
		color: foregroundcolor,
		startpos: startpos,
		endpos: endpos
	};
	objectlist.push( newobj );
	mouseDrag = false;
}, false );

canvas.addEventListener( 'mousemove', function ( evt )
{
	var mousePos = getMousePos( evt );
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
}, false );

function getMousePos( evt )
{
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function draw()
{
	//  Clear canvas
	context.clearRect( 0, 0, canvas.width, canvas.height );
	//  Redraw background
	context.fillStyle = backgroundcolor;
	context.fillRect( 0, 0, canvas.width, canvas.height );
	//  Redraw objects
	objectlist.forEach( function ( element )
	{
		context.fillStyle = element.color;
		context.fillRect( element.startpos.x, element.startpos.y, element.endpos.x - element.startpos.x, element.endpos.y - element.startpos.y );
	} );
}

function Clear()
{
	objectlist = [];
	draw();
}

function UpdateBackground( e )
{
	backgroundcolor = e.value;
	draw();
}

function UpdateForeground( e )
{
	foregroundcolor = e.value;
}

function SaveImage()
{
	var link = document.getElementById( 'link' );
	link.setAttribute( 'download', 'jsdrawing.png' );
	link.setAttribute( 'href', canvas.toDataURL( "image/png" ).replace( "image/png", "image/octet-stream" ) );
	link.click();
}

$( "#foreground" ).spectrum(
{
	color: foregroundcolor,
	showInput: true,
	className: "full-spectrum",
	showInitial: true,
	showPalette: true,
	showSelectionPalette: true,
	maxSelectionSize: 10,
	preferredFormat: "hex",
	localStorageKey: "spectrum.demo",
	change: function ( color )
	{
		foregroundcolor = color.toHexString();
	},
	palette: palette
} );

$( "#background" ).spectrum(
{
	color: backgroundcolor,
	showInput: true,
	className: "full-spectrum",
	showInitial: true,
	showPalette: true,
	showSelectionPalette: true,
	maxSelectionSize: 10,
	preferredFormat: "hex",
	localStorageKey: "spectrum.demo",
	change: function ( color )
	{
		backgroundcolor = color.toHexString();
		draw();
	},
	palette: palette
} );