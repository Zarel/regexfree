declare function XRegExp(regex: string, flags?: string): RegExp;

const inputBox = document.getElementById('input') as HTMLTextAreaElement;
const outputBox = document.getElementById('output') as HTMLTextAreaElement;
const nFlagCheckbox = document.getElementById('nflag') as HTMLInputElement;
const literalOutRadio = document.getElementById('literalout') as HTMLInputElement;
const stringOutRadio = document.getElementById('stringout') as HTMLInputElement;

function autosize(textbox: HTMLTextAreaElement) {
  textbox.style.height = `50px`;
  const newHeight = Math.max(textbox.scrollHeight + 4, 50);
  textbox.style.height = `${newHeight}px`;
}

function convert() {
  const nFlag = nFlagCheckbox.checked;
  const stringOut = stringOutRadio.checked;
  const options = 'x' + (nFlag ? 'n' : '');

  const input = inputBox.value;
  let output = input === '' ? '' : XRegExp(input, options).toString();

  // XRegExp is too conservative about adding (?:)
  // it's only needed between digits
  // make output prettier by removing it between anything else
  // there are several false negatives here, but they don't actually matter
  output = output.replace(
    /(.)\(\?\:\)(.)/g,
    (match, before, after) => (
      /[0-9]/.test(before) && /[0-9]/.test(after) ? match : before + after
    )
  );

  output = output.replace(/\\ /g, ' '); // spaces no longer need to be escaped
  if (stringOut) output = '"' + output.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  else if (output === '//') output = '/(?:)/';
  outputBox.value = output;
  autosize(outputBox);
}

inputBox.oninput = () => {
  autosize(inputBox);
  convert();
};
inputBox.onchange = () => {
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
