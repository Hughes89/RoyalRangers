module.exports = {
  addTargetBlank: (html) => {
    let length = html.length;
    let temp = '';
    for (let i = 0; i < length; i++) {
      if (i === 2) {
        temp += ' target="blank"';
      } else {
        temp += html[i];
      }
    }
    return temp;
  }
};