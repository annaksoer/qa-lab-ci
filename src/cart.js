// 1. Модульна функція: Перевірка чи є товар на складі
function isItemAvailable(item) {
    return item.stock > 0;
}

// 2. Модульна функція: Розрахунок ціни зі знижкою
function calculateDiscount(price, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error("Invalid discount");
    }
    return price - (price * (discountPercent / 100));
}

// 3. Модульна функція: Підрахунок суми масиву цін
function sumPrices(prices) {
    return prices.reduce((acc, curr) => acc + curr, 0);
}

// Для інтеграції
const { formatCurrency } = require('./currency');

// 4. Інтеграційна функція: Отримати чек (Сума + Форматування валюти)
function getCartTotalFormatted(prices) {
    const total = sumPrices(prices);
    return formatCurrency(total);
}

// 5. Інтеграційна функція: Симуляція покупки (Перевірка наявності + Списання)
function checkoutItem(item) {
    if (isItemAvailable(item)) {
        return { status: 'success', item: item.name };
    }
    return { status: 'failed', reason: 'Out of stock' };
}

module.exports = {
    isItemAvailable,
    calculateDiscount,
    sumPrices,
    getCartTotalFormatted,
    checkoutItem
};
