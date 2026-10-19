import TourPackage from "../models/TourPackage";

export const packages = [
  new TourPackage(1, "Oslob Whale Shark Trip", 1, 2500, 1, ["Pickup at hotel", "Whale shark swim", "Tumalog Falls", "Lunch", "Drop-off"]),
  new TourPackage(2, "Kawasan Canyoneering", 2, 3200, 1, ["Pickup at hotel", "Canyon jumps", "Kawasan Falls", "Lunch", "Drop-off"]),
  new TourPackage(3, "Malapascua Island Escape", 3, 5800, 3, ["Day 1: Ferry and check-in", "Day 2: Island hopping", "Day 3: Dive or beach day"]),
  new TourPackage(4, "Cebu Heritage Walk", 4, 1200, 1, ["Magellan's Cross", "Basilica del Santo Niño", "Fort San Pedro", "Local lunch"]),
];
