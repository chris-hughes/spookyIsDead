var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://www.check-mot.service.gov.uk/";
  

request.post(	
	{	url: "https://www.check-mot.service.gov.uk/",
  	form: {registration:'OY55 JZA', manufacturer: 'NISSAN'}
	},
  function(err,httpResponse,body){
  	if (err) {
			console.log("We’ve encountered an error: " + error);
		} else {

			var $ = cheerio.load(body),
	    
	    title = $("h2").html();
	    console.log(title);
	    
		}
	}
)