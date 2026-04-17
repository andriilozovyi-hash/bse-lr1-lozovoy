// LeanFork Project - Logic for FR-05 and NFR-S-01

/**
 * FR-05: Система зберігає API-ключ та показує історію чатів [cite: 8]
 * NFR-S-01: Обов'язкове шифрування/захист ключів (імітація) [cite: 11]
 */ //some comment

const leanForkApp = {
    storageKey: 'leanfork_api_key',

    // Функція для збереження ключа (Вимога FR-05)
    saveApiKey: function(key) {
        if (!key || key.length < 15) {
            console.error("Помилка: Ключ занадто короткий або порожній.");
            return false;
        }
        
        // Зберігаємо у localStorage (як зазначено у вимогах про збереження даних) [cite: 8]
        localStorage.setItem(this.storageKey, btoa(key)); // btoa для базового кодування (захист NFR-S-01)
        console.log("API-ключ успішно збережено в системі.");
        return true;
    },

    // Функція відображення історії для Преміум-користувачів (Вимога FR-03/FR-05) [cite: 8]
    getChatHistory: function(userRole) {
        if (userRole !== 'premium') {
            console.warn("Доступ обмежено. Історія чатів доступна лише для Premium[cite: 7].");
            return [];
        }

        // Імітація отримання розгалуженого дерева мислення [cite: 14]
        return [
            { id: 101, topic: "Розгалуження А", agent: "GPT-4" },
            { id: 102, topic: "Розгалуження Б", agent: "Claude" }
        ];
    }
};

const myKey = "sk-proj-leanfork-123456789";
leanForkApp.saveApiKey(myKey);
console.log(leanForkApp.getChatHistory('premium'));