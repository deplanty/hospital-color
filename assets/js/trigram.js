function removeFields() {
  // Remove all lines from the view
  let col_1 = document.getElementById("container-0");
  let col_2 = document.getElementById("container-1");

  col_1.innerHTML = "";
  col_2.innerHTML = "";

  n_trigram = 0;
  document.getElementById("trigram-input").focus();
}

function addField(trigram) {
  // Add a line to the view
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
  input.style.color = colorFromBackground(hexa);
  bloc.appendChild(input);
  container.appendChild(bloc);

  // Reset input value
  n_trigram++;
}

function actionInput() {
  // Free text -> hexa + rgb
  let trigram = document.getElementById("trigram-input");
  addField(trigram.value);
  trigram.value = "";
  trigram.focus();
}

function actionSelectMenu() {
  // Hospital -> hexa + rgb
  let select = document.getElementById("trigram-select-menu");
  let trigram = select.options[select.selectedIndex]
  addField(trigram.value);
  select.selectedIndex = 0;
}

function fromText(text) {
  // ZAZxxx -> #FF00FF
  let hexa = "#";
  let tri = text.slice(0, 3);

  return fromTrigram(tri);
}

function fromTrigram(tri) {
  // ZAZ -> #FF00FF
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

function letterToHexa(letter) {
  // A -> 00, Z -> FF
  let base_36 = parseInt(letter, 36);
  let base_26 = base_36 - 10;  // No number allowed
  if (isNaN(base_26)) {
    return ".";
  } else if (base_26 < 0){
    return ".";
  }
  let normalize = Math.round(255 * base_26 / 25);  // [255, 0]
  return intToHexa(normalize);
}

function intToHexa(value) {
  value = value.toString(16);
  if (value.length == 1) {
    value = "0" + value;
  }
  return value
}

function hexaToRGB(hexa) {
  // #FF00FF -> rgb(255, 0, 255)
  let r = parseInt(hexa.slice(1, 3), 16);
  let g = parseInt(hexa.slice(3, 5), 16);
  let b = parseInt(hexa.slice(5), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

function colorFromBackground(hexa) {
  // FF00FF -> 00FF00
  let r = parseInt(hexa.slice(1, 3), 16);
  let g = parseInt(hexa.slice(3, 5), 16);
  let b = parseInt(hexa.slice(5), 16);

  if ((r+g+b)/3 >= 122.5) {
    return "#101010";
  } else {
    return "#e0e0e0";
  }
}

function setOptionsInSelect(list_trigrams) {
  // Put the list of trigrams in the select element
  let select = document.getElementById("trigram-select-menu");
  for (let hospital in list_trigrams) {
    let opt = document.createElement("option");
    let text = document.createTextNode(hospital);
    opt.value = list_trigrams[hospital];
    opt.appendChild(text);
    select.appendChild(opt);
  }
}
