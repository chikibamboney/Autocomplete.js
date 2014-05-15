function Autocomplete(vocabulary) {

    var text = "";
    var suggestWords = [];
    var currActive = "";
    var k = -1;

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

        var sendText = field.value;
        infoSend.innerHTML = sendText;
        infoSend.className = "toserver"
    });

    var completer = document.createElement("div");
    completer.id = "variants";
    

    completer.addEventListener("click", function(e) {

        setValue(e.target.innerHTML);
    });

    completer.addEventListener("mouseover", function(e) {

        for (var m = 0; m < suggestWords.length; m++) {

            document.getElementById("suggest_" + m).className = "";
        }

        if (e.target.id != "variants") {
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

                    if (currActive != "") {

                        if (e.keyCode == 13) {

                            setValue(currActive);
                        }
                    }


                    if (e.keyCode == 40) {

                        k++;

                        if (k > suggestWords.length - 1) {

                            k = 0;
                        }

                        setHover();
                    } else if (e.keyCode == 38) {

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

        var width = awidth || 300;

        if (width < 200) {
            width = 200;
        }

        root.style.width = width + "px";
        form.style.width = width - 44 + "px";
        field.style.width = width - 160 + "px";
        completer.style.width = width - 167 + "px";
    }

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
        completer.style.display = "none";

        if (suggestWords.length > 0) {

            completer.style.display = "block";

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

            arrlike[n].className = "";
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
        completer.style.display = "none";
        k = -1;
    }
}

var usefulWords = ["lift", "Lindsey", "Linda", "Linux", "list", "lirbrary", "Lihtenshtein", "Saab", "Volvo", "BMW", "apple", "orange", "donkey", "pineapple", "lemon", "peach", 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun', "John", "Susan", "Paul", "Alice"];

var h1 = document.createElement("h1");
h1.innerHTML = "My vocabulary:";
document.body.appendChild(h1);

var vocab = document.createElement("p");
vocab.innerHTML = usefulWords.join(",    ");
document.body.appendChild(vocab);

var form = new Autocomplete(usefulWords);

form.setTitle("Simle autocomplete");
form.appendMeToBody();
form.enableMe();

var form1 = new Autocomplete(usefulWords);

form1.appendMeToBody();
form1.enableMe();

var buttonSet = document.createElement("div");
buttonSet.className = "buttonSet";

var buttonTitle = document.createElement("button");
buttonTitle.innerHTML = "Set title";

var buttonSetText = document.createElement("button");
buttonSetText.innerHTML = "Set button text";

var buttonWidth = document.createElement("button");
buttonWidth.innerHTML = "Set form width";

var inputAll = document.createElement("input");
inputAll.type = "text";

buttonTitle.addEventListener("click", function(e) {

    var title = inputAll.value;
    form1.setTitle(title);
});

buttonSetText.addEventListener("click", function(e) {

    var text = inputAll.value || "apply";
    form1.setButtonText(text);
});

buttonWidth.addEventListener("click", function(e) {

    var width = inputAll.value;
    form1.setWidth(width);
});

buttonSet.appendChild(inputAll);
buttonSet.appendChild(buttonTitle);
buttonSet.appendChild(buttonSetText);
buttonSet.appendChild(buttonWidth);
document.body.appendChild(buttonSet);
