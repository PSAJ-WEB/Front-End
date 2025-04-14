// formatprice.ts
export function formatPrice(price: number | string): string {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    // Kalikan 1000 agar 680 jadi 680.000
    const adjustedPrice = numericPrice * 1000;

    // Format angka dengan titik sebagai pemisah ribuan
    const formatted = Math.floor(adjustedPrice)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Tambahkan "Rp. " di depan
    return `Rp. ${formatted}`;
}
