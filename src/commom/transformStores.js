import {calculateDistance} from './calculateDistance';

export const transformStores = async (stores, currentAddress) => {
  const arr = [];

  for (const store of stores) {
    let addressTo = `${store.Endereco},${store.Cidade},${store.Estado}`;
    const distance = await calculateDistance(currentAddress, addressTo);
    console.log("distaNCE ", distance)
    const theDistance = distance.rows[0].elements[0];

    arr.push({
      ...store,
      Distance: {
        text: theDistance.distance ? theDistance.distance.text : "",
        value: !!theDistance.distance ? theDistance.distance.value : "",
      },
    });
  }

  const sorted = arr.sort((a, b) => a.Distance.value - b.Distance.value);

  return sorted;
};
