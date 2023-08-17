export default function validationPoke(input) {
  const errors = {};
  if (!/[A-Za-z]{3,}/.test(input.name) || input.name.length > 12) {
    errors.name = "Invalid name";
  }
  if (!/^[0-9]+$/.test(input.health) || input.health > 100) {
    errors.health = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.speed) || input.speed > 100) {
    errors.speed = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.attack) || input.attack > 100) {
    errors.attack = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.defense) || input.defense > 100) {
    errors.defense = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.height) || input.height > 100) {
    errors.height = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.weight) || input.weight > 100) {
    errors.weight = "Invalid Number";
  }
  if (!input.types.length || input.types.length > 2) {
    errors.types = "Select at least one";
  }
  if (input.img && !/^https?:\/\/\S+$/.test(input.img)) {
    errors.img = "Invalid image URL";
  }
  return errors;
}
