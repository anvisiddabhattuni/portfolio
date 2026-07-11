export interface Photo {
  src: string;
  caption: string;
  place: string;
  /** rough aspect hint so the scrapbook can vary frame heights */
  orientation: 'portrait' | 'landscape' | 'square';
}

const p = (src: string, caption: string, place: string, orientation: Photo['orientation'] = 'landscape'): Photo => ({
  src: `/photos/${src}`,
  caption,
  place,
  orientation,
});

/** The two dogs — the hosts of the walk. */
export const DOG_PHOTOS: Photo[] = [
  p('dogs-duo.png', 'The trail bosses', 'Home', 'portrait'),
  p('dog-poodle-bag.png', 'Stop & smell the flowers', 'Home', 'portrait'),
  p('dog-golden-bed.png', 'Off duty', 'Home', 'portrait'),
];

/** The personal note in the sand. */
export const SAND_PHOTO: Photo = p('hi-anvi-sand.png', 'hi Anvi', 'Somewhere with a beach', 'portrait');

/** Headshot for the About section. */
export const HEADSHOT: Photo = p('ANVIHEADSHOT.jpg', 'Anvi Siddabhattuni', 'portrait', 'portrait');

/** Everywhere the walk has wandered. */
export const TRAVEL_PHOTOS: Photo[] = [
  // Italy
  p('florence-duomo.png', 'Il Duomo', 'Florence, Italy'),
  p('colosseum.png', 'The Colosseum', 'Rome, Italy'),
  p('rome-trevi.png', 'Trevi Fountain', 'Rome, Italy', 'portrait'),
  p('roman-forum.png', 'The Roman Forum', 'Rome, Italy'),
  p('rome-skyline.png', 'Rooftops at golden hour', 'Rome, Italy'),
  p('pisa-tower.png', 'A little off-balance', 'Pisa, Italy'),
  p('siena-library.png', 'Piccolomini Library', 'Siena, Italy'),
  p('venice-gondola.png', 'Down the canals', 'Venice, Italy'),
  p('venice-night.png', 'Venice after dark', 'Venice, Italy'),
  p('florence-leather.png', 'A leather shop', 'Florence, Italy'),
  p('florence-postcards.png', 'Postcards home', 'Florence, Italy'),
  p('florence-alley.png', 'Quiet backstreets', 'Florence, Italy'),
  p('tuscany-vineyards.png', 'Rolling vineyards', 'Tuscany, Italy'),
  p('tuscany-bread-oil.png', 'Bread & new oil', 'Tuscany, Italy', 'portrait'),
  p('sorrento-road.png', 'The cliff road', 'Sorrento, Italy'),
  p('sorrento-balcony.png', 'A rainy balcony', 'Sorrento, Italy'),
  p('italy-window.png', 'Morning light', 'Italy', 'portrait'),
  p('italy-breakfast.png', 'Breakfast with a view', 'Italy'),
  // Spain
  p('toledo-skyline.png', 'The old city', 'Toledo, Spain', 'portrait'),
  p('toledo-cathedral.png', 'Inside the cathedral', 'Toledo, Spain', 'portrait'),
  p('segovia-cathedral.png', 'Segovia Cathedral', 'Segovia, Spain', 'portrait'),
  p('segovia-street.png', 'Wandering the old town', 'Segovia, Spain', 'portrait'),
  p('spain-cafe.png', 'A corner café', 'Spain', 'portrait'),
  p('barcelona-night.png', 'City lights', 'Barcelona, Spain', 'portrait'),
  // Canada — Banff & the Rockies
  p('lake-louise.png', 'Geese on the ice', 'Lake Louise, Canada', 'portrait'),
  p('peyto-lake.png', 'Peyto Lake', 'Banff, Canada'),
  p('banff-summit.png', 'Top of Sulphur Mountain', 'Banff, Canada'),
  p('banff-valley.png', 'Down the Bow Valley', 'Banff, Canada'),
  p('banff-glacier.png', 'Toward the glacier', 'Icefields Parkway, Canada'),
  p('banff-skywalk.png', 'The Skywalk', 'Columbia Icefield, Canada'),
  p('banff-skywalk-glass.png', 'Standing on glass', 'Glacier Skywalk, Canada'),
  p('cascade-mountain.png', 'Cascade Mountain', 'Banff, Canada'),
  p('banff-avenue.png', 'Banff Avenue', 'Banff, Canada'),
  p('banff-townsite.png', 'Above the townsite', 'Banff, Canada', 'portrait'),
  p('banff-cave.png', 'Cave & Basin', 'Banff, Canada', 'portrait'),
  // Tropics & elsewhere
  p('bahamas-coast.png', 'Turquoise water', 'The Bahamas', 'portrait'),
  p('island-stroll.png', 'Island stroll', 'The Bahamas', 'portrait'),
  p('mexico-cliffs.png', 'Frigatebirds & cliffs', 'Mexico', 'portrait'),
  p('jellyfish.png', 'Jellyfish, after hours', 'Aquarium', 'portrait'),
  p('concu-garden.png', 'A garden doorway', 'CONÇU', 'portrait'),
  p('wine-bar.png', 'Wine & a Roman bust', 'A wine bar', 'portrait'),
  p('city-alley.png', 'Backstreets', 'On the road', 'portrait'),
];

/** Everything, for any consumer that wants the full roll. */
export const ALL_PHOTOS: Photo[] = [...DOG_PHOTOS, SAND_PHOTO, ...TRAVEL_PHOTOS];
