/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../Cps.styles'; // substitua pelo caminho correto do seu arquivo de estilo

interface TelaEnumType {
  Tela1: string;
  Tela2: string;
  Tela3: string;
}

interface ItemType {
  product: {
    type: number;
    name: string;
  };
  installment: number;
  amouunt: number;
  fee: string;
  data: string;
  ccbUri: string;
}

interface ContratosViewProps {
  item: ItemType;
  tela: string;
  TelaEnum: TelaEnumType;
  formatarReal: (value: number) => string;
  downloadFile: (uri: string) => void;
  clickSelfIlegivel: () => void;
}

const SolicitacoesView: React.FC<ContratosViewProps> = ({
  item,
  tela,
  TelaEnum,
  formatarReal,
  downloadFile,
  clickSelfIlegivel,
}) => {
  return (
    <View>
      {item.product.type === 1 ? (
        <View style={[styles.flex]}>
          <View style={styles.col5}>
            <View style={styles.cardBodytexto}>
              <Text style={styles.cardBodytexto.titulo}>Valor da parcela</Text>
              <Text style={styles.cardBodytexto.subtitulo}>
                {formatarReal(item.installment)}
              </Text>
            </View>
            <View>
              <Text style={styles.cardBodytexto.titulo}>Valor solicitado </Text>
              <Text style={styles.cardBodytexto.subtitulo}>
                {formatarReal(item.amouunt)}
              </Text>
            </View>
          </View>
          <View style={styles.col5}>
            <View style={styles.cardBodytexto}>
              <Text style={styles.cardBodytexto.titulo}>Prazo</Text>
              <Text style={styles.cardBodytexto.subtitulo}>{item.fee}</Text>
            </View>
            <View>
              <Text style={styles.cardBodytexto.titulo}>Solicitado em:</Text>
              <Text style={styles.cardBodytexto.subtitulo}>{item.data}</Text>
            </View>
          </View>
          <View style={[styles.col2, styles.centerContent]}>
            <Image
              source={require('../../../../assets/images/relogio.png')}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.textoBaixar}>Enviado para pagamento</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.flex]}>
          <View style={styles.col5}>
            <View style={styles.cardBodytexto}>
              <Text style={styles.cardBodytexto.titulo}>Produto</Text>
              <Text style={styles.cardBodytexto.subtitulo}>
                {item.product.name}
              </Text>
            </View>
          </View>
          <View style={styles.col5}>
            <View style={styles.cardBodytexto}>
              <Text style={styles.cardBodytexto.titulo}>Solicitado em</Text>
              <Text style={styles.cardBodytexto.subtitulo}>{item.fee}</Text>
            </View>
          </View>
          <View style={[styles.col2, styles.centerContent]}>
            <Image
              source={require('../../../../assets/images/relogio.png')}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.textoBaixar}>Enviado para pagamento</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default SolicitacoesView;
