/* Author: Joan Fernandez <joan(at)joanfernandez(dot)es>

*/

// Global variables
var nav = $('#top-navigation');
var topl = $('#top-link');
var work = $('#work');
var sk = $('#skill-list');

/**
 * Moves the navigation bar with page scroll.
 * Inspired in kccreepfest.com
 *
 */
function navPosition(){
	var _wt = work.offset.top;
	
	var win = $(window);

	var _navTop = nav.offset().top;

	win.bind('load scroll', function(){
		
		var scroll = win.scrollTop();
		nav[scroll > _navTop ? 'addClass' : 'removeClass']('fixed');
		topl[scroll < _navTop ? 'addClass' : 'removeClass']('hidden');

	
	});
}

/**
 * Cool scrolling
 * 
 */
function initLocalScroll(){
	nav.localScroll();
}

/**
 * Dirty jobs with DOM
 *
 */
function initMarkupMods(){
	var _ileft = sk.find('li:nth-child(-n+6)');
	var _iright = sk.find('li:nth-child(n+7)');
	_ileft.wrapAll('<div class="ileft"/>');
	_iright.wrapAll('<div class="iright"/>');

	var _tl = $('#timeline');
	_tl.append('<span class="tl-blur">')
}


/**
 * Make the pie charts of skills using canvas
 *
 */
function initSkills(){

	var _ss = $('#skill-selected'); 
	_ss.find('div:not(.selected)').hide();

	$('#skill-list').find('a').click(function(e){
		e.preventDefault();
		var _id = $(this).attr('href');
		_ss.find('.selected').hide();
		$(_id).removeClass('visuallyhidden').addClass('selected').fadeIn('slow');
		$('#skill-list li').removeClass('selected');
		$(this).parent('li').addClass('selected');
	});

	$('#skill-list').find('b').each(function(){
		var _s = parseInt($(this).attr('class').substr(1));

		// Chart data
		var browserUsageData = [
    		// Object: label, value, color
    		{ 'label' : '', 'value' : _s, 'color' : '#cdf63c' },
	    	{ 'label' : '', 'value' : parseInt(100-_s), 'color' : '#8da6ce' }
		];


		// Create a new instance of CanvasPieChart
		var canvasPieChart = new CanvasPieChart( 
			$(this).attr('id'), 
			browserUsageData,
			{
		    	'width' : 91,
		    	'height': 91,
		    	'strokeLineWidth':0,
		    	'strokeLineColor': '#10132c',
		    	'sectorTextRendrer': null,
		    	'imageMap': false
			});
	});
}

/**
 * Actions form contact form
 *
 */
function initForms() {

	// Use a fallback method for old browsers without placeholder support
	if( Modernizr.input.placeholder ){
		$('#contact label').hide();
	} else {
		
	}

	// Auto-resizeables textareas
	$('textarea').elastic();

	$('#contact input[type=submit]').click(function(){
		var _val = $(this).attr('value'); 
		$(this).attr('value','Sending...');
	});
}


function initWorkStructure() {
	
	var count = 1;
	var html = '';
	
	/* Move the images out of the list */
	$('#work .wrapper').append('<div id="imgs-container" class="imgs-container"></div>');
	//$('<div id="imgs-container" class="imgs-container"></div>').insertAfter('#work > h1'); 
	$('#work article').each(function(){
		var img = $(this).find('.work-image');
		img.attr('id', 'iwork-'+count);
		img.wrap('<a class="img-wrp" href="#twork-'+count+'"/>');
		$('#imgs-container').append(img.parent());
		$(this).parent('li').attr('id', 'twork-'+count);
		count++;
	});
	
	$('#work .works > li').hide();
	$('#work .works > li:first-child').addClass('active').show();
	$('#iwork-1').parent().addClass('active');

	/* Canvas charts */
	$('#work .project-tasks').find('b').each(function(){
		var _s = parseInt($(this).attr('class').substr(1));

		// Chart data
		var browserUsageData = [
    		// Object: label, value, color
    		{ 'label' : '', 'value' : _s, 'color' : '#98c141' },
	    	{ 'label' : '', 'value' : parseInt(100-_s), 'color' : '#9e9e9e' }
		];


		// Create a new instance of CanvasPieChart
		var canvasPieChart = new CanvasPieChart( 
			$(this).attr('id'), 
			browserUsageData,
			{
		    	'width' : 118,
		    	'height': 118,
		    	'strokeLineWidth':0,
		    	'strokeLineColor': '#10132c',
		    	'sectorTextRendrer': null,
		    	'imageMap': false
			});
	});	
	
	
	/* Onclick event */
	$('#work .img-wrp').click(function(e){
		e.preventDefault();
		$('#work .img-wrp').removeClass('active')
		$(this).addClass('active');
		var id = $(this).find('img').attr('id').split('-')[1];
		$('#work li.active').removeClass('active').hide();
		$('#twork-'+id).addClass('active').fadeIn();
		//return false;
	});
	
}


function initTwitterTimeline() {
	$.getJSON('https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=joan_fern&count=5&callback=?', function(data) {
		var items = [];

		$.each(data, function(key, val) {
			items.push('<li id="' + key + '">' + twttr.txt.autoLink(val.text) + '</li>');
		});

		$('<ul/>', {
			'class': 'my-new-list',
			html: items.join('')
		}).appendTo('body');
	});
}

/**
 * Document ready. Let's go!
 *
 */
$(document).ready(function(){
	navPosition();
	initLocalScroll();
	initMarkupMods();
	initWorkStructure()
	initSkills();
	initTwitterTimeline();
	initForms();
});
