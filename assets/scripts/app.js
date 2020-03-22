---
---

window.onload = function() {
    console.log("Retrieve initial data...");
    getData();
}

var controlCenterSheetUrl = 'https://spreadsheets.google.com/feeds/cells/{{site.spreadsheet}}/1/public/full?alt=json';
var scoreSheetUrl = 'https://spreadsheets.google.com/feeds/cells/{{site.spreadsheet}}/2/public/full?alt=json';

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function getData() {

        $.getJSON(scoreSheetUrl, function(data){
            var entry = data.feed.entry;
            // console.log(entry);

            // These are set out in the same order as the Google Sheet, but they don't need to be.
            var country = []; 
            var score = []; 
            var runningOrder = []; 
            var rankOrder = []; 
            var nowPlaying = []; 
            var artist = [];
            var songTitle = [];

            for (var i = 5; i < entry.length; i += 5) {
                // entry[i].content.$t retrieves the content of each cell
                // the i and the i+(i-1) needs to correlate to the number of columns in the Google Sheet
                country.push(entry[i].content.$t);
                score.push(entry[i+1].content.$t);
                runningOrder.push(entry[i+2].content.$t);
                rankOrder.push(entry[i+3].content.$t);
                nowPlaying.push(entry[i+4].content.$t);
            }
                
            console.log(country);
            console.log(score);
            console.log(runningOrder);
            console.log(rankOrder);
            console.log(nowPlaying);
    
            var scoresOutput = "";

            scoresOutput += '<header class="scores--header"></header>';

            for (var i = 0; i < country.length; i++) {
                
                scoresOutput += '<div class="scores--entry running-order-' + runningOrder[i] + ' rank-order-' + rankOrder[i] + ' now-playing-' + nowPlaying[i] + '">'
                scoresOutput += '<div class="grid-entry--running-order"><span class="number">#' + runningOrder[i] + '</span></div>'
                scoresOutput += '<div class="grid-entry--country">' + country[i] + '</div>'
                scoresOutput += '<div class="grid-entry--score">' + score[i] + '</div>'
                scoresOutput += '</div>'

                $('#scores').html(scoresOutput);

            }

        })

        $.getJSON(controlCenterSheetUrl, function(data){
            var entry = data.feed.entry;
            // console.log(entry);

            // These are set out in the same order as the Google Sheet, but they don't need to be.
            var metadata = [];
    
            for (var i = 0; i < entry.length; i += 2) {
                // entry[i].content.$t retrieves the content of each cell
                // the i and the i+(i-1) needs to correlate to the number of columns in the Google Sheet
                metadata.push(entry[i+1].content.$t);
            }

            console.log(metadata);

            var messagesOutput = "";
            var metadataOutput = "";

            messagesOutput += '<span class="control-center--message">Messages</span>';
            messagesOutput += '<span class="control-center--message-title">' + metadata[0] + '</span>';
            messagesOutput += '<span class="control-center--message-content">' + metadata[1] + '</span>';
            
            metadataOutput += '<span class="control-center--now-playing">Now playing</span>';
            metadataOutput += '<span class="control-center--country"><strong>' + metadata[2] + '</strong></span>';
            metadataOutput += '<span class="control-center--artist">' + metadata[3] + '</span>';
            metadataOutput += '<span class="control-center--title">' + metadata[4] + '</span>';

            $('#control-center--messages').html(messagesOutput);
            $('#control-center--metadata').html(metadataOutput);
            
        })

        updateData();

};

function updateData() {
	setInterval(
		function(){

            $.getJSON(scoreSheetUrl, function(data){
                var entry = data.feed.entry;
                // console.log(entry);
    
                // These are set out in the same order as the Google Sheet, but they don't need to be.
                var country = []; 
                var score = []; 
                var runningOrder = []; 
                var rankOrder = []; 
                var nowPlaying = []; 
                var artist = [];
                var songTitle = [];
    
                for (var i = 5; i < entry.length; i += 5) {
                    // entry[i].content.$t retrieves the content of each cell
                    // the i and the i+(i-1) needs to correlate to the number of columns in the Google Sheet
                    country.push(entry[i].content.$t);
                    score.push(entry[i+1].content.$t);
                    runningOrder.push(entry[i+2].content.$t);
                    rankOrder.push(entry[i+3].content.$t);
                    nowPlaying.push(entry[i+4].content.$t);
                }
                    
                console.log(country);
                console.log(score);
                console.log(runningOrder);
                console.log(rankOrder);
                console.log(nowPlaying);
        
                var scoresOutput = "";
    
                scoresOutput += '<header class="scores--header"></header>';
    
                for (var i = 0; i < country.length; i++) {
                    
                    scoresOutput += '<div class="scores--entry running-order-' + runningOrder[i] + ' rank-order-' + rankOrder[i] + ' now-playing-' + nowPlaying[i] + '">'
                    scoresOutput += '<div class="grid-entry--running-order"><span class="number">#' + runningOrder[i] + '</span></div>'
                    scoresOutput += '<div class="grid-entry--country">' + country[i] + '</div>'
                    scoresOutput += '<div class="grid-entry--score">' + score[i] + '</div>'
                    scoresOutput += '</div>'
    
                    $('#scores').html(scoresOutput);
    
                }
    
            })
    
            $.getJSON(controlCenterSheetUrl, function(data){
                var entry = data.feed.entry;
                // console.log(entry);
    
                // These are set out in the same order as the Google Sheet, but they don't need to be.
                var metadata = [];
        
                for (var i = 0; i < entry.length; i += 2) {
                    // entry[i].content.$t retrieves the content of each cell
                    // the i and the i+(i-1) needs to correlate to the number of columns in the Google Sheet
                    metadata.push(entry[i+1].content.$t);
                }
    
                console.log(metadata);
    
                var messagesOutput = "";
                var metadataOutput = "";
    
                messagesOutput += '<span class="control-center--message">Messages</span>';
                messagesOutput += '<span class="control-center--message-title">' + metadata[0] + '</span>';
                messagesOutput += '<span class="control-center--message-content">' + metadata[1] + '</span>';
                
                metadataOutput += '<span class="control-center--now-playing">Now playing</span>';
                metadataOutput += '<span class="control-center--country"><strong>' + metadata[2] + '</strong></span>';
                metadataOutput += '<span class="control-center--artist">' + metadata[3] + '</span>';
                metadataOutput += '<span class="control-center--title">' + metadata[4] + '</span>';
    
                $('#control-center--messages').html(messagesOutput);
                $('#control-center--metadata').html(metadataOutput);
                
            })

            console.log("Update data");
		}, 
	60000);
};