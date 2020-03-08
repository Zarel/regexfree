declare var XRegExp: any;

const inputBox = document.getElementById('input') as HTMLTextAreaElement;
const outputBox = document.getElementById('output') as HTMLTextAreaElement;
const nFlagCheckbox = document.getElementById('nflag') as HTMLInputElement;
const literalOutRadio = document.getElementById('literalout') as HTMLInputElement;
const stringOutRadio = document.getElementById('stringout') as HTMLInputElement;

function autosize(textbox: HTMLTextAreaElement) {
  textbox.style.height = `50px`;
  const newHeight = Math.max(textbox.scrollHeight, 50);
  textbox.style.height = `${newHeight}px`;
}

function convert() {
  const nFlag = nFlagCheckbox.checked;
  const stringOut = stringOutRadio.checked;
  const options = 'x' + (nFlag ? 'n' : '');

  const input = inputBox.value;
  let output = input === '' ? '' : XRegExp(input, options).toString();
  output = output.replace(/\(\?\:\)/g, ''); // weird artifact of toString
  output = output.replace(/\\ /g, ' '); // spaces no longer need to be escaped
  if (stringOut) output = '"' + output.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  outputBox.value = output;
  autosize(outputBox);
}

inputBox.oninput = () => {
  autosize(inputBox);
  convert();
};
nFlagCheckbox.onchange = () => {
  convert();
};
literalOutRadio.onchange = () => {
  convert();
};
stringOutRadio.onchange = () => {
  convert();
};
convert();
