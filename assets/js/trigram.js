function removeFields() {
  let col_1 = document.getElementById("container-0");
  let col_2 = document.getElementById("container-1");

  col_1.innerHTML = "";
  col_2.innerHTML = "";

  n_trigram = 0;
  document.getElementById("trigram-input").focus();
}

function addField(trigram) {
  let container = document.getElementById("container-" + n_trigram % 2);
  document.getElementById("trigram-input").focus();
  let hexa = ".";
  // Verify input
  if (trigram.length < 3) {
    return;
  } else if (trigram.length == 3) {
    hexa = fromTrigram(trigram);
  } else if (trigram.length > 3) {
    hexa = fromText(trigram);
  }
  // Get hexa code
  if (hexa == "."){
    return;
  }

  // Append a new line
  let form = document.createElement("form");
  form.className = "form-inline";
  let bloc = document.createElement("div");
  bloc.className = "input-group mb-3";
  let div = document.createElement("div");
  div.className = "input-group-prepend";
  let span = document.createElement("span");
  span.className = "input-group-text";
  span.style.fontFamily = "Consolas";
  let text = document.createTextNode(trigram);
  span.appendChild(text);
  div.appendChild(span);
  bloc.appendChild(div);
  form.appendChild(bloc);

  let rgb = hexaToRGB(hexa);
  let hexa_rgb = hexa + " - " + rgb;

  let input = document.createElement("input");
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
  let trigram = document.getElementById("trigram-input");
  addField(trigram.value);
  trigram.value = "";
  trigram.focus();
}

function actionSelectMenu() {
  let select = document.getElementById("trigram-select-menu");
  let trigram = select.options[select.selectedIndex]
  addField(trigram.value);
  select.selectedIndex = 0;
}

function fromTrigram(tri) {
  let hexa = "#";
  let letter = "";
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
  let hexa = "#";
  let tri = text.slice(0, 3);

  return fromTrigram(tri);
}

function letterToHexa(letter) {
  let base_36 = parseInt(letter, 36);
  let base_26 = base_36 - 10;  // No number allowed
  if (base_26 < 0){
    alert("Aucun chiffre n'est accepté");
    return ".";
  }
  let normalize = Math.round(255 * base_26 / 25);  // [255, 0]
  normalize = normalize.toString(16);
  if (normalize.length == 1) {
    normalize = "0" + normalize;
  }
  return normalize;
}

function hexaToRGB(hexa) {
  let r = hexa.slice(1, 3);
  let g = hexa.slice(3, 5);
  let b = hexa.slice(5);

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
