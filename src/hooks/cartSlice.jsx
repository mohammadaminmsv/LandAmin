import { createSlice } from '@reduxjs/toolkit';

// 👉 بازیابی سبد از localStorage
const getInitialCart = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (err) {
                console.error("خطا در parsing سبد خرید:", err);
            }
        }
    }
    return { items: [], lastUpdated: null };
};

// 👉 ذخیره سبد در localStorage
const saveToLocalStorage = (state) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state));
    }
};

const initialState = getInitialCart();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = {
                ...action.payload,
                Price: Number(action.payload.Price || 0),
                discount: Number(action.payload.discount || 0),
                Stock: Number(action.payload.Stock ?? 0),
                quantity: 1,
            };

            const existing = state.items.find(item => item.NidProduct === product.NidProduct);
            if (existing) {
                if (existing.quantity < existing.Stock) {
                    existing.quantity += 1;
                }

            } else {
                if (product.Stock > 0) {
                    state.items.push(product);
                }
            }

            state.lastUpdated = Date.now();
            saveToLocalStorage(state);
        },


        updateQuantity: (state, action) => {
            const { NidProduct, quantity } = action.payload;
            const item = state.items.find(item => item.NidProduct === NidProduct);
            if (item) {
                const stock = Number(item.Stock ?? 0);
                if (quantity > 0 && quantity <= stock) {
                    item.quantity = quantity;
                }
                // else: نادیده بگیر چون بیشتر از موجودیه
            }
            state.lastUpdated = Date.now();
            saveToLocalStorage(state);
        },


        removeItem: (state, action) => {
            const NidProduct = action.payload;
            state.items = state.items.filter(item => item.NidProduct !== NidProduct);
            state.lastUpdated = Date.now();
            saveToLocalStorage(state);
        },

        clearCart: (state) => {
            state.items = [];
            state.lastUpdated = Date.now();
            saveToLocalStorage(state);
        },
    }
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice;
