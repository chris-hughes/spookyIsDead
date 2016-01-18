var request = require("request"),
		cheerio = require("cheerio");
  

request.post(	
	{	url: "https://www.check-mot.service.gov.uk/",
  	form: {registration:'M99 LOT', manufacturer: 'LOTUS'}
	},
  function(err,httpResponse,body){
  	if (err) {
			console.log("We’ve encountered an error: " + error);
		} else {

			var $ = cheerio.load(body),
	    chris = [];

			function uniq(a){
				var seen = {};
				return a.filter(function(item){
					return seen.hasOwnProperty(item) ? false : (seen[item] = true);
				});
			}

			$('.testresult').each(function(test){
				var mot_test = {};

				// var id = test;              
				// mot_test["MOTid"] = test;   // removed this (see notes in ./model/mot.js)

				$(this).children().each(function(row){
					var fields = [];

					$(this).children().each(function(d){
						if ($(this).children()[0]){
							fields.push($(this).children().first().text());

							$(this).children('.group').each(function(a){
								fields.push($(this).text());
							})
						} else {
							fields.push($(this).text());
						}
					});

					var name = fields[0].replace(/\s+/g,'').replace(/[{()}]/g,'');
					
					if (fields.length==2){
						mot_test[name] = fields[1];
					} else if (fields.length>2){
						fields.shift(); // removes the first value which is used as the name
						fields = uniq(fields);
						fields.shift(); // really bad, for some reason the first value is always ""

						mot_test[name] = fields;
					}
				});
				chris.push(mot_test);
			});

			var mot = {};
			mot["Regno"] = 'M99 LOT';
			mot["Tests"] = chris;

			console.log(mot);
			return mot;
		}
	}	
)