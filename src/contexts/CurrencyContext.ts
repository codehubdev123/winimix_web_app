"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 });

  // Currency symbols and formatting
  const currencyConfig = {
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: '€', name: 'Euro' },
    SAR: { symbol: 'ر.س', name: 'Saudi Riyal' },
    AED: { symbol: 'د.إ', name: 'UAE Dirham' },
    EGP: { symbol: 'ج.م', name: 'Egyptian Pound' }
  };

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    setCurrency(savedCurrency);
    // In real app, fetch exchange rates from API
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    // Mock exchange rates - replace with real API
    const rates = {
      USD: 1,
      EUR: 0.85,
      SAR: 3.75,
      AED: 3.67,
      EGP: 30.90
    };
    setExchangeRates(rates);
  };

  const convertPrice = (price, fromCurrency = 'USD', toCurrency = currency) => {
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    return price * rate;
  };

  const formatPrice = (price, currencyCode = currency) => {
    const config = currencyConfig[currencyCode];
    if (!config) return price;
    
    return currencyCode === 'USD' || currencyCode === 'EUR' 
      ? `${config.symbol}${price.toFixed(2)}`
      : `${price.toFixed(2)} ${config.symbol}`;
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  const value = {
    currency,
    currencyConfig,
    exchangeRates,
    changeCurrency,
    convertPrice,
    formatPrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
