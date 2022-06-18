export const getPriceValue = (preporation: string) => {
    switch (preporation) {
        case 'Дерм':
            return 210
        case 'Рэдж':
            return 150
        case 'Стил':
            return 230
        case 'Ювик':
            return 250
        case 'Тео':
            return 250
        default:
            return 230
    }
}
