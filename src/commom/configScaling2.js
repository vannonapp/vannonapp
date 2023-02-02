import DeviceInfo from 'react-native-device-info';

export default (setState, stateName) => {
  DeviceInfo.isLandscape().then(isLandscape => {
    if (!isLandscape) {
      const scales = {
        scale: DeviceInfo.isTablet() ? 315 : 279,
        textScale: DeviceInfo.isTablet() ? 22 : 25,
        btnWidth: DeviceInfo.isTablet() ? 200 : 160,
      };

      setState(scales[stateName]);
    }
  });

  /* Dimensions.addEventListener('change', () => {
    setState({
      orientation: isPortrait() ? 'portrait' : 'landscape',
      devicetype: DeviceInfo.isTablet() ? 'tablet' : 'phone',
      width: Dimensions.get('window').width,
    });

    if (isPortrait()) {
      setState({
        scale: DeviceInfo.isTablet() ? 315 : 279,
        textScale: DeviceInfo.isTablet() ? 18 : 20,
        btnWidth: DeviceInfo.isTablet() ? 200 : 160,
        txtMenu: DeviceInfo.isTablet() ? 16 : 18,

        //Inicio/Configuracoes.js
        imgBgHeightInicio: DeviceInfo.isTablet() ? 14 : 325,
        imgBgHeightConfigs: DeviceInfo.isTablet() ? 14 : 320,
        heigthInput: DeviceInfo.isTablet() ? 14 : 40,
        fontSizeInput: DeviceInfo.isTablet() ? 14 : 19,
        widthBtnConfirma: DeviceInfo.isTablet() ? 14 : 300,
        heightBtnConfirma: DeviceInfo.isTablet() ? 14 : 60,
        marginViewTop: DeviceInfo.isTablet() ? 14 : 20,
        heightInput: DeviceInfo.isTablet() ? 14 : 55,

        //Menu.js
        paddingStyle: DeviceInfo.isTablet() ? 14 : 20.6,
        iconSize: DeviceInfo.isTablet() ? 40 : 32,
        imgMenuHeight: DeviceInfo.isTablet() ? 40 : 245,

        //BuscarProduto.js
        OUmarginVertical: DeviceInfo.isTablet() ? 35 : 20,
        OUwidth: DeviceInfo.isTablet() ? 35 : 60,
        heigthImgBG: DeviceInfo.isTablet() ? 360 : 473,
        msgHeight: DeviceInfo.isTablet() ? 160 : 145,
      });
    } else {
      setState({
        scale: DeviceInfo.isTablet() ? 315 : 279,
        textScale: DeviceInfo.isTablet() ? 18 : 20,
        btnWidth: DeviceInfo.isTablet() ? 200 : 160,
        txtMenu: DeviceInfo.isTablet() ? 16 : 18,

        //Inicio/Configuracoes.js
        imgBgHeightInicio: DeviceInfo.isTablet() ? 14 : 325,
        imgBgHeightConfigs: DeviceInfo.isTablet() ? 14 : 320,
        heigthInput: DeviceInfo.isTablet() ? 14 : 40,
        fontSizeInput: DeviceInfo.isTablet() ? 14 : 19,
        widthBtnConfirma: DeviceInfo.isTablet() ? 14 : 300,
        heightBtnConfirma: DeviceInfo.isTablet() ? 14 : 60,
        marginViewTop: DeviceInfo.isTablet() ? 14 : 20,
        heightInput: DeviceInfo.isTablet() ? 14 : 55,

        //Menu.js
        paddingStyle: DeviceInfo.isTablet() ? 14 : 20.6,
        iconSize: DeviceInfo.isTablet() ? 40 : 32,
        imgMenuHeight: DeviceInfo.isTablet() ? 40 : 245,

        //BuscarProduto.js
        OUmarginVertical: DeviceInfo.isTablet() ? 35 : 20,
        OUwidth: DeviceInfo.isTablet() ? 35 : 60,
        heigthImgBG: DeviceInfo.isTablet() ? 360 : 473,
        msgHeight: DeviceInfo.isTablet() ? 160 : 145,
      });
    }
  });

  if (isPortrait()) {
    setState({
      scale: DeviceInfo.isTablet() ? 315 : 279,
      textScale: DeviceInfo.isTablet() ? 18 : 20,
      btnWidth: DeviceInfo.isTablet() ? 200 : 160,
      txtMenu: DeviceInfo.isTablet() ? 16 : 18,

      //Inicio/Configuracoes.js
      imgBgHeightInicio: DeviceInfo.isTablet() ? 14 : 325,
      imgBgHeightConfigs: DeviceInfo.isTablet() ? 14 : 320,
      heigthInput: DeviceInfo.isTablet() ? 14 : 40,
      fontSizeInput: DeviceInfo.isTablet() ? 14 : 19,
      widthBtnConfirma: DeviceInfo.isTablet() ? 14 : 300,
      heightBtnConfirma: DeviceInfo.isTablet() ? 14 : 60,
      marginViewTop: DeviceInfo.isTablet() ? 14 : 20,
      heightInput: DeviceInfo.isTablet() ? 14 : 55,

      //Menu.js
      paddingStyle: DeviceInfo.isTablet() ? 14 : 20.6,
      iconSize: DeviceInfo.isTablet() ? 40 : 32,
      imgMenuHeight: DeviceInfo.isTablet() ? 40 : 245,

      //BuscarProduto.js
      OUmarginVertical: DeviceInfo.isTablet() ? 35 : 20,
      OUwidth: DeviceInfo.isTablet() ? 35 : 65,
      heigthImgBG: DeviceInfo.isTablet() ? 360 : 473,
      msgHeight: DeviceInfo.isTablet() ? 160 : 145,
    });
  } else {
    setState({
      scale: DeviceInfo.isTablet() ? 315 : 279,
      textScale: DeviceInfo.isTablet() ? 18 : 20,
      btnWidth: DeviceInfo.isTablet() ? 200 : 160,
      txtMenu: DeviceInfo.isTablet() ? 16 : 18,

      //Inicio/Configuracoes.js
      imgBgHeightInicio: DeviceInfo.isTablet() ? 14 : 325,
      imgBgHeightConfigs: DeviceInfo.isTablet() ? 14 : 320,
      heigthInput: DeviceInfo.isTablet() ? 14 : 40,
      fontSizeInput: DeviceInfo.isTablet() ? 14 : 19,
      widthBtnConfirma: DeviceInfo.isTablet() ? 14 : 300,
      heightBtnConfirma: DeviceInfo.isTablet() ? 14 : 60,
      marginViewTop: DeviceInfo.isTablet() ? 14 : 20,
      heightInput: DeviceInfo.isTablet() ? 14 : 55,

      //Menu.js
      paddingStyle: DeviceInfo.isTablet() ? 14 : 20.6,
      iconSize: DeviceInfo.isTablet() ? 40 : 32,
      imgMenuHeight: DeviceInfo.isTablet() ? 40 : 245,

      //BuscarProduto.js
      OUmarginVertical: DeviceInfo.isTablet() ? 35 : 20,
      OUwidth: DeviceInfo.isTablet() ? 35 : 60,
      heigthImgBG: DeviceInfo.isTablet() ? 360 : 473,
      msgHeight: DeviceInfo.isTablet() ? 160 : 145,
    });
  } */
};
