const {
    isItemAvailable,
    calculateDiscount,
    sumPrices,
    getCartTotalFormatted,
    checkoutItem
} = require('../src/cart');

// 3 модульні тести
describe('Cart: Unit Tests', () => {

    // Unit Test 1
    test('Перевірка наявності товару (isItemAvailable)', () => {
        const itemInStock = { name: 'Laptop', stock: 5 };
        const itemOutOfStock = { name: 'Phone', stock: 0 };

        expect(isItemAvailable(itemInStock)).toBe(true);
        expect(isItemAvailable(itemOutOfStock)).toBe(false);
    });

    // Unit Test 2
    test('Розрахунок знижки (calculateDiscount)', () => {
        expect(calculateDiscount(100, 20)).toBe(80); // 100 - 20% = 80
        expect(() => calculateDiscount(100, 150)).toThrow("Invalid discount"); // Негативний тест
    });

    // Unit Test 3
    test('Сума цін товарів (sumPrices)', () => {
        const prices = [10, 20, 5.5];
        expect(sumPrices(prices)).toBe(35.5);
    });
});

// --- 2 ІНТЕГРАЦІЙНІ ТЕСТИ (INTEGRATION) ---
describe('Cart: Integration Tests', () => {

    // Integration Test 1 (Integration with Currency module)
    test('Отримання форматованої суми (getCartTotalFormatted)', () => {
        // Ця функція викликає sumPrices (Cart) і потім formatCurrency (Currency module)
        const prices = [50, 50];
        // 50+50=100 -> format -> $100.00
        expect(getCartTotalFormatted(prices)).toBe('$100.00');
    });

    // Integration Test 2 (Logic integration inside Cart module)
    test('Процес чекауту (checkoutItem)', () => {
        const item = { name: 'Mouse', stock: 1 };

        // Інтеграція логіки перевірки та формування відповіді
        const result = checkoutItem(item);

        expect(result).toEqual({ status: 'success', item: 'Mouse' });
        expect(isItemAvailable(item)).toBe(true);
    });
});
