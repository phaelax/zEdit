
(function($){
	$.fn.zedit = function($source){

		if(this.is('[type=file]')){
			// Hides the input element
			this.addClass('zinput');
			
			// Get adjacent label element following this file input
			$label = $(this).next('label');
      
			// Set default background
			if($source){
				$label.css("background-image","url("+$source+")");
			}
			
			this.change(function(){
				$label =  $(this).next('label');

				var reader = new FileReader();
				reader.onload = function(e){
					$label.css("background-image","url("+e.target.result+")")
				}
				// If a file was selected
				if(this.files[0])
					reader.readAsDataURL(this.files[0]);
			});
		}
		return this;
	};
}(jQuery));



$(function(){
	$('.editme').dblclick(function(e){
		if(!$(this).has('textarea').length){
			$html = '<textarea class="ztextarea" style="width:'+$(this).width()+'px;height:'+$(this).height()+'px;">'+$(this).html()+'</textarea>';
			$(this).empty();
			$(this).html($html);
		
			/*
			var $t = $(this).find("textarea");
			$t.bind("enterKey", function(e){
				$p = $(e.target).parent();
				$p.empty();
				$p.html($t.val());
			});
			*/
			
			$(this).find("textarea").keyup(function(e){
				if(e.keyCode == 13 && !e.shiftKey){
					$p = $(e.target).parent();
					$p.empty();
					$p.html($(this).val());
				}
			});
		}
	});

	
	
	$(document).click(function(e){
		if(!$(e.target).closest('.editme').has('textarea').length){
			$p = $('.editme').has('textarea');

			if($p.length){
				var $el = $p.children();
				$p.empty();
				$p.html($el.val());
			}
		}
	});
});
