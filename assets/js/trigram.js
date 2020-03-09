function removeFields() {
  var col_1 = document.getElementById("container-0");
  var col_2 = document.getElementById("container-1");

  col_1.innerHTML = "";
  col_2.innerHTML = "";

  n_trigram = 0;
  document.getElementById("trigram-input").focus();
}

function addField(trigram) {
  var container = document.getElementById("container-" + n_trigram % 2);
  document.getElementById("trigram-input").focus();
  // Verify input
  if (trigram.length < 3) {
    return;
  } else if (trigram.length == 3) {
    var hexa = fromTrigram(trigram);
  } else if (trigram.length > 3) {
    var hexa = fromText(trigram);
  }
  // Get hexa code
  if (hexa == "."){
    return;
  }

  // Append a new line
  var form = document.createElement("form");
  form.className = "form-inline";
  var bloc = document.createElement("div");
  bloc.className = "input-group mb-3";
  var div = document.createElement("div");
  div.className = "input-group-prepend";
  var span = document.createElement("span");
  span.className = "input-group-text";
  span.style.fontFamily = "Consolas";
  var text = document.createTextNode(trigram);
  span.appendChild(text);
  div.appendChild(span);
  bloc.appendChild(div);
  form.appendChild(bloc);

  var rgb = hexaToRGB(hexa);
  var hexa_rgb = hexa + " - " + rgb;

  var input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.style.background = hexa;
  input.value = hexa_rgb;
  input.disabled = true;
  bloc.appendChild(input);
  container.appendChild(bloc);

  // Reset input value
  n_trigram++;
}

function actionInput() {
  var trigram = document.getElementById("trigram-input");
  addField(trigram.value);
  trigram.value = "";
  trigram.focus();
}

function actionSelectMenu() {
  var select = document.getElementById("trigram-select-menu");
  var trigram = select.options[select.selectedIndex]
  addField(trigram.value);
  select.selectedIndex = 0;
}

function fromTrigram(tri) {
  var hexa = "#";
  var letter = "";
  for (i = 0; i < 3; i++) {
    letter = letterToHexa(tri[i]);
    if (letter == "."){
      return "."
    } else {
      hexa += letter;
    }
  }
  return hexa;
}

function fromText(text) {
  var hexa = "#";
  var tri = text.slice(0, 3);

  return fromTrigram(tri);
}

function letterToHexa(letter) {
  var base_36 = parseInt(letter, 36);
  var base_26 = base_36 - 10;  // No number allowed
  if (base_26 < 0){
    alert("Aucun chiffre n'est accepté");
    return ".";
  }
  var normalize = Math.round(255 * base_26 / 25);  // [255, 0]
  normalize = normalize.toString(16);
  if (normalize.length == 1) {
    normalize = "0" + normalize;
  }
  return normalize;
}

function hexaToRGB(hexa) {
  var r = hexa.slice(1, 3);
  var g = hexa.slice(3, 5);
  var b = hexa.slice(5);

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
