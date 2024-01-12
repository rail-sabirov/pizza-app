/* Универсальные метода для работы с localStorage */

// Загрузка состояния jwt из localStore по ключу и парсим JSON
export function loadState<Type>(key: string): Type | undefined {
    try {
        const jsonState = localStorage.getItem(key);
        
        if (!jsonState) {
            return undefined;
        }

        return JSON.parse(jsonState);
    
    } catch(e) {
        console.error(e);
        return undefined;
    }
}


// Сохранение jwt ключа в localStore
export function saveState<Type>(state: Type, key: string) {
    const stringState = JSON.stringify(state);
    localStorage.setItem(key, stringState);
}