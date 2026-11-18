// Real destination photos, hosted on Wikimedia Commons.
// The GitHub push route used for these repos only accepts text files, so the
// photos are referenced by their stable Commons URLs (1280px thumbnails)
// instead of local binary files. Each entry records the photographer and
// licence for the credit line shown under the photo.
export const packageImages = {
  Istanbul: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Istanbul.Hagia_Sophia007.jpg/1280px-Istanbul.Hagia_Sophia007.jpg",
    alt: "Hagia Sophia, Istanbul, Turkey",
    credit: "Photo: Georges Jansoone (JoJan), CC BY-SA 3.0, via Wikimedia Commons",
    source: "https://commons.wikimedia.org/wiki/File:Istanbul.Hagia_Sophia007.jpg",
  },
  Beirut: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Pigeons_Rock%2C_Raouch%C3%A9%2C_Beirut_%282007%29.jpg/1280px-Pigeons_Rock%2C_Raouch%C3%A9%2C_Beirut_%282007%29.jpg",
    alt: "Pigeon Rocks, Raouché, Beirut, Lebanon",
    credit: "Photo: Eternalsleeper, public domain, via Wikimedia Commons",
    source: "https://commons.wikimedia.org/wiki/File:Pigeons_Rock,_Raouch%C3%A9,_Beirut_(2007).jpg",
  },
  Dubai: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg/1280px-Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg",
    alt: "Burj Khalifa and the Dubai skyline",
    credit: "Photo: imran shahabuddin, CC BY 2.0, via Wikimedia Commons",
    source: "https://commons.wikimedia.org/wiki/File:Burj_Khalifa_(worlds_tallest_building)_and_the_Dubai_skyline_(25781049892).jpg",
  },
};

export function packageImage(destination) {
  return packageImages[destination] || null;
}
