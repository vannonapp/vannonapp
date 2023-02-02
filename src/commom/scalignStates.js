import {Dimensions} from 'react-native';

const commomState = {
  textScale: 0,
  scale: 0,
  btnWidth: 0,
  txtMenu: 0,
};

export const customerInfosScalingState = {
  ...commomState,
  imgBgHeightInicio: 0,
  imgBgHeightConfigs: 0,
  heigthInput: 0,
  fontSizeInput: 0,
  widthBtnConfirma: 0,
  heightBtnConfirma: 0,
  marginViewTop: 0,
  heightInput: 0,
};

export const searchProductState = {
  msgHeight: 0,
  OUwidth: 0,
  txtMenu: 0,
  textScale: 0,
  msgMarginVertical: 0,
  barcodeNumMarginVertical: 0,
  OUmarginVertical: 0,
};

const guidelineBaseHeight = 1280;

const scale = size => {
  return (Dimensions.get('window').width / guidelineBaseHeight) * size;
};

export const moderateScale = (size, factor = 0.5) => {
  return parseFloat(size + (scale(size) - size) * factor);
};
