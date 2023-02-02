import React, {useState, useRef} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';

const scrollElementHeightPercent = 45;
const scrollElementHeightPercentStr = `${scrollElementHeightPercent}%`;
const scrollBarBorderRadius = 6;

const CustomScrollView = ({children, listLength}) => {
  const [contentOffset, setContentOffset] = useState({x: 0, y: 0});
  const [contentSize, setContentSize] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
  const scrollRef = useRef(null);

  let scrollPosPercent;

  if (contentOffset.y > 0) {
    scrollPosPercent =
      (contentOffset.y / (contentSize - scrollViewHeight)) *
      (100 - scrollElementHeightPercent);
  }

  return (
    <View style={styles.container} testID="flatlist_modal_view">
      <View
        testID={'pull_down_bar'}
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '15%',
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            marginBottom: 8,
            width: '20%',
            height: 4,
            borderRadius: 4,
            backgroundColor: 'white',
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          right: 2,
          top: '0%',
          marginBottom: 8,
          width: 3,
          height: '100%',
          borderRadius: scrollBarBorderRadius,
          backgroundColor: listLength > 4 ? '#8e8e8e' : 'transparent',
          zIndex: 1,
        }}>
        <View
          style={{
            position: 'absolute',
            left: -1,
            top: `${Number(scrollPosPercent || 0).toFixed(0)}%`,
            marginBottom: 8,
            width: 5,
            height: scrollElementHeightPercentStr,
            borderRadius: scrollBarBorderRadius + 2,
            backgroundColor: listLength > 4 ? '#00a859' : 'transparent',
          }}
        />
      </View>

      <View
        style={{
          width: '100%',
          flex: 1,
          borderRadius: 16,
          overflow: 'hidden',
        }}>
        <ScrollView
          testID="image_scroll_view"
          ref={scrollRef}
          scrollEventThrottle={16}
          onLayout={(e) => {
            setScrollViewHeight(e.nativeEvent.layout.height);
          }}
          onContentSizeChange={(_, height) => {
            setContentSize(height);
          }}
          showsHorizontalScrollIndicator
          showsVerticalScrollIndicator={listLength > 4}
          bounces={false}
          disableScrollViewPanResponder
          onScroll={(e) => {
            22222;
            setContentOffset(e.nativeEvent.contentOffset);
          }}
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  scrollView: {
    paddingHorizontal: 8,
  },
});

export default CustomScrollView;
