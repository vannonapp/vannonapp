export const calculateDistance = async (
  addressFrom,
  addressTo,
  units = 'kilometers',
) => {
  addressFrom = addressFrom.replace(' ', '+');
  addressTo = addressTo.replace(' ', '+');

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=${units}&origins=${addressFrom}&destinations=${addressTo}&key=AIzaSyDNMnaxykfeUNVJ_tksD3zctkjuoy43xXc`,
  );
  const distance = await response.json();

  return distance;
};
