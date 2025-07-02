import React, { useRef } from 'react';
import { Button, Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Print, Close } from '@mui/icons-material';
import { format } from 'date-fns';

const InvoiceModal = ({ invoice, onClose }) => {
    const printRef = useRef(null);

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>فاکتور ${invoice?.id || ''}</title>
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
                            <h2 style={{ margin: 0, color: '#B58E23' }}>شرکت شما</h2>
                            <p style={{ margin: '5px 0' }}>آدرس: تهران، خیابان نمونه، پلاک ۱۲۳</p>
                            <p style={{ margin: '5px 0' }}>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
                            <p style={{ margin: '5px 0' }}>شناسه مالی: ۱۲۳۴۵۶۷۸۹</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ margin: 0, color: '#B58E23' }}>فاکتور فروش</h2>
                            <p style={{ margin: '5px 0' }}>شماره: {invoice?.id || '---'}</p>
                            <p style={{ margin: '5px 0' }}>
                                تاریخ: {invoice?.date ? format(new Date(invoice.date), 'yyyy/MM/dd') : '---'}
                            </p>
                        </div>
                    </div>

                    {/* اطلاعات مشتری */}
                    <div className="customer-info">
                        <div>
                            <h3 style={{ margin: '0 0 10px 0' }}>مشتری:</h3>
                            <p style={{ margin: '5px 0' }}>نام: کاربر سایت</p>
                            <p style={{ margin: '5px 0' }}>شماره تماس: ---</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>وضعیت پرداخت:</h3>
                            <p style={{ margin: '5px 0', color: invoice.paid ? 'green' : 'red' }}>
                                {invoice.paid ? 'پرداخت شده' : 'در انتظار پرداخت'}
                            </p>
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
                            {invoice?.items?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unitPrice.toLocaleString()}</td>
                                    <td>{(item.quantity * item.unitPrice).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* جمع‌بندی */}
                    <div className="summary">
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'right' }}>جمع کل:</td>
                                    <td style={{ textAlign: 'left' }}>
                                        {invoice?.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toLocaleString()} تومان
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'right' }}>مالیات (۹٪):</td>
                                    <td style={{ textAlign: 'left' }}>
                                        {Math.round(invoice?.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) * 0.09).toLocaleString()} تومان
                                    </td>
                                </tr>
                                <tr style={{ fontWeight: 'bold' }}>
                                    <td style={{ textAlign: 'right' }}>مبلغ قابل پرداخت:</td>
                                    <td style={{ textAlign: 'left' }}>
                                        {invoice?.total?.toLocaleString()} تومان
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