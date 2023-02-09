import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BusinessHome from './containers/business/BusinessHome';
import RegisterBusinessForm from './containers/business/forms/register/RegisterBusinessForm';
import Home from './containers/Home';
import ZondaFileImport from './containers/import/file/zonda/ZondaFileImport';
import BinanceFileImport from './containers/import/file/binance/BinanceFileImport';
import { TransactionsPage } from './containers/import/manual/TransactionsPage';
import { Login } from './containers/Login';
import Profile from './containers/Profile';
import { Signup } from './containers/Singup';
import { TransactionsSummary } from './containers/statiscits/transaction_sumary/TransactionsSummary';

export const LINKS = {
  REGISTER_BUSINESS: '/business/register',
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/business" element={<BusinessHome />} />
      <Route path="/import/file/zonda" element={<ZondaFileImport />} />
      <Route path="/import/file/binance" element={<BinanceFileImport />} />
      <Route path="/transactions" element={<TransactionsPage />} />

      <Route path="/summary/transactions" element={<TransactionsSummary/>} />
      <Route
        path={LINKS.REGISTER_BUSINESS}
        element={<RegisterBusinessForm />}
      />
    </Routes>
  );
}
