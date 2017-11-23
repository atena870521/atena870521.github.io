'use strict';

function ajax(ajaxOptions) {

    var options = {
        type: ajaxOptions.type || "POST",
        url: ajaxOptions.url || "",
        onComplete: ajaxOptions.onComplete || function () {},
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || "text"
    };

    function httpSuccess(httpRequest) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 ||
                httpRequest.status == 304 ||
                navigator.userAgent.indexOf("Safari") >= 0 && typeof httpRequest.status == "undefined");
        } catch (e) {
            return false;
        }
    }

    var httpReq = new XMLHttpRequest();

    httpReq.open(options.type, options.url, true);

    httpReq.onreadystatechange = function () {

        if (httpReq.readyState == 4) {

            if (httpSuccess(httpReq)) {

                var returnData = (options.dataType == "xml") ? httpReq.responseXML : httpReq.responseText;

                options.onSuccess(returnData);
              
                httpReq = null;

            } else {

                
                options.onError(httpReq.statusText);
            }

        }

    }

    httpReq.send();
}


document.getElementById("pobierz").addEventListener("click", pobierzDane);

function pobierzDane() {

    ajax({
        type: "GET",
        url: "https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php",
        onError: function (msg) {
            console.log(msg);
        },
        onSuccess: function (response) {

            var jsonObj = JSON.parse(response);
            console.log(jsonObj);

            document.getElementById("dane-programisty").innerHTML = jsonObj.imie + <br> + jsonObj.nazwisko + <br> + jsonObj.zawod + <br> + jsonObj.firma;

        }
    });

}
