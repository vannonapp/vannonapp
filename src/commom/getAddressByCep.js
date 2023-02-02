export const getAddressByCep = async (cep, country = 'BR') => {
  const request = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${cep}|country:${country}&key=AIzaSyDNMnaxykfeUNVJ_tksD3zctkjuoy43xXc`,
  );
  const response = await request.json();

  return response.results[0].formatted_address;
};
