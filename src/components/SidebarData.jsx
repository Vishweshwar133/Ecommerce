import React from 'react'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ToysIcon from '@mui/icons-material/Toys';
import InventoryIcon from '@mui/icons-material/Inventory';
import Header from './Header';

export const SidebarData = [
   {
      title: "All Products",
      icon: <InventoryIcon />,
      link: "/"
   },
   {
      title: "Grocery",
      icon: <LocalGroceryStoreIcon />,
      link: "/cat/Grocery/DailyNeeds"
   },
   {
      title: "Electronics",
      icon: <DevicesIcon />,
      link: "/cat/MobilesandElectronics/Mobiles"
   },
   {
      title: "Fashion",
      icon: <CheckroomIcon />,
      link: "/cat/Fashion/Men"
   },
   {
      title: "Beauty",
      icon: <ToysIcon />,
      link: "/cat/Beauty/Beauty"
   },
]

