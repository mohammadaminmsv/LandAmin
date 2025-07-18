import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Print, Close } from '@mui/icons-material';
import { format } from 'date-fns';
import { getAllItems } from '../services/OrdersItem/getAllItems';
import { getSpecProduct } from '../services/Product/getSpecProduct';
import { useSelector } from 'react-redux';

const InvoiceModal = ({ invoice, onClose }) => {
    const printRef = useRef(null);
    const User = useSelector((state) => state.userLog) || {};
    const [items, setItems] = useState()
    const [product, setProducts] = useState()
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>فاکتور ${invoice?.NidOrder || ''}</title>
                <style>
                    body {
                        font-family: 'B Nazanin', Tahoma, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        padding: 20px;
                        max-width: 1000px;
                        margin: 0 auto;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #eee;
                    }
                    .customer-info {
                        display: flex;
                        justify-content: space-between;
                        background-color: #f9f9f9;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 25px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: center;
                    }
                    th {
                        background-color: #f5f5f5;
                        font-weight: bold;
                    }
                    .summary {
                        float: left;
                        width: 300px;
                        margin-top: 20px;
                    }
                    .footer {
                        margin-top: 50px;
                        padding-top: 15px;
                        border-top: 1px dashed #ccc;
                        text-align: center;
                        font-size: 0.9em;
                        color: #666;
                    }
                    @media print {
                        body {
                            padding: 0;
                            font-size: 12pt;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                ${printRef.current.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };

    useEffect(() => {
        const fetchItemsAndProducts = async () => {
            try {
                const itemsRes = await getAllItems(invoice.NidOrder);
                if (!itemsRes.success) return;
                setItems(itemsRes.data);

                const productIds = itemsRes.data.map(item => item.NidProduct);

                // گرفتن همه محصولات به‌صورت موازی
                const productPromises = productIds.map(id => getSpecProduct(id));
                const productsResults = await Promise.all(productPromises);

                const productsMap = {};
                productsResults.forEach((res, idx) => {
                    if (res.success) {
                        productsMap[productIds[idx]] = res.data;
                    }
                });

                setProducts(productsMap);
            } catch (error) {
                console.error("Error fetching items/products", error);
            }
        };

        fetchItemsAndProducts();
    }, [invoice]);


    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending':
                return <span className="text-yellow-500 font-bold">در حال پرداخت</span>;
            case 'paid':
                return <span className="text-green-600 font-bold">پرداخت شده</span>;
            case 'canceled':
                return <span className="text-red-500 font-bold">لغو شده</span>;
            case 'shipped':
                return <span className="text-blue-600 font-bold">ارسال شده</span>;
            default:
                return <span className="text-gray-500">نامشخص</span>;
        }
    };


    if (!invoice) return null;

    return (
        <Dialog open={!!invoice} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogActions>
                <IconButton onClick={onClose} className="no-print">
                    <Close />
                </IconButton>
            </DialogActions>
            <DialogContent>
                <div ref={printRef} style={{ padding: '20px', fontFamily: "'B Nazanin', Arial" }}>
                    {/* هدر فاکتور */}
                    <div className="header">
                        <div>
                            <h2 style={{ margin: 0, color: '#B58E23' }}>فروشگاه الکترونیکی و قطعات امین (لندامین)</h2>
                            <p style={{ margin: '5px 0' }}>آدرس: تهران، خیابان نمونه، پلاک ۱۲۳</p>
                            <p style={{ margin: '5px 0' }}>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
                            <p style={{ margin: '5px 0' }}>شناسه مالی: ۱۲۳۴۵۶۷۸۹</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ margin: 0, color: '#B58E23' }}>فاکتور فروش</h2>
                            <p style={{ margin: '5px 0' }}>شماره: {invoice?.NidOrder.split("-").pop() || '---'}</p>
                            <p style={{ margin: '5px 0' }}>
                                تاریخ: {new Date(invoice.OrderDate).toLocaleDateString('fa-IR')}
                            </p>
                        </div>
                    </div>

                    {/* اطلاعات مشتری */}
                    <div className="customer-info">
                        <div>
                            <h3 style={{ margin: '0 0 10px 0' }}>مشتری:{User.User.NidUser.split("-").pop()}</h3>
                            <p style={{ margin: '5px 0' }}>نام:{User.User.Name}  {User.User.LastName}</p>
                            <p style={{ margin: '5px 0' }}>شماره تماس:{User.User.tel}</p>
                            <p style={{ margin: '5px 0' }}>آدرس ارسالی:{invoice.sendAddress ? invoice.sendAddress : User.User.tel}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>وضعیت پرداخت:</h3>
                            {getStatusLabel(invoice.Status)}
                        </div>
                    </div>

                    {/* جدول آیتم‌ها */}
                    <table>
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>شرح کالا/خدمت</th>
                                <th>تعداد</th>
                                <th>قیمت واحد (تومان)</th>
                                <th>مبلغ (تومان)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tbody>
                                {items && product ? items.map((item, index) => {
                                    const productInfo = product[item.NidProduct] || {};
                                    return (
                                        <tr key={item.NidOrderItem}>
                                            <td>{index + 1}</td>
                                            <td>{productInfo.Title || '---'}</td>
                                            <td>{item.Quantity}</td>
                                            <td>{Number(item.PriceAtPurchase).toLocaleString()}</td>
                                            <td>{(item.Quantity * item.PriceAtPurchase).toLocaleString()}</td>
                                        </tr>
                                    );
                                }) : (
                                    <tr><td colSpan="5">در حال بارگذاری...</td></tr>
                                )}
                            </tbody>

                        </tbody>
                    </table>

                    {/* جمع‌بندی */}
                    <div className="summary">
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'right' }}>جمع کل:</td>
                                    <td style={{ textAlign: 'left' }}>
                                        {items ? items.reduce((sum, item) => sum + (item.Quantity * item.PriceAtPurchase), 0).toLocaleString() : '---'} تومان
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'right' }}>مالیات (10٪):</td>
                                    <td style={{ textAlign: 'left' }}>
                                        {items ? Math.round(items.reduce((sum, item) => sum + (item.Quantity * item.PriceAtPurchase), 0) * 0.1).toLocaleString() : '---'} تومان
                                    </td>
                                </tr>
                                <tr style={{ fontWeight: 'bold' }}>
                                    <td style={{ textAlign: 'right' }}>مبلغ قابل پرداخت:</td>
                                    <td style={{ textAlign: 'left' }}>
                                        {items ? Math.round(items.reduce((sum, item) => sum + (item.Quantity * item.PriceAtPurchase), 0) * 1.1).toLocaleString() : '---'} تومان
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    {/* توضیحات پایانی */}
                    <div className="footer">
                        <p>با تشکر از خرید شما - لطفاً در صورت هرگونه سوال با پشتیبانی تماس بگیرید</p>
                        <p>تلفن پشتیبانی: ۰۹۱۲۱۲۳۴۵۶۷ | ایمیل: support@example.com</p>
                        <p>این فاکتور به منزله رسید پرداخت می‌باشد</p>
                    </div>
                </div>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }} className="no-print">
                <Button
                    variant="contained"
                    onClick={handlePrint}
                    startIcon={<Print />}
                    style={{
                        backgroundColor: '#B58E23',
                        color: 'white',
                        padding: '10px 25px',
                        fontSize: '16px'
                    }}
                >
                    چاپ فاکتور
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InvoiceModal;