export const getPriceValue = (preporation: string) => {
  switch (preporation) {
    case 'Дерм':
      return 220
    case 'Рэдж':
      return 170
    case 'Стил':
      return 260
    case 'Ювик':
      return 280
    case 'Тео':
      return 270
    default:
      return 260
  }
}
