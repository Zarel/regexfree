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
  let output;
  try {
    output = XRegExp(input, options).toString();
  } catch (e) {
    output = (e as Error).message;
    outputBox.value = output;
    outputBox.className = 'error';
    autosize(outputBox);
    return;
  }
  if (!input) {
    output = '';
  } else if (output === '/(?:)/') {
    output = stringOut ? '""' : '/(?:)/';
  } else {
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
    // do the replacement twice so single characters surrounded by spaces are prettified on both sides
    output = output.replace(
      /(.)\(\?\:\)(.)/g,
      (match, before, after) => (
        /[0-9]/.test(before) && /[0-9]/.test(after) ? match : before + after
      )
    );

    // spaces no longer need to be escaped
    output = output.replace(/\\ /g, ' ');

    if (stringOut) output = '"' + output.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  outputBox.className = '';
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
