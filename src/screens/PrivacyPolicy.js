import React, {Component} from 'react';
import {Linking, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import lowerLatin from '@jsamr/counter-style/presets/lowerLatin';
import MarkedList from '@jsamr/react-native-li';

import { drugstoreName, sacEmail } from '../commom/labels';
import { BASE_URL } from '../commom/marketUrl';

class PrivacyPolicy extends Component {
  openSite = async () => {
    const supported = await Linking.canOpenURL(BASE_URL);

    if (supported) {
      await Linking.openURL(BASE_URL);
    } else {
      Alert.alert(`Não foi possível abrir o site: ${BASE_URL}`);
    }
  };

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          flexGrow: 1,
          padding: 10,
          backgroundColor: '#FFF',
        }}>
        <Text style={styles.constrast}>
          Conheça nossa política de privacidade e saiba como protegemos as informações que você compartilha com a gente.
        </Text>

        <Text style={styles.normal}>
          De acordo com a nova <Text style={styles.constrast}>Lei Geral de Proteção de Dados (LGPD)</Text> atualizamos nossa 
          política de privacidade. A <Text style={styles.constrast}>{drugstoreName}</Text> tem o compromisso com a transparência, 
          a segurança e a privacidade dos dados de seus clientes 
          coletados na interação de todos os canais, seja na loja on-line, no aplicativo, no tele entregas e nas lojas físicas.
        </Text>

        <Text style={styles.normal}>
          Solicitamos seus dados para que você tenha a melhor experiência de compra em nossos canais de relacionamento e oferecer uma 
          experiência personalizada de serviços para os cuidados com a sua saúde, higiene, beleza e alimentação. Sempre de forma segura.
        </Text>

        <Text style={styles.constrast}>
          O que, como coletamos e com que finalidade utilizamos seus dados pessoais?
        </Text>

        <Text style={styles.normal}>
          Coletamos seu nome, dados pessoais e de contato para permitir a execução dos 
          serviços oferecidos seja pela loja on-line, aplicativo, tele-entregas e lojas físicas.
        </Text>

        <MarkedList counterRenderer={lowerLatin}>
          <Text style={styles.li}>Para entregar os produtos ou serviços adquiridos;</Text>
          <Text style={styles.li}>Para manter informado sobre o andamento do seu pedido;</Text>
          <Text style={styles.li}>Para indicação de loja mais próxima;</Text>
          <Text style={styles.li}>Para agilizar a entrega dos pedidos por parceiros logísticos;</Text>
          <Text style={styles.li}>Para efetivar pagamentos dos pedidos por vias eletrônicas;</Text>
          <Text style={styles.li}>Cumprir obrigações legais como: emissão de notas fiscais;</Text>
          <Text style={styles.li}>Para enviar comunicações sobre serviços e oportunidades de melhor experiência de compra;</Text>
          <Text style={styles.li}>Coletamos também dados de receitas para lhes ajudar na compra de medicamentos sob prescrição médica.</Text>
        </MarkedList>

        <Text style={styles.constrast}>
         Coletamos informações automatizadas (Coockies e outras tecnologias):
        </Text>

        <Text style={styles.normal}>
          Para personalizar sua navegação e trazer benefícios cada vez mais aderentes às 
          suas necessidades utilizamos cookies de navegação para reconhecer você e seus dispositivos, que podem ou não ser autorizados. 
          Entretanto sem este consentimento do uso de Coockies não conseguiremos lhe oferecer todos os recursos da nossa loja on-line.
        </Text>

        <Text style={styles.constrast}>
         Coletamos informações pelo dispositivo móvel:
        </Text>

        <Text style={styles.normal}>
          Para reconhecer dados sobre sua localização e de seu dispositivo para permitir apresentar a loja mais próxima da sua localidade, como 
          também oferecer conteúdos personalizados como, por exemplo, resultados de buscas, anúncios e outros. Sendo que para estes processos 
          são solicitadas permissões ao usuário do dispositivo, que pode ou não ser autorizados.
        </Text>

        <Text style={styles.constrast}>
         Serviços de marketing:
        </Text>

        <Text style={styles.normal}>
          Os serviços de marketing são comunicações por e-mails, SMS e WhatsApp, sendo que o Cliente pode cancelar o serviço, a qualquer momento, 
          acessando a <Text style={styles.constrast}>Minha Conta</Text> como também encaminhando email para 
          <Text style={styles.constrast}> {sacEmail}</Text> informando que não deseja mais receber notificações de nossa 
          empresa. Para garantir sua privacidade, Produtos sensíveis não são considerados para ofertas.
        </Text>

        <Text style={styles.constrast}>
          Com quem compartilhamos seus dados?
        </Text>

        <Text style={styles.normal}>
          Seus dados são compartilhados com transportadoras para realização da entrega de seu pedido, com empresas parceiras de tecnologia para 
          efetivação de sua compra e de personalização de sua experiência, (sempre de forma criptografada). E também com parceiros da indústria 
          farmacêutica, nas compras utilizando o Programa de Benefícios em Medicamentos (PBM).
        </Text>

        <Text style={styles.constrast}>
          Como protegemos seus dados e Como manter suas informações pessoais seguras?
        </Text>

        <Text style={styles.normal}>
          Adotamos as mais rígidas medidas de segurança técnicas e organizacionais para disponibilizar garantia na proteção dos seus dados, como:
        </Text>

        <MarkedList counterRenderer={lowerLatin}>
          <Text style={styles.li}>Ambiente de dados seguro;</Text>
          <Text style={styles.li}>Monitoramento permanente;</Text>
          <Text style={styles.li}>Sistema de criptogragia SSL;</Text>
          <Text style={styles.li}>Gateway de Aplicativo e Firewall de Camada 7;</Text>
          <Text style={styles.li}>Gateway de pagamento.</Text>
        </MarkedList>

        <Text style={styles.normal}>
          Mantenha seus dados pessoais fornecidos no cadastro ou nas compras em segurança, e em nenhuma hipótese forneça o seu login e 
          senha para terceiros. 
          Em caso de necessidade de uso de computadores públicos, ao acessar o seu cadastro pela <Text style={styles.constrast}> Minha Conta</Text>, tenha a certeza de que você 
          realizou o <Text style={styles.constrast}> logout</Text> da sua conta para evitar que pessoas não autorizadas acessem e utilizem 
          as informações sem o seu conhecimento.
          Importante, nós não enviamos mensagens eletrônicas solicitando informações pessoais.
          Sempre que necessário utilize nossos canais oficiais.
        </Text>

        <Text style={styles.constrast}>
          Quais são os seus Direitos e como você pode Exercê-los:
        </Text>

        <Text style={styles.normal}>
          Através do SAC deste portal ou na loja mais próxima você poderá solicitar seus direitos sempre que desejar.
          Através deste site você poderá gerenciar, em <Text style={styles.constrast}> Minha Conta</Text>, atualizando seus consentimentos e até mesmo editar e solicitar 
          a exclusão de seus dados, conforme os direitos garantidos a você pela <Text style={styles.constrast}> Lei Geral de Proteção de Dados Pessoais (LGPD)</Text>.
          Você pode exercer seus direitos acessando a seção <Text style={styles.constrast}> Minha Conta</Text>, disponível no site <Text style={{fontStyle: 'italic'}} onPress={()=> this.openSite()}> {BASE_URL}</Text>. Além disso, 
          pode entrar em contato pelo e-mail <Text style={styles.constrast}> {sacEmail}</Text> para solicitar a exclusão de seus dados para envio de serviços 
          de marketing ou de nossas bases como um todo, porém por questões legais e regulatórias alguns de seus dados serão mantidos. 
          No fim dos períodos determinados pelas legislações, seus dados serão excluídos por completo.
        </Text>

        <Text style={[styles.normal, {marginBottom: 20}]}>
          Para alterar suas preferências em relação às notificações de marketing, a qualquer momento, você pode acessar <Text style={styles.constrast}> Minha Conta</Text> do nosso site.
          Também pode cancelar a sua assinatura ou exclusão do banco de dados enviando sua solicitação de exclusão para <Text style={styles.constrast}> {sacEmail}</Text> , ou clicando no link de exclusão, 
          enviado em todas as nossas ações de e-mail marketing da nossa empresa.
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  li: {
    flexShrink: 1,
    fontSize: 17,
  },
  constrast: {
    fontWeight: 'bold',
    color: '#000080',
    fontSize: 18,
    marginTop: 12,
  },
  normal: {
    fontSize: 18,
    color: '#000',
    marginTop: 12,
  },
});

export default PrivacyPolicy;
