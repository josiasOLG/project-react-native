/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../Cps.styles'; // substitua pelo caminho correto do seu arquivo de estilo
import ExpandableCard from '../../../reusable/card-expanded/card-expanded.reusable';

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
  comments?: string;
}

interface ContratosViewProps {
  item: ItemType;
  tela: string;
  TelaEnum: TelaEnumType;
  formatarReal: (value: number) => string;
  downloadFile: (uri: string) => void;
  clickSelfIlegivel: () => void;
}

const PendenciaView: React.FC<ContratosViewProps> = ({
  item,
  tela,
  TelaEnum,
  formatarReal,
  downloadFile,
  clickSelfIlegivel,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState(110); // altura inicial
  // ...
  const handleClick = () => {
    setExpanded(!expanded);
    expanded ?  setExpandedHeight(110) : setExpandedHeight(140);
  };

  return (
    <ExpandableCard title="Existe uma pendência" incrementHeight={expandedHeight} onClick={handleClick}>
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
            <TouchableOpacity onPress={clickSelfIlegivel}>
              <Image
                source={require('../../../../assets/images/foto.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.col12}>
            <View style={[styles.cardBodytexto]}>
              {expanded && (
                <Text style={styles.textoFooter}>{item.comments}</Text>
              )}
              <TouchableOpacity
                style={expanded ? styles.iconCima : styles.iconBaixo}
                onPress={() => handleClick()}
              >
                <Image
                  source={require('../../../../assets/images/seta-preta-baixo.png')}
                />
              </TouchableOpacity>
            </View>
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
            <TouchableOpacity onPress={clickSelfIlegivel}>
              <Image
                source={require('../../../../assets/images/foto.png')}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.textoBaixar}>Self ilegível</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col12}>
            <View style={styles.cardBodytexto}>
              <Text style={styles.textoFooter}>Self ilegível</Text>
              <Image
                source={require('../../../../assets/images/seta-preta-baixo.png')}
                style={expanded ? styles.iconCima : styles.iconBaixo}
              />
            </View>
          </View>
        </View>
      )}
    </ExpandableCard>
  );
};

export default PendenciaView;
