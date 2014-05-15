

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
    form.setTitle(title);
});

buttonSetText.addEventListener("click", function(e) {

    var text = inputAll.value || "apply";
    form.setButtonText(text);
});

buttonWidth.addEventListener("click", function(e) {

    var width = inputAll.value;
    form.setWidth(width);
});

buttonSet.appendChild(inputAll);
buttonSet.appendChild(buttonTitle);
buttonSet.appendChild(buttonSetText);
buttonSet.appendChild(buttonWidth);
document.body.appendChild(buttonSet);



