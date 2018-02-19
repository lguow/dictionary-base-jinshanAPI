(function($) {
	$(document).ready(function() {
		$(document).keyup(function(event) {
			if (event.keyCode == 13) {
				$(".btn").trigger("click"); //触发事件
			}
		});

		$(".btn").click(function() {
			//查之前清空
			$("#shiyi").empty();
			$(".sy").html('');
			var words = $(".ipt>input").val();
			if (!words) {
				return false
			};
			var time = Date.now();
			$.ajax({
				url: "http://www.iciba.com/index.php?a=getWordMean&c=search&list=1%2C2%2C3%2C4%2C5%2C8%2C9%2C10%2C12%2C13%2C14%2C15%2C18%2C21%2C22%2C24%2C3003%2C3004%2C3005&word=" + words + "&_=" + time,
				type: "GET",
				dataType: "jsonp",
				success: function(data) {
					if (data.baesInfo.ciba_translate_result != '') {
						$("#word").html(data.baesInfo.word_name);
						var len = data.baesInfo.symbols.length;
						var result = '';
						for (var i = 0; i < len; i++) {
							console.log(data.baesInfo.symbols[i]);
							var len1 = data.baesInfo.symbols[i].parts.length;
							var html = '';
							for (var j = 0; j < len1; j++) {
								var means = data.baesInfo.symbols[i].parts[j].means;
								var part = data.baesInfo.symbols[i].parts[j].part;
								var meansHtml = '';
								for (var k = 0; k < means.length; k++) {
									meansHtml += means[k] + '；'
								}
								html += '<li><p><span>' + part + '</span>' + meansHtml + '</p></li>';
							}
							result += html;
						}
						$("#shiyi").html(result);


						//双语
						var syresults = '';
						for (var j = 0; j < data.sentence.length; j++) {
							var html = '';
							html += '<ul>';
							html += '	<li>';
							html += '		<p><span>' + (j + 1) + '.</span>' + data.sentence[j].Network_en + '</p>';
							html += '		<p>' + data.sentence[j].Network_cn + '</p>';
							html += '	</li>';
							html += '</ul>';
							html += '<p><br></p>';
							syresults += html;
						}
						$(".sy").html(syresults);
						//常用词组

					} else {

						$("#word").html('未查到该词!0.0');
					}

				}
			});

		});


	});
})($)