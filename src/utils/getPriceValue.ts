export const getPriceValue = (preporation: string) => {
    switch (preporation) {
        case 'Дерм':
            return 200
        case 'Рэдж':
            return 150
        case 'Стил':
            return 230
        case 'Ювик':
            return 240
        case 'Тео':
            return 260
        default:
            return 230
    }
}
