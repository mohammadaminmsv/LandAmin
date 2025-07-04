import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import cartSlice from './cartSlice';

export const useCart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const addToCart = useCallback((product) => {
        dispatch(cartSlice.actions.addItem(product));
    }, [dispatch]);

    const removeFromCart = useCallback((NidProduct) => {
        dispatch(cartSlice.actions.removeItem(NidProduct));
    }, [dispatch]);

    const updateItemQuantity = useCallback((NidProduct, quantity) => {
        dispatch(cartSlice.actions.updateQuantity({ id: NidProduct, quantity }));
    }, [dispatch]);

    const clearCart = useCallback(() => {
        dispatch(cartSlice.actions.clearCart());
    }, [dispatch]);

    return {
        items: cart.items,
        itemCount: cart.items.reduce((total, item) => total + item.quantity, 0),
        lastUpdated: cart.lastUpdated,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart
    };
};