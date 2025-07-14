export type User = {
  username: string;
  password: string;
};

export interface UserData {
  tradeName: string;
  typeOfBusiness: string;
  parentCompany: string;
  registeredName: string;
  businessRegistrationNo: string;
  ein: string;
  vatRegistrationNo: string;
  dateOfIncorporation: Date | undefined;
  postalAddress: string;
  shipmentAddress: string;
  portOfShipment: string;
  faxNo: string;
  phoneNo: string;
  firstName: string;
  firstEmail: string;
  secondName: string;
  secondEmail: string;
}

export type UserWithData = User & UserData;

export type ProfileData = UserWithData & {
  accountInformationEditing: boolean;
  companyInformationEditing: boolean;
  businessRegistrationEditing: boolean;
  contactDetailsEditing: boolean;
  contactPersonsEditing: boolean;

  isSaving: boolean;
};

export type FormData = UserWithData & {
  isStep1Valid: boolean;
  isStep2Valid: boolean;
  isStep3Valid: boolean;
  isStep4Valid: boolean;
  isStep5Valid: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  rating: number;
  reviews: number;
  isBestSeller?: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type ProductList = CartItem[];

export type Cart = Map<string, ProductList>;

export interface CartService {
  getUserCart: (username: string) => Promise<ProductList>;
  addToUserCart: (
    username: string,
    productId: Product["id"],
    quantity: number
  ) => Promise<void>;
  updateCartItemQuantity: (
    username: string,
    productId: Product["id"],
    quantity: number
  ) => Promise<void>;
  removeFromUserCart: (
    username: string,
    productId: Product["id"]
  ) => Promise<void>;
}
