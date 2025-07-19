import { addItem, removeItem, updateQuantity } from "../hooks/cartSlice";
import { NotiActions } from "../hooks/Notiaction";

export const addToCartWithCheck = (product) => (dispatch, getState) => {
    const state = getState();
    const cartItems = state.cart.items || [];
    const existing = cartItems.find(i => i.NidProduct === product.NidProduct);
    const stock = Number(product.Stock || 0);
    const currentQty = existing ? existing.quantity : 0;

    if (currentQty < stock) {
        dispatch(addItem(product));
    } else {
        dispatch(
            NotiActions.showNotification({
                open: true,
                message: "موجودی کافی نیست!",
                type: "warning",
            })
        );
    }
};

export const updateCartQuantityWithCheck = (NidProduct, quantity) => (dispatch, getState) => {
    const item = getState().cart.items.find(i => i.NidProduct === NidProduct);
    const stock = Number(item?.Stock ?? 0);

    if (quantity <= stock) {
        dispatch(updateQuantity({ NidProduct, quantity }));
    } else {
        dispatch(
            NotiActions.showNotification({
                open: true,
                message: "تعداد بیشتر از موجودی است!",
                type: "warning",
            })
        );
    }
};
export const removeCartQuantityWithCheck = (NidProduct, quantity) => (dispatch) => {
    if (quantity == 0) {
        dispatch(removeItem(NidProduct));
    } else {
        dispatch(
            NotiActions.showNotification({
                open: true,
                message: "تعداد بیشتر از موجودی است!",
                type: "warning",
            })
        );
    }
};
