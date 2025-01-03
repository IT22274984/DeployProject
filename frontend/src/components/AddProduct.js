import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddProduct.css';

export default function AddProduct() {
    let navigate = useNavigate();

    
    const [productname, setProductName] = useState("");
    const [productnumber, setProductNumber] = useState("");
    const [productdealerprice, setProductDealerPrice] = useState("");
    const [productprofitrate, setProductProfitRate] = useState("");
    const [productsellingprice, setProductSellingPrice] = useState("");
    const [productcollecteddate, setProductCollectedDate] = useState("");

    const calculateSellingPrice = () => {
        const dealerPrice = parseFloat(productdealerprice) || 0;
        const profitRate = parseFloat(productprofitrate) || 0;

        // Calculate selling price
        const sellingPrice = dealerPrice + (dealerPrice * (profitRate / 100));
        setProductSellingPrice(sellingPrice.toFixed(2));
    };

    const addProduct = async (e) => {
        e.preventDefault();

        const newProduct = {
            
            productname,
            productnumber,
            dealerprice: parseFloat(productdealerprice) || 0,
            profitrate: parseFloat(productprofitrate) || 0,
            sellingprice: parseFloat(productsellingprice) || 0,
            collecteddate: productcollecteddate
        };

        await axios.post("https://deploy-projectkg.vercel.app/products", newProduct)
            .then(() => {
                alert("Product Added Successfully");
                navigate('/products');
            })
            .catch(err => {
                alert(err.message || "Error adding product");
            });
    };

    return (
        <div className="container">
            <h2>Add New Product</h2>
            <form onSubmit={addProduct} className="my-form">
                
                <div className="mb-3">
                    <label htmlFor="productname" className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productname"
                        placeholder="Enter Product Name"
                        value={productname}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productnumber" className="form-label">Product Count</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productnumber"
                        placeholder="Enter Product Number"
                        value={productnumber}
                        onChange={(e) => setProductNumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productdealerprice" className="form-label">Dealer Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="productdealerprice"
                        placeholder="Enter Dealer's Price"
                        value={productdealerprice}
                        onChange={(e) => {
                            setProductDealerPrice(e.target.value);
                            calculateSellingPrice();
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productprofitrate" className="form-label">Profit Rate (%)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="productprofitrate"
                        placeholder="Enter Profit Rate"
                        value={productprofitrate}
                        onChange={(e) => {
                            setProductProfitRate(e.target.value);
                            calculateSellingPrice();
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productsellingprice" className="form-label">Selling Price</label>
                    <input type="text"
                    className="form-control"
                    id="productsellingprice" 
                    value={productsellingprice} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="productcollecteddate" className="form-label">Collected Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="productcollecteddate"
                        value={productcollecteddate}
                        onChange={(e) => setProductCollectedDate(e.target.value)}
                    />
                </div>
                
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}
