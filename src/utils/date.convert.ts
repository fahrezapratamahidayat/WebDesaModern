const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export function convertDate(dateString : string) {
    const [year, month, day] = dateString.split('-');
    const monthName = months[parseInt(month, 10) - 1]; // Month array is 0-indexed
    return `${day} ${monthName} ${year}`;
}