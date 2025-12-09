// src/api/playCount.ts (CODE FULL KONFIRMASI)

/**
 * Fungsi untuk melakukan POST request ke backend untuk menambah play count.
 * Ini adalah MOCKUP dan harus diganti dengan URL backend yang sebenarnya
 * setelah integrasi. Ganti URL di bawah dengan URL backend lokal tim Anda.
 */
export const postPlayCount = async () => {
    // GANTI dengan URL backend lokal tim Anda!
    const backendUrl = 'http://localhost:3001/api/v1/playcount'; 

    console.log(`[API] Mencoba POST ke: ${backendUrl}`);
    
    // Data yang mungkin dibutuhkan backend
    const mockData = {
        game_slug: 'hangman',
        user_id: 'mock-user-123', 
        timestamp: new Date().toISOString(),
    };
    
    try {
        // Simulasi request fetch
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer YOUR_TOKEN' // Jika diperlukan
            },
            body: JSON.stringify(mockData),
        });
        
        if (!response.ok) {
            // Jika response 4xx atau 5xx
            throw new Error(`Gagal mencatat play count. Status: ${response.status}`);
        }
        
        console.log('[API] Play count berhasil ditambahkan.');
        // return response.json(); // Jika backend mengembalikan data
        return true; 

    } catch (error) {
        console.error("[API ERROR] Gagal melakukan POST play count:", error);
        throw error;
    }
};