import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton}>
        <FontAwesomeIcon icon={faBars} size={24} color="#fff" />
      </TouchableOpacity>
      <Image source={require('../img/SUT.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F44948',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    shadowColor:'#000',
    shadowRadius: 4,
    shadowOpacity:  0.17,
    shadowOffset:{
      width: 0, height:3, 
    },
  },
  menuButton: {
    marginRight: 16,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
});

export default HeaderBar;