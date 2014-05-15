"use strict";

function Autocomplete(vocabulary) {

    var text = "";
    var suggestWords = [];
    var currActive = "";
    var k = -1;
    var keyDown = 40;
    var keyUp = 38;
    var keyEnter = 13
    var width = 500;

    var root = document.createElement("div");
    root.id = "autocomplete";

    var form = document.createElement("fieldset");

    var titleEl = document.createElement("legend");
    titleEl.innerHTML = "Title";

    var field = document.createElement("input");
    field.type = "text";
    field.id = "inputtext";

    var infoSend = document.createElement("h1");
    document.body.appendChild(infoSend);

    var button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "Search";
    button.addEventListener("click", function(e) {

        if (field.value) {

            var sendText = field.value;

            setValue(sendText);

            infoSend.innerHTML = sendText;
            infoSend.className = "toserver";
        } 
        else {

            infoSend.className = "none";
            infoSend.innerHTML = "";
        }
    });

    var completer = document.createElement("div");
    completer.id = "variants";

    completer.addEventListener("click", function(e) {

        setValue(e.target.innerHTML);
    });

    completer.addEventListener("mouseover", function(e) {

        for (var m = 0; m < suggestWords.length; m++) {

            document.getElementById("suggest_" + m).className = null;
        }

        if (e.target.id !== "variants") {
            setActive(e.target.id);
        }

        k = +(e.target.id).substring(8);

    });

    this.setTitle = function(title) {

        titleEl.innerHTML = title || "Autocomplete";
    };

    this.setButtonText = function(text) {

        button.innerHTML = text || "Search";
    };

    this.appendMeToBody = function() {

        root.appendChild(form);
        form.appendChild(titleEl);
        form.appendChild(field);
        form.appendChild(button);
        root.appendChild(completer);

        document.body.appendChild(root);
    };

    this.enableMe = function() {

        field.addEventListener('keyup', function(e) {

            var prevText = text;
            text = field.value;

            if (prevText != text) {

                findSuggestions(text);
            }

            if (text) {

                if (suggestWords.length) {

                    if (currActive) {

                        if (e.keyCode == keyEnter) {

                            setValue(currActive);
                        }
                    }

                    if (e.keyCode == keyDown) {

                        k++;

                        if (k > suggestWords.length - 1) {

                            k = 0;
                        }

                        setHover();

                    } else if (e.keyCode == keyUp) {

                        k--;

                        if (k < 0) {

                            k = suggestWords.length - 1;
                        }

                        setHover();
                    }
                }
            }
        });
    };

    this.disableMe = function() {};

    this.setWidth = function(awidth) {

        width = awidth || 300;

        if (width < 200) {
            width = 200;
        }

        root.style.width = width + "px";
        form.style.width = width - 44 + "px";
        field.style.width = width - 160 + "px";
        completer.style.width = width - 167 + "px";

        this.saveParams();
    }

    this.saveParams = function() {

        var myWidht = width;

        var myCookie = escape(myWidht);

        var expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (60 * 10000));

        document.cookie = "myCookie=" + myCookie + ";" + "expires=" + expiryDate.toGMTString() + ";"
    };

    this.getParams = function() {

        var myCookieString = unescape(document.cookie);
        var dataList = myCookieString.split("=");

        if (dataList[0] === "myCookie") {

            width = dataList[1];

            this.setWidth(width);
        }
    };

    function findSuggestions(word) {

        var currArray = [];
        var suggest = 0;

        for (var i = 0; i < vocabulary.length; i++) {

            suggest = 0;

            for (var j = 0; j < word.length; j++) {

                if (vocabulary[i].charAt(j) == word[j] || vocabulary[i].charAt(j).toUpperCase() == word[j] || vocabulary[i].charAt(j).toUpperCase() == word[j].toUpperCase()) {


                    suggest += 1;
                }

                if (suggest == word.length) {

                    currArray.push(vocabulary[i]);
                }
            }
        }

        suggestWords = currArray;
        showSuggestions();
    }

    function showSuggestions() {

        completer.innerHTML = "";

        completer.className = "hide";

        if (suggestWords.length > 0) {

            completer.className = "show";

            for (var i = 0; i < suggestWords.length; i++) {

                var currP = document.createElement("p");
                currP.innerHTML = suggestWords[i];
                completer.appendChild(currP);
                currP.id = "suggest_" + i;
            }
        }
    }

    function setHover() {

        var arrlike = completer.querySelectorAll("p");

        for (var n = 0; n < arrlike.length; n++) {

            arrlike[n].className = "null";
        }

        currActive = suggestWords[k];
        setActive("suggest_" + k)
    }

    function setActive(elem) {

        document.getElementsByClassName("choosen").className = "";
        document.getElementById(elem).className = "choosen";
    }

    function setValue(text) {

        field.value = text;

        completer.innerHTML = "";
        completer.className = "hide";
        k = -1;
    }
}