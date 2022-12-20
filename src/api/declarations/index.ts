export type ENSRegistrationType = {
  registrant: { id: string };
  expiryDate: number;
  registrationDate: number;
  domain: {
    name: string;
    resolvedAddress?: { id: string };
  };
};
