import React from 'react';
import { StyleSheet, View } from 'react-native';

import Tabbar from "./components/Tabbar"

export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Tabbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0d500',
    justifyContent: 'flex-end',
  },
});
