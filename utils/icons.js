import {
  GalleryVerticalEnd,
  House,
  ShoppingCart,
  BriefcaseBusiness,
  GraduationCap,
  Dumbbell,
  ChefHat,
  PawPrint,
  Component,
} from 'lucide-react'

// Mapeo de nombres a componentes
export const iconMap = {
  GalleryVerticalEnd,
  House,
  ShoppingCart,
  BriefcaseBusiness,
  GraduationCap,
  Dumbbell,
  ChefHat,
  PawPrint,
  Component,
}

// Lista de íconos para el modal
export const iconList = Object.keys(iconMap).map((key) => ({
  name: key,
  component: iconMap[key],
}))
