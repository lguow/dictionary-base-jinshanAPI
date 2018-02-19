(function($) {
	$(document).ready(function() {
		$(document).keyup(function(event){
			if(event.keyCode ==13){
				$(".btn").trigger("click"); //触发事件
			}
		});

		$(".btn").click(function() {
			//查之前清空
			$("#shiyi").empty();
			$(".sy").html('');
			var words = $(".ipt>input").val();
			if(!words){
				return false
			}
			var time = Date.now();
			$.ajax({
				url: "http://www.iciba.com/index.php?a=getWordMean&c=search&list=1%2C2%2C3%2C4%2C5%2C8%2C9%2C10%2C12%2C13%2C14%2C15%2C18%2C21%2C22%2C24%2C3003%2C3004%2C3005&word="+words+"&_="+time,
				type: "GET",
				dataType: "jsonp", 
				success: function(data) {
					if(data.baesInfo.ciba_translate_result != ''){
						$("#word").html(data.baesInfo.word_name);
						var shiyi = data.baesInfo.symbols[0].parts[0].means;
						var shiyiText = '';
						for(var i = 0; i<shiyi.length; i++){
							shiyiText += shiyi[i]+'；'
						}
						$("#shiyi").html(shiyiText);
						//双语
						var syresults = '';
						for(var j = 0; j < data.sentence.length;j++){
							var html = '';
							html += '<ul>';
							html += '	<li>';
							html += '		<p><span>'+(j+1)+'.</span>'+data.sentence[j].Network_en+'</p>';
							html += '		<p>'+data.sentence[j].Network_cn+'</p>';
							html += '	</li>';
							html += '</ul>';
							html += '<p><br></p>';
							syresults += html;
						}
						$(".sy").html(syresults);
					}else{

						$("#word").html('未查到该词!0.0');
					}
					
				}
			});

		});


	});
})($)



