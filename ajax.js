/*
	This function is for the auto search tab for the staff and room directory based
	on your Staff Directory spreadsheet.  MAKE SURE that the spreadsheet is public.
*/
$("#search").keyup(function(){
	var searchField = $("#search").val();
	var myExp = new RegExp(searchField,"i");

	$.getJSON("http://spreadsheets.google.com/feeds/list/insertYourGoogleSpreadsheetKeyInHere/od6/public/values?alt=json",
	function(data){
		var staff = data.feed.entry;
		var output = '<ul class="searchresults">';
		$.each(staff,function(key,val){
			if(((val.gsx$last.$t).search(myExp) != -1) || ((val.gsx$first.$t).search(myExp) != -1 )){
				output += '<li>';
				output += '<h3>' + val.gsx$first.$t + " " + val.gsx$last.$t + '</h3>';
				output += '<p>' + "ext " + val.gsx$extension.$t + '</p>';
				output += '<p>' + val.gsx$email.$t + '</p>';
				output += '<p><b>SCHEDULE</b></p>';
				output += '<p>' + val.gsx$schedule.$t + '</p>';
				output += '</li>';
				output += '<hr>';
			}
		})
		output += '</ul>';
		$('#update').html(output);
	});
	
});


/*
	This function is for populating the links and apps tab based on the data that is
	in your URLs spreadsheet.
*/
$(document).ready(function(){
	/*
		Data pulled from first sheet (Links)
	*/
	$.getJSON("http://spreadsheets.google.com/feeds/list/insertYourGoogleSpreadsheetKeyInHere/1/public/values?alt=json",
		function(data){
			var links = data.feed.entry;
			var col = 0;
			var table = "<table cellspacing='20' cellpadding='10'><tr class='rowlinks'>";
		for(var i=0; i<links.length; i++){
			
			if(i % 4 == 0){
				table += "</tr><tr class='rowlinks'>";
			}
			
			table += "<td class='links'>" + "<a href='" + links[i].gsx$url.$t + "' target='_blank' style='text-decoration:none;' >" + links[i].gsx$name.$t + "</a></td>";

		}
			table += "</tr></table>";
		$("#table").html(table);
		});
	
	/*
		Data pulled from second sheet (Apps)
	*/
	$.getJSON("http://spreadsheets.google.com/feeds/list/insertYourGoogleSpreadsheetKeyInHere/2/public/values?alt=json",
		function(data){
			var links = data.feed.entry;
			var col;
			var table = "<table cellspacing='20' cellpadding='10'><tr class='rowlinks'>";
		for(var i=0; i<links.length; i++){
	
			if(i % 3 == 0){
				table += "</tr><tr class='rowlinks'>";
			}
			table += "<td class='links2'>" + "<a href='" + links[i].gsx$url.$t + "' target='_blank' style='text-decoration:none;' ><div class='container'>" +
				"<img src='" + links[i].gsx$image.$t + "'/>" + "<p>" + links[i].gsx$name.$t + "</p></div></a></td>";
			
		}
			table += "</tr></table>";
		$("#tabs-3").append(table);
		});
			
});
