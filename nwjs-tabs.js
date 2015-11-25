var path = require('path');
var $ = require('jquery');

var app = $('app');


function nwjstabs () {
	$('head').append('<link rel="stylesheet" href="'+__dirname+'/bootstrap/css/bootstrap.css" type="text/css" />');
	$('head').append('<link rel="stylesheet" href="'+__dirname+'/style.css" type="text/css" />');
	$('head').append('<script type="text/javascript" src="'+__dirname+'/node_modules/jquery/dist/jquery.js"></script>');
	$('head').append('<script type="text/javascript" src="'+__dirname+'/bootstrap/js/bootstrap.js"></script>');

	this.drawTabs();
}

nwjstabs.prototype.tabContainer = null;
nwjstabs.prototype.tabNav = null;
nwjstabs.prototype.tabContent = null;
nwjstabs.prototype.tabs = [];


nwjstabs.prototype.controllers = path.resolve(__dirname,'../../controllers');
nwjstabs.prototype.views = path.resolve(__dirname,'../../views');
nwjstabs.prototype.view_engine = 'ejs';


nwjstabs.prototype.drawTabs = function(){
	this.tabContainer = $('<div/>');
	this.tabNav = $('<ul/>', {class: 'nav nav-tabs'});
	this.tabContent =  $('<div/>', {class: 'tab-content'});

	this.tabContainer.append(this.tabNav).append(this.tabContent);

	app.append(this.tabContainer);
}


nwjstabs.prototype.addTab = function(options){
	var self  = this;
	if(!options.id){
		options.id = trataId(options.title);
	}else{
		options.id = trataId(options.id)
	}
	if(this.tabs.indexOf(options.id)>=0){

	}else{
		this.tabs.push(options.id);

		btn_close = $('<button/>',{
			class: 'close',
			type: 'button'
		}).text('x').click(function(){
			closer = $(this);     
			a = closer.parent();
			href = a.attr('href');
			a.parent(	).remove(); 
			var ativo = $(href).hasClass('active');
			$(href).remove();
			var idx = href.substring(1)
			tabs.splice(tabs.indexOf(idx),1);
			if(ativo){
				$('.nav-tabs li:eq(0) a').tab('show');	
			}
		});

		this.tabNav.find('.active').removeClass('active');

		var ancora = $('<a/>',{
			href: '#'+options.id,
			'data-toggle': 'tab'
		});

		if(options.closable){
			ancora.mousedown(function(e) {
				e.stopPropagation();
				if(e.which == 2){
					a = $(this);
					href = a.attr('href');
					a.parent().remove(); 
					var ativo = $(href).hasClass('active');
					$(href).remove();
					var idx = href.substring(1)
					tabs.splice(tabs.indexOf(idx),1);
					if(ativo){
						$('.nav-tabs li:eq(0) a').tab('show');	
					}
					return false;
				}
			})
		}

		if(options.icon){
			ancora.append($('<i/>').addClass(options.icon)).append(' ')
		}
		if(options.closable){
			ancora.append(btn_close)
		}
		ancora.append(options.title);
		ancora.append(btn_close);

		this.tabNav.append($('<li/>',{
			class: 'active'
		}).append(ancora));

		//Content
		var content = $('<div/>', {
			class:'tab-pane active',
			id: options.id
		});

		var view = require(self.view_engine);

		var res = {
			render : function(str,options){
				 if(self.view_engine == 'ejs'){
				 	var html = view.compile(str, options);
				 	content.append(html).appendTo(self.tabContainer);
				 }else if(self.view_engine == 'jade'){
				 	var html = view.render(str, options);
				 	content.append(html).appendTo(self.tabContainer);
				 }
			},
			renderFile : function(str, options){
				
			}
		}

		controller = require(this.controllers+"/"+options.controller);
		controller.controller(res)

	}
}

function trataId(s){
	var r=s.toLowerCase();
	r = r.replace(new RegExp("\\s", 'g'),"");
	r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
	r = r.replace(new RegExp("æ", 'g'),"ae");
	r = r.replace(new RegExp("ç", 'g'),"c");
	r = r.replace(new RegExp("[èéêë]", 'g'),"e");
	r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
	r = r.replace(new RegExp("ñ", 'g'),"n");                            
	r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
	r = r.replace(new RegExp("œ", 'g'),"oe");
	r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
	r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
	r = r.replace(new RegExp("\\W", 'g'),"");
	r = r.replace(/[^\w\s]/gi, '');
	return r;
}



module.exports = new nwjstabs();