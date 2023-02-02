import _ from 'lodash';
import axios from 'axios';

import {BASE_URL} from './marketUrl';

export function searchProduct(productName, barCodeNum, currentCep, cep, cpf) {
  let data = {};
  let parm = '';

  if (barCodeNum && !productName) {
    param = 'consultarcodigobarras';
    data = {
      codigoBarras: barCodeNum ? parseFloat(barCodeNum) : null,
      cep: currentCep ? parseInt(currentCep) : parseInt(cep),
      CPF: cpf != '' ? parseFloat(cpf) : 0,
    };
  } else {
    param = 'consultarprodutonome';
    data = {
      termosBusca: productName,
      cep: currentCep ? currentCep : cep,
    };
  }

  return axios
    .post(`${BASE_URL}/produto/${param}`, data)
    .then((response) => {
      return !!barCodeNum && !productName
        ? response.data.Url
        : response.data.UrlBusca;
    })
    .catch((error) => _.values(error)[2].data);
}
