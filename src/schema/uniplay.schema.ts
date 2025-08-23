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
  list_dtu: [
    {
      id: "3343DSD3433DDXXX";
      name: "Free Fire";
      image: "https://semutganteng.fra1.digitaloceanspaces.com/UniPlay/54a9960aadb5de1938dec57081bdb642.png";
      publisher: "Garena";
      publisher_website: "https://www.garena.co.id";
      denom: [
        {
          id: "5343DSD3433DDXXX==";
          package: "5 Diamonds";
          price: "1000";
        },
        {
          id: "6343DSD3433DDXXX==";
          package: "12 Diamonds";
          price: "2000";
        },
      ];
    },
  ];
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
