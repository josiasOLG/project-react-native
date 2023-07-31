/* eslint-disable prettier/prettier */
import * as React from 'react';
import { List } from 'react-native-paper';
import { View, Text, Image } from 'react-native';
import { styles } from './dropdown.styles';

interface Item {
  label: string;
  value: string;
}

interface DropDownProps {
  data?: Item[];
  value?: string;
  textoDropDown?: string;
  onValueChange: (value: string) => void;
}

const DropDownReusable: React.FC<DropDownProps> = ({ data, value, onValueChange, textoDropDown }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <View style={styles.dropdown} onTouchEnd={handlePress}>
        <Text style={styles.text}>
          {textoDropDown}
        </Text>
        <Image
          style={styles.image}
          source={require('../../../assets/images/seta-preta-baixo.png')}
        />
      </View>
      <List.Accordion
        title={textoDropDown}
        expanded={expanded}
        onPress={handlePress}
        style={[{ display: 'none'}]}
      >
        {data.map((item: Item) => (
          <List.Item
            key={item.value}
            title={item.label}
            style={styles.dropdownItem}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
            onPress={() => {
              onValueChange(item.value);
              setExpanded(false);
            }}
          />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

export default DropDownReusable;
