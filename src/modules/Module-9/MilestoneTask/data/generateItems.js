export function generateItems() {
  const items = [];

  for (let i = 1; i <= 1000; i++) {
    items.push({
      id: i,
      name: `Product ${i}`,
      price: Math.round(Math.random() * 500 + 10),
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    });
  }

  return items;
}
