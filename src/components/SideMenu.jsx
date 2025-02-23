import Link from "next/link";
import React from "react";
import DashboardIcon, {
  AdminsIcon,
  CategoriesIcon,
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
} from "./svg/SideMenuIcons";

const SideNavigationMenu = () => {
  return (
    <div className="bg-[#DEB038] min-h-svh">
      <nav>
        <ul className="gap-10 flex flex-col">
          <Link href="" className="flex gap-4 flex-row">
            <DashboardIcon />
            <span>Dashboard</span>
          </Link>
          <Link href="/products" className="flex gap-4 flex-row">
            <ProductsIcon /> Products
          </Link>
          <Link className="flex gap-4 flex-row" href="/categories">
            <CategoriesIcon /> Categories
          </Link>
          <Link className="flex gap-4 flex-row" href="">
            <OrdersIcon /> Orders
          </Link>
          <Link className="flex gap-4 flex-row" href="">
            <AdminsIcon /> Admins
          </Link>
          <Link className="flex gap-4 flex-row" href="">
            <SettingsIcon /> Settings
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigationMenu;
