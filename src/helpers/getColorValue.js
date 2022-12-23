import colors from '@/data/colors';

export default function getColorValue(colorId) {
  const colorItem = colors.filter((item) => item.id === colorId);
  if (colorItem.length === 1) {
    return colorItem[0].value;
  }
  return 'red';
}
