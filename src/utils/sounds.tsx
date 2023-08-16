/* eslint-disable @typescript-eslint/no-explicit-any */
export const buttonSound = new Audio("/sounds/button.mp3");
export const clickSound = new Audio("/sounds/click.mp3");
export const startupSound = new Audio("/sounds/startup.mp3");

const keys = [
  new Audio("/sounds/key1.mp3"),
  new Audio("/sounds/key2.mp3"),
  new Audio("/sounds/key3.mp3"),
  new Audio("/sounds/key4.mp3"),
];

export function typeSound() {
  const i: any = Math.floor(Math.random() * keys.length);
  keys[i].currentTime = 0;
  keys[i].play();
}
