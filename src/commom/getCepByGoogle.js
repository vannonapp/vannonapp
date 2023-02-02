import axios from 'axios';
const key = 'AIzaSyCnuRB_RNUtU01pj0Fx2osrKiqkaCa6kic';

export function getCepByGoogle(
  lat,
  long,
  handleCurrentCep,
  handleLoadingCep,
  handleCurrentAddress,
  handleIsSearchByLocationSelected
) {
  if ((lat, long)) {
    axios(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`,
    )
      .then((res) => res)
      .then((json) => {
        if (json.status !== 200) {
          throw new Error(`Geocode error: ${json.status}`);
        }

        let obj = json.data.results;
        let founded = false;
        let address = '';
        obj.forEach((e) => {
          if (founded === false) {
            e.address_components.forEach((ac) => {
              ac.types.forEach((tp) => {
                if (tp === 'route') {
                  address += ac.long_name;
                }
                if (tp === 'administrative_area_level_2') {
                  address += `,${ac.long_name}`;
                }
                if (tp === 'administrative_area_level_1') {
                  address += `,${ac.long_name}`;
                }
                if (tp === 'postal_code') {
                  founded = true;
                }
              });
              if (founded === true) {
                return handleCurrentCep(ac.long_name.replace('-', ''), address);
              }
            });
          }
        });
        handleCurrentAddress(address);
      })
      .catch(() => {
        CustomAlert('Ops!',
          'Não conseguimos carregar sua localização, por favor pesquise pelo seu CEP',
        );
        handleLoadingCep();
        handleIsSearchByLocationSelected();
      });
  }
}
