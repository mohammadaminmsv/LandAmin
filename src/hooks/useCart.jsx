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

    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cart.items.reduce((total, item) => {
        const price = Number(item.Price) || 0;
        return total + (price * item.quantity);
    }, 0);

    return {
        items: cart.items,
        itemCount,
        totalPrice,
        lastUpdated: cart.lastUpdated,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart
    };
};
