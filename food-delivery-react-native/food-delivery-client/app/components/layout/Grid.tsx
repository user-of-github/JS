import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DynamicGridProps<ValueType> {
  data: ValueType[];
  renderItem: (item: ValueType) => React.ReactNode;
  numColumns: number;
  keyExtractor: (item: ValueType) => string;
  gap?: number;
}

export const DynamicGrid = <ValueType,>({
  data,
  renderItem,
  numColumns,
  keyExtractor,
  gap
}: DynamicGridProps<ValueType>): React.ReactNode => {
  return (
    <View style={[styles.container, { rowGap: gap, columnGap: gap }]}>
      {data.map((item, index) => (
        <View key={keyExtractor(item)} style={{ width: `${100 / numColumns - 2}%` }}>
          {renderItem(item)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10
  }
});
