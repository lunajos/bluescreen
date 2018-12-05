
$(document).ready ( function () {

    // Deployment
    var urlCProxy = 'https://cors-anywhere.herokuapp.com/https://www2.wb.psu.edu/messageboard/cancelxml.asp';
    var urlMProxy = 'https://cors-anywhere.herokuapp.com/https://www2.wb.psu.edu/messageboard/xml.asp';
    // Development
    var urlC = "https://www2.wb.psu.edu/messageboard/cancelxml.asp";
    var urlM = "https://www2.wb.psu.edu/messageboard/xml.asp";

    var xmlhttp;

    showDate();                         // Show time and date by Default
    $('#cancelations-content').hide();  // Hide Cancelations by Default
    loadXML(urlMProxy);                 // Show Blue Screen by Default


    // Refactor to use JQuery Library
    // Only Leading Request once every 0.5 seconds clicked
    document.getElementById('cancelations').onclick = _.debounce(showCancelations, 500, true);
    document.getElementById('blue-screen').onclick = _.debounce(showBlueScreen, 500, true);

    // Show Blue Screen only
    function showBlueScreen() {
            showDate();         // Refresh date once clicked
            loadXML(urlMProxy); // Load Blue Screen
            $('#blue-screen-content').empty();   // Reset
            $('#blue-screen-content').show();   // Toggle
    }

    // Show Cancelations only
    function showCancelations(){
        showDate();             // Refresh date once clicked
        loadXML(urlCProxy);     // Load Cancelations

        $("#blue-screen-content").empty();  // Reset
        $('#blue-screen-content').show();   // Toggle
    }
    // Show Current Date in special format
    function showDate() {
        var date, formatedDate;
        date = new formatDate();

        // Format Date String
        formatedDate =  date.dayOfWeek + ', '+ date.month + ' ' +  date.day  + ', ' + date.year + ' - ' + date.time();
        document.getElementById('date-time').innerHTML = formatedDate;
    }

    // Format Dates Accordingly
    function formatDate () {

        var d, formatedDate, dateContent;
        var weekdays = ['Sunday', 'Monday', 'Tuesday','Wednesday' ,'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        d = new Date();

        // date to format
        dateContent = {
            day: d.getDate(),
            dayOfWeek: weekdays[d.getDay()],
            month: months[d.getMonth()],
            year: d.getFullYear(),
            time: function () {
                var time, hrs, mins, MA;
                mins = '00';

                // check for Morning or Afternoon
                if (d.getHours() > 12) {
                    hrs = d.getHours() - 12;
                    MA = 'pm';
                } else {
                    hrs = d.getHours();
                    MA = 'am';
                }

                if (d.getMinutes() < 10) {
                    mins = '0';
                    mins += d.getMinutes().toString();
                } else {
                    mins = d.getMinutes().toString();
                }

                // concat time
                time = hrs + ':' + mins + ' ' + MA;
                return time;
            }
        };
        return dateContent;
    }

    // Show Status codes to Debug
    function showError(status) {
        console.log("ERROR Status code: " + status);
        $('.message').html("<p> Sorry, we recieved a " + state + " error code</p>");
    }

    // Show Status
    function showWaitBuff(state) {
        $('#message-content').show();
        $('#loading-animation').show();
        // $('#cancelations').attr("disabled", "disabled");
        // $('#blue-screen').attr("disabled", "disabled");
        switch (state) {
            case 0:
                state = "Please Wait...";
                //document.getElementById('brick').style.width = "5%";
                break;
            case 1:
                state = "Processing Request...";
                //document.getElementById('brick').style.width = "75%";
                break;
            case 2:
                state = "Doing Some Work...";
                //document.getElementById('brick').style.width = "85%";
                break;
            case 3:
                state = "Almost Done";
                //document.getElementById('brick').style.width = "90%";
                break;
            case 4:
                state = "Done";
                //document.getElementById('brick').style.width = "100%";
                $('#message-content').hide();
                $('#loading-animation').hide();
                // $("#cancelations").removeAttr("disabled");
                // $('#blue-screen').removeAttr('disabled');
                break;
        }
            document.getElementById('message-content').innerHTML = state;
    }
    // Establish Request and load XML
    function loadXML(file) {

        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        // Show status of request
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                showXML(this);
                showWaitBuff(this.readyState);
            } else if (this.readyState >= 0 && this.readyState < 4) {
                showWaitBuff(this.readyState);
            } else if (this.status >= 300) {
                showError(this.status);
            }
        };
        xmlhttp.open("GET", file, true);
        xmlhttp.send();
    }

    // Display each element with data only
    function showXML(xml) {
        // Initialize vars
        var message, i, xmlDoc, x, section;

        xmlDoc = xml.responseXML;
        message = xmlDoc.getElementsByTagName("Message");


        for(i = 0; i < message.length ; i++){
            $('#blue-screen-content').append('<div class="jumbotron">');
            jumbo = document.getElementsByClassName('jumbotron');

            for(x = 0; x < message[i].childNodes.length; x++){
                if(message[i].childNodes[x].innerHTML.length) {     // xml content to DOM
                    if (x==0) {     // Make first line a title
                        jumbo[i].innerHTML += '<span class="top">' +  message[i].childNodes[x].innerHTML + '</span> ';
                    } else {
                        jumbo[i].innerHTML +=  message[i].childNodes[x].innerHTML + ' ';

                    }
                }// end if
            } // end last for

        } // end first for
    } // end showXML function



}); // end Document Ready


