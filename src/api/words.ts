// src/api/words.ts

export interface WordData {
    word: string;
    clue: string;
    category: string;
}

const CATEGORIES: Record<string, { word: string, clue: string }[]> = {
    "Hewan 🦁": [
        { word: 'JERAPAH', clue: 'Hewan dengan leher yang sangat panjang' },
        { word: 'HARIMAU', clue: 'Kucing besar yang loreng-loreng' },
        { word: 'KELELAWAR', clue: 'Hewan yang tidur terbalik di siang hari' },
        { word: 'KANGURU', clue: 'Hewan berkantung yang suka melompat' },
        { word: 'LUMBA-LUMBA', clue: 'Mamalia cerdas yang hidup di laut' },
    ],
    "Buah 🍎": [
        { word: 'STROBERI', clue: 'Buah merah bintik-bintik, rasanya asam manis' },
        { word: 'MANGGIS', clue: 'Buah kulit ungu, dalamnya putih, ratu buah' },
        { word: 'DURIAN', clue: 'Raja buah, kulitnya berduri tajam' },
        { word: 'ALPUKAT', clue: 'Buah hijau, biasa dibuat jus atau guacamole' },
        { word: 'RAMBUTAN', clue: 'Buah merah berambut, isinya putih manis' },
    ],
    "Profesi 👮‍♂️": [
        { word: 'ASTRONOT', clue: 'Orang yang pergi ke luar angkasa' },
        { word: 'PEMADAM', clue: 'Tugasnya mematikan api saat kebakaran' },
        { word: 'ARSITEK', clue: 'Orang yang merancang bangunan' },
        { word: 'DOKTER', clue: 'Orang yang menyembuhkan orang sakit' },
        { word: 'PILOT', clue: 'Orang yang mengemudikan pesawat terbang' },
    ],
    "Kendaraan 🚗": [
        { word: 'HELIKOPTER', clue: 'Pesawat dengan baling-baling di atas' },
        { word: 'AMBULANS', clue: 'Mobil yang membunyikan sirine saat darurat' },
        { word: 'KAPAL SELAM', clue: 'Kendaraan yang berjalan di dalam air' },
        { word: 'SEPEDA', clue: 'Kendaraan roda dua yang dikayuh' },
        { word: 'KERETA API', clue: 'Kendaraan panjang yang berjalan di atas rel' },
    ],
    "Alam 🏔️": [
        { word: 'PELANGI', clue: 'Lengkungan warna-warni setelah hujan' },
        { word: 'GUNUNG', clue: 'Dataran yang sangat tinggi menjulang' },
        { word: 'SAMUDRA', clue: 'Lautan yang sangat luas' },
        { word: 'HUTAN', clue: 'Tempat yang dipenuhi banyak pohon lebat' },
        { word: 'AIR TERJUN', clue: 'Air yang jatuh dari ketinggian' },
    ]
};

export const getCategories = () => Object.keys(CATEGORIES);

export const getWordByCategory = (category: string): WordData => {
    const list = CATEGORIES[category] || CATEGORIES["Hewan 🦁"];
    const randomIndex = Math.floor(Math.random() * list.length);
    const selected = list[randomIndex];
    
    return {
        word: selected.word.toUpperCase(),
        clue: selected.clue,
        category: category
    };
};