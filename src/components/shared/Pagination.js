/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Pagination({currentIndex, itemCount}) {
  const createPaginationItems = () => {
    const items = [];

    for (let i = 0; i < itemCount; i++) {
      items.push(
        <View
          key={i}
          style={[
            styles.item,
            i === currentIndex ? styles.activeItem : styles.inactiveItem,
          ]}
        />,
      );
    }

    return items;
  };

  return <View style={styles.container}>{createPaginationItems()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  item: {
    marginHorizontal: 5,
    backgroundColor: 'transparent',
  },
  activeItem: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2B3155',
  },
  inactiveItem: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
  },
});
