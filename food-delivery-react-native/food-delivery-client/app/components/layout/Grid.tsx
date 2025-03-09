import React from 'react';
import { StyleSheet, View } from 'react-native';

interface DynamicGridProps<ValueType> {
  data: ValueType[];
  renderItem: (item: ValueType) => React.ReactNode;
  numColumns: number;
  keyExtractor: (item: ValueType) => string;
  gapX?: number;
  gapY?: number;
}

export const DynamicGrid = <ValueType,>({
  data,
  renderItem,
  numColumns,
  keyExtractor,
  gapY,
  gapX
}: DynamicGridProps<ValueType>): React.ReactNode => {
  return (
    <View style={[styles.container, { rowGap: gapY, columnGap: gapX }]}>
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
    justifyContent: 'flex-start',
    padding: 10
  }
});
