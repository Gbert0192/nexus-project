export interface BaseApiResponse {
  status: string;
  message: string;
}

export interface AuthTokenResponse extends BaseApiResponse {
  expired_on: string;
  access_token: string;
  timezone: string;
}

export interface SaldoResponse extends BaseApiResponse {
  saldo: number;
}

export interface DirectTopUpResponse extends BaseApiResponse {
  list_dtu: Product[];
}

export interface Denomination {
  id: string;
  package: string;
  price: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  publisher: string;
  publisher_website: string;
  denom: Denomination[];
}

export interface VoucherResponse extends BaseApiResponse {
  list_voucher: Product[];
}
