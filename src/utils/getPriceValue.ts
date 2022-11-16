export const getPriceValue = (preporation: string) => {
  switch (preporation) {
    case 'Дерм':
      return 210
    case 'Рэдж':
      return 160
    case 'Стил':
      return 250
    case 'Ювик':
      return 270
    case 'Тео':
      return 250
    default:
      return 250
  }
}
