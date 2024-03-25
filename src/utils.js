import {item_props, nostalgic_total, personal_total, practical_total} from "./items_info";
const nostalgic_color = 'ff8e42';
const practical_color = '2b9278';
const personal_color = '922b4a';

export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function addAlpha(color, opacity) {
  // coerce values so it is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

export function parseResults(items) {
  let nostalgic_sum = 0, personal_sum = 0, practical_sum = 0;
  items.forEach(el => {
    if (item_props[el]) {
      const {nostalgic, practical, personal} = item_props[el];
      nostalgic_sum += nostalgic;
      practical_sum += practical;
      personal_sum += personal;
    }
  })
  const nostalgic_ratio = nostalgic_sum === 0 ? 0 : nostalgic_sum / (2 * nostalgic_total) + 0.5;
  const practical_ratio = practical_sum === 0 ? 0 : practical_sum / (2 * practical_total) + 0.5;
  const personal_ratio = personal_sum === 0 ? 0 : personal_sum / (2 * personal_total) + 0.5;
  console.log(nostalgic_sum, " / ", nostalgic_total);
  console.log(practical_sum, " / ", practical_total);
  console.log(personal_sum, " / ", personal_total);

  const list_of_colors = []
  if (nostalgic_ratio) {
    list_of_colors.push(addAlpha(nostalgic_color, nostalgic_ratio));
  }
  if (practical_ratio) {
    list_of_colors.push(addAlpha(practical_color, practical_ratio));
  }
  if (personal_ratio) {
    list_of_colors.push(addAlpha(personal_color, personal_ratio));
  }
  return list_of_colors.length ? list_of_colors.join(',') : "fff";
}
